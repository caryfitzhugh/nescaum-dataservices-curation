import React, { Component } from 'react';
import md from 'marked';
//import {performCreate} from "./actions";
import { connect } from 'react-redux';
import "./component.css";
import CreateResourceFacet from './create_resource_facet';
import CreateResourceWeblinks from './create_resource_weblinks';
import {Link} from 'react-router-dom';
import {merge, isEqual, without, uniq} from 'lodash';
import {resetCreateResource, createResource, facetQuery} from './actions';

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
        "formats": [],
        "geofocus": [],
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
  prevent_submit(event) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }

  render() {
    var overlay = null;
    if (this.props.is_creating) {
      overlay = <div className='loading-overlay'>
          <span className='fa fa-spinner'></span>
        </div>;
    }

    if (this.props.created_docid) {
      overlay = <div className='loading-overlay'>
          <Link href={"/resources/" + this.props.created_docid}> Go To Resource </Link>
        </div>;
    }

    return (
    <div className='container-fluid'>

      <div className='row'>
        <h1>Create</h1>
        <form className='col' onKeyPress={(evt) => this.prevent_submit(evt)} >
          <div className="form-group">
            <label>Title</label>
            <input className='form-control' onChange={(evt) => this.update_field(evt, 'title')}/>
          </div>

          <div className="form-group">
            <label>Subtitle</label>
            <input className='form-control' value={this.state.resource.subtitle} onChange={(evt) => this.update_field(evt, 'subtitle')}/>
          </div>

          <div className="form-group content-split-view">
            <label>Content</label>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col'>
                  <label>Markdown</label>
                  <textarea className='form-control' value={this.state.resource.content} onChange={(evt) => this.update_field(evt, 'content')}/>
                </div>
                <div className='col' >
                  <label>Output</label>
                  <div dangerouslySetInnerHTML={{__html: md(this.state.resource.content || "")}}></div>
                </div>
              </div>
            </div>
          </div>

          <CreateResourceWeblinks available={this.state.weblink_types} links={this.state.resource.external_data_links} onChange={(new_data) => this.update_facet('external_data_links', new_data)} />
          <CreateResourceFacet name='Actions' available={this.state.facets.actions} facets={this.state.resource.actions} onChange={(new_data) => this.update_facet('actions', new_data)} />
          <CreateResourceFacet name='Authors' available={this.state.facets.authors} facets={this.state.resource.authors} onChange={(new_data) => this.update_facet('authors', new_data)} />
          <CreateResourceFacet name='Climate Changes' available={this.state.facets.climate_changes} facets={this.state.resource.climate_changes} onChange={(new_data) => this.update_facet('climate_changes', new_data)} />
          <CreateResourceFacet name='Formats' available={this.state.facets.formats} facets={this.state.resource.formats} onChange={(new_data) => this.update_facet('formats', new_data)} />
          <CreateResourceFacet name='Effects' available={this.state.facets.effects} facets={this.state.resource.effects} onChange={(new_data) => this.update_facet('effects', new_data)} />
          <CreateResourceFacet name='GeoFocus' available={this.state.facets.geofocus } facets={this.state.resource.geofocus} onChange={(new_data) => this.update_facet('geofocus', new_data)} />
          <CreateResourceFacet name='Keywords' available={this.state.facets.keywords } facets={this.state.resource.keywords} onChange={(new_data) => this.update_facet('keywords', new_data)} />
          <CreateResourceFacet name='Publishers' available={this.state.facets.publishers } facets={this.state.resource.publishers} onChange={(new_data) => this.update_facet('publishers', new_data)} />
          <CreateResourceFacet name='Sectors' available={this.state.facets.sectors } facets={this.state.resource.sectors} onChange={(new_data) => this.update_facet('sectors', new_data)} />
          <CreateResourceFacet name='Strategies' available={this.state.facets.strategies } facets={this.state.resource.strategies} onChange={(new_data) => this.update_facet('strategies', new_data)} />
          <CreateResourceFacet name='States' available={this.state.facets.states } facets={this.state.resource.states} onChange={(new_data) => this.update_facet('states', new_data)} />

          <div className='form-group'>
            <div className='row'>
              <div className='col-3'>
                <div className=''>
                  <div className='col-6'>
                    <label> Publish Start Date</label>
                  </div>
                  <input type='date' />
                </div>
              </div>
              <div className='col-3'>
                <div className=''>
                  <div className='col-6'>
                    <label> Publish End Date</label>
                  </div>
                  <input type='date' />
                </div>
              </div>
            </div>
          </div>

          <hr/>

          <div className="form-group">
            <button className='btn btn-primary' onClick={(evt) => this.submit(evt)}> Create </button>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    facets: state.create.facets.available,
    is_creating: !!state.create.request_id,
    created_docid: state.create.created_docid,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performFacetQuery: () => dispatch(facetQuery(["actions", "authors", "climate_changes", "effects", "formats", "geofocus", "keywords", "publishers", "sectors", "strategies", "states"])),
    performReset: () => dispatch(resetCreateResource()),
    performResourceCreate: (resource) => dispatch(createResource(resource))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
