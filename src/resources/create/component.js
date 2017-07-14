import React, { Component } from 'react';
import md from 'marked';
import { connect } from 'react-redux';
import "./component.css";
import CreateResourceFacet from './create_resource_facet';
import CreateResourceWeblinks from './create_resource_weblinks';
import {Link} from 'react-router-dom';
import {merge, isEqual, without, uniq} from 'lodash';
import {resetCreateResource, createResource, facetQuery} from './actions';
import {performCompleteIndexSearch} from './../../geofocuses/index/actions';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weblink_types: [
        "pdf",
        "web",
        "map",
      ],
      facets: {
      },
      resource: {
        "actions": [],
        "authors": [],
        "content": "",
        "climate_changes": [],
        "external_data_links": [],
        "effects": [],
        "content_types": [],
        "geofocuses": [],
        "image": "",
        "keywords": [],
        "publishers": [],
        "published_on_start": null,
        "published_on_end": null,
        "sectors": [],
        "strategies": [],
        "states": [],
        "title":"",
        "subtitle":""
      }
    };
  }

  componentDidMount() {
    // Want to fetch all facets
    this.props.performReset();
    this.props.performGeofocusQuery();
    this.props.performFacetQuery();
  }

  update_field(evt, field) {
    var val = evt.target.value;
    this.setState((old) => {
      var update = merge({}, old.resource);
      update[field] = val;
      return merge({}, old, {resource: update});
    });
  }

  update_facet(field, new_values) {
    this.setState((old) => {
      var update = merge({}, old.resource);
      update[field] = new_values;
      return merge({}, old, {resource: update});
    });
  }

  submit(evt) {
    evt.preventDefault();
    var safe_resource = Object.assign({}, this.state.resource);
    this.props.performResourceCreate(this.state.resource);
  }
  render() {
    var overlay = null;
    if (this.props.is_creating) {
      overlay = <div className='loading-overlay'>
          <div className='content'>
            <span className='fa fa-spinner'></span>
          </div>
        </div>;
    }
    if (this.props.error) {
      overlay = <div className='loading-overlay'>
          <div className='content'>
            <h1> Error</h1>
            <p> There was an error creating this record. </p>

            <pre>
              {JSON.stringify(this.props.error)}
            </pre>

            <a className='btn btn-primary' onClick={(evt) => { this.props.performReset() }}> Clear </a>
          </div>
        </div>;

    }

    if (this.props.created_docid) {
      overlay = <div className='loading-overlay'>
          <div className='content'>
            <Link to={"/resources/" + this.props.created_docid}> Go To Resource </Link>
          </div>
        </div>;
    }

    return (
    <div className='container create-component'>
      {overlay}
      {JSON.stringify(this.props)}
      <div className='row'>
        <div className='form col'>
          <h1>Create New Resource</h1>
          <div className="form-group">
            <label>Title</label>
            <input className='form-control' onChange={(evt) => this.update_field(evt, 'title')}/>
          </div>

          <div className="form-group">
            <label>Subtitle</label>
            <input className='form-control' value={this.state.resource.subtitle} onChange={(evt) => this.update_field(evt, 'subtitle')}/>
          </div>

          <div className="form-group img-edit">
            <label>Image</label>
            <img src={this.state.resource.image || "http://placehold.it/300&text=no_image"}/>
            <input className='form-control col-10' onChange={(evt) => this.update_field(evt, 'image')}/>
          </div>

          <div className="form-group content-split-view">
            <label>Content</label>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col'>
                  <label>Content</label>
                  <textarea className='md-input form-control' value={this.state.resource.content} onChange={(evt) => this.update_field(evt, 'content')}/>
                </div>
                <div className='col' >
                  <label>Output</label>
                  <div className='md-preview' dangerouslySetInnerHTML={{__html: md(this.state.resource.content || "")}}></div>
                </div>
              </div>
            </div>
          </div>

          <CreateResourceFacet name='Content Types' available={this.props.facets.content_types} facets={this.state.resource.content_types} onChange={(new_data) => this.update_facet('content_types', new_data)} />

          <div className='form-group'>
            <label> Publication </label>
            <div className='row'>
              <div className='col-3'>
                <div className=''>
                  <div className='col-6'>
                    <label> Start Date</label>
                  </div>
                  <input type='date' onChange={(new_data) => this.update_facet('published_on_start', new_data)}/>
                </div>
              </div>
              <div className='col-3'>
                <div className=''>
                  <div className='col-6'>
                    <label> End Date</label>
                  </div>
                  <input type='date' onChange={(new_data) => this.update_facet('published_on_end', new_data)}/>
                </div>
              </div>
            </div>
          </div>

          <CreateResourceWeblinks name="WebLinks" available={this.state.weblink_types} links={this.state.resource.external_data_links} onChange={(new_data) => this.update_facet('external_data_links', new_data)} />
          <CreateResourceFacet name='Actions' available={this.props.facets.actions} facets={this.state.resource.actions} onChange={(new_data) => this.update_facet('actions', new_data)} />
          <CreateResourceFacet name='Authors' available={this.props.facets.authors} facets={this.state.resource.authors} onChange={(new_data) => this.update_facet('authors', new_data)} />
          <CreateResourceFacet name='Climate Changes' available={this.props.facets.climate_changes} facets={this.state.resource.climate_changes} onChange={(new_data) => this.update_facet('climate_changes', new_data)} />
          <CreateResourceFacet name='Effects' available={this.props.facets.effects} facets={this.state.resource.effects} onChange={(new_data) => this.update_facet('effects', new_data)} />
          <CreateResourceFacet name='GeoFocus' available={this.props.facets.geofocuses } facets={this.state.resource.geofocuses} onChange={(new_data) => this.update_facet('geofocuses', new_data)} />
          <CreateResourceFacet name='Keywords' available={this.props.facets.keywords } facets={this.state.resource.keywords} onChange={(new_data) => this.update_facet('keywords', new_data)} />
          <CreateResourceFacet name='Publishers' available={this.props.facets.publishers } facets={this.state.resource.publishers} onChange={(new_data) => this.update_facet('publishers', new_data)} />
          <CreateResourceFacet name='Sectors' available={this.props.facets.sectors } facets={this.state.resource.sectors} onChange={(new_data) => this.update_facet('sectors', new_data)} />
          <CreateResourceFacet name='Strategies' available={this.props.facets.strategies } facets={this.state.resource.strategies} onChange={(new_data) => this.update_facet('strategies', new_data)} />
          <CreateResourceFacet name='States' available={this.props.facets.states } facets={this.state.resource.states} onChange={(new_data) => this.update_facet('states', new_data)} />

          <hr/>

          <div className="form-group">
            <button className='btn btn-primary' onClick={(evt) => this.submit(evt)}> Create </button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    geofocuses: state.geofocuses || {},
    facets: state.resources_create.facets.available || {},
    is_creating: state.resources_create.is_creating,
    created_docid: state.resources_create.created_docid,
    error: state.resources_create.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performFacetQuery: () => dispatch(facetQuery(["actions", "authors", "climate_changes", "effects", "content_types",  "keywords", "publishers", "sectors", "strategies", "states"])),
    performGeofocusQuery: () => dispatch(performCompleteIndexSearch()),
    performReset: () => dispatch(resetCreateResource()),
    performResourceCreate: (resource) => dispatch(createResource(resource))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
