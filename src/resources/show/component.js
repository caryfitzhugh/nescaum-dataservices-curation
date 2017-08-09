import React, { Component } from 'react';
import md from 'marked';
import {L} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import gjBounds from 'geojson-bounds';
import {Map, TileLayer, GeoJSON} from 'react-leaflet';
import { connect } from 'react-redux';
import { getResource, deleteResource } from './../actions';
import {performCompleteIndexSearch} from './../../geofocuses/index/actions';
import {Link} from 'react-router-dom';
import "./component.css";
import {compact} from 'lodash';
import ShowFacetArray from './show_facet_array';
import ShowIndexedButton from './show_indexed_button';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: {}
    };
  }

  componentDidMount() {
    // Want to fetch the details
    this.props.performResourceGet(this.props.match.params.id);
    // Want to fetch all facets
    this.props.performGeofocusQuery();
  }
  delete_resource (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if (window.confirm("Delete Resource?\n\nThis will permanently delete the record!")) {
      this.props.performResourceDelete(this.props.resource.id, this.props.history);
      // Send yourself "back" in the browser
    }
  }

  render() {
    let geofocuses = compact(((this.props.resource || {}).geofocuses || []).map((gfid) => {
                    return ((this.props || {}).geofocuses || {})[gfid];
                  }))
    let bbox = gjBounds.extent({type: "GeometryCollection",
                                 geometries: geofocuses.map((gf) => gf.geom)});

    let bounds = bbox[0] ? [[bbox[1],bbox[0]],[bbox[3], bbox[2]]] : null;

    if (this.props.resource) {
      let img = this.props.resource.image || 'http://placehold.it/300';
      return (
        <div className='container-fluid'>

          <ShowIndexedButton resource={this.props.resource} />
          <h2>{this.props.resource.title}
            <Link className='btn btn-secondary' to={'/resources/' + this.props.resource.id +'/edit'}> Edit Resource </Link>
            <button onClick={(evt) => this.delete_resource(evt)} className='btn btn-danger'> Delete Resource </button>
          </h2>
          <h6> {this.props.resource.subtitle}
            <small className='publication'>
              <span>{ this.props.resource.published_on_start}</span>
              /
              <span>{ this.props.resource.published_on_end}</span>
            </small>
          </h6>

          <hr/>

          <div className='resource-image'>
            <img alt='resource thumbnail' src={img}/>
            <label>{img }</label>
            { bounds ?
              <div className='geofocus-map'>
                <Map boundsOptions={{padding: [50,50]}} bounds={[[bbox[1],bbox[0]],[bbox[3], bbox[2]]]}>
                  <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                  {this.props.resource.geofocuses.map((gfid) => {
                    let gf = this.props.geofocuses[gfid];
                    return gf ? <GeoJSON key={gf.id} data={gf.geom} /> : null;
                  })}
                </Map>
                <ul>
                  {this.props.resource.geofocuses.map((gfid) => {
                    let gf = this.props.geofocuses[gfid];
                    return gf ? <li key={gfid}> {gf.name} </li> : null;
                  })}
                </ul>
              </div> : null}
          </div>

          <div dangerouslySetInnerHTML={{__html: md(this.props.resource.content || "")}}></div>

          <ShowFacetArray name='Content Types' values={this.props.resource.content_types}/>
          <ShowFacetArray name='Weblinks' values={this.props.resource.external_data_links}/>
          <ShowFacetArray name='Actions' values={this.props.resource.actions}/>
          <ShowFacetArray name='Authors' values={this.props.resource.authors}/>
          <ShowFacetArray name='Climate Changes' values={this.props.resource.climate_changes}/>
          <ShowFacetArray name='Effects' values={this.props.resource.effects}/>
          <ShowFacetArray name='Keywords' values={this.props.resource.keywords}/>
          <ShowFacetArray name='Publishers' values={this.props.resource.publishers}/>
          <ShowFacetArray name='Sectors' values={this.props.resource.sectors}/>
          <ShowFacetArray name='Strategies' values={this.props.resource.strategies}/>
          <ShowFacetArray name='States' values={this.props.resource.states}/>
        </div>);

    } else if (this.props.error ) {
      return (
        <div className='container-fluid'>
          <h1> Error</h1>
          <p>{this.props.error}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    resource: state.resources[ownProps.match.params.id],
    error: state.resources.errors[ownProps.match.params.id],
    geofocuses: state.geofocuses_index.geofocuses || {},
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performResourceGet: (id) => dispatch(getResource(id)),
    performResourceDelete: (id, history) => dispatch(deleteResource(id, history)),
    performGeofocusQuery: () => dispatch(performCompleteIndexSearch()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
