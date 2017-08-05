import React, { Component } from 'react';
import md from 'marked';
import {resetCreateResource, createResource, facetQuery} from './create/actions';
import {performCompleteIndexSearch} from './../geofocuses/index/actions';
import { connect } from 'react-redux';
import EditResourceWeblinks from './fields/edit_resource_weblinks';
import ContentTypeField from './fields/content_types';
import ActionsField from './fields/actions';
import './form.css';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {resource: {}};
  }

  componentDidMount() {
    // Want to fetch all facets
    this.props.performReset();
    this.props.performGeofocusQuery();
    this.props.performFacetQuery();
  }

  update_field(evt_or_val, field) {
    console.log(evt_or_val, field);
    let val = evt_or_val;
    if (evt_or_val.target) {
      val = evt_or_val.target.value;
    }

    this.setState((old) => {
      var update = Object.assign({}, old.resource);
      update[field] = val;
      return Object.assign({}, old, {resource: update});
    });
  }

  submit(evt) {
    evt.preventDefault();
    var safe_resource = Object.assign({}, this.props.resource, this.state.resource);
    this.props.onSubmit(safe_resource);
  }

  render() {
    let presource = this.props.resource || {};
    let sresource = this.state.resource || {};
    return (
      <div className='row'>
        <div className='resources-form form col'>
          <h1>{this.props.header_name}</h1>

          <div className="form-group">
            <h3>Title</h3>
            <input value={sresource.title || presource.title || ""}
                  className='form-control' onChange={(evt) => this.update_field(evt, 'title')}/>
            <div className='form-text text-muted'>
              The resource's title.
            </div>
          </div>
          <div className="form-group">
            <h3>Subtitle</h3>
            <input value={sresource.subtitle || presource.subtitle || ""}
                  className='form-control' onChange={(evt) => this.update_field(evt, 'subtitle')}/>
            <div className='form-text text-muted'>
              The resource's sub-title.
            </div>
          </div>
          <div className="form-group img-edit">
            <h3>Image</h3>
            <img alt='resource thumbnail' src={sresource.image || presource.image || "http://placehold.it/300&text=no_image"}/>
            <input className='form-control col-10' onChange={(evt) => this.update_field(evt, 'image')}/>
          </div>

          <div className="form-group content-split-view">
            <h3>Content</h3>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col'>
                  <label>Content</label>
                  <textarea className='md-input form-control'
                    value={sresource.content || presource.content} onChange={(evt) => this.update_field(evt, 'content')}/>
                </div>
                <div className='col' >
                  <label>Output</label>
                  <div className='md-preview' dangerouslySetInnerHTML={{__html: md(sresource.content || presource.content || "")}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <h3> Publication </h3>
            <div className='row'>
              <div className='col-5'>
                <div className=''>
                  <div className='col-6'>
                    <label> Start Date</label>
                  </div>
                  <input type='date'
                    value={sresource.published_on_start || presource.published_on_start || ""}
                    onChange={(new_data) => this.update_field(new_data, 'published_on_start')}/>
                </div>
              </div>
              <div className='col-5'>
                <div className=''>
                  <div className='col-6'>
                    <label> End Date</label>
                  </div>
                  <input type='date'
                    value={sresource.published_on_end || presource.published_on_end || ""}
                    onChange={(new_data) => this.update_field(new_data, 'published_on_end')}/>
                </div>
              </div>
            </div>
          </div>

          <ContentTypeField
            available={this.props.facets.content_types}
            values={sresource.content_types || presource.content_types }
            onChange={(new_data) => this.update_field(new_data, 'content_types')}
            />
          <EditResourceWeblinks name="WebLinks"
            links={sresource.external_data_links || presource.external_data_links || []}
            onChange={(new_data) => this.update_field(new_data, 'external_data_links')} />
          <ActionsField
            available={this.props.facets.actions}
            values={sresource.actions || presource.actions }
            onChange={(new_data) => this.update_field(new_data, 'actions')}
            />

          <hr/>
          <div className="form-group">
            <button className='btn btn-primary' onClick={(evt) => this.submit(evt)}> {this.props.submit_name} </button>
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performFacetQuery: () => dispatch(facetQuery(["actions", "authors", "climate_changes", "effects", "content_types",  "keywords", "publishers", "sectors", "strategies", "states"])),
    performGeofocusQuery: () => dispatch(performCompleteIndexSearch()),
    performReset: () => dispatch(resetCreateResource()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

/*
          <EditResourceFacet name='Actions' available={this.props.facets.actions} facets={this.state.resource.actions} onChange={(new_data) => this.update_facet('actions', new_data)} />
          <EditResourceFacet name='Authors' available={this.props.facets.authors} facets={this.state.resource.authors} onChange={(new_data) => this.update_facet('authors', new_data)} />
          <EditResourceFacet name='Climate Changes' available={this.props.facets.climate_changes} facets={this.state.resource.climate_changes} onChange={(new_data) => this.update_facet('climate_changes', new_data)} />
          <EditResourceFacet name='Effects' available={this.props.facets.effects} facets={this.state.resource.effects} onChange={(new_data) => this.update_facet('effects', new_data)} />
          <EditResourceFacet name='GeoFocus' available={this.props.facets.geofocuses } facets={this.state.resource.geofocuses} onChange={(new_data) => this.update_facet('geofocuses', new_data)} />
          <EditResourceFacet name='Keywords' available={this.props.facets.keywords } facets={this.state.resource.keywords} onChange={(new_data) => this.update_facet('keywords', new_data)} />
          <EditResourceFacet name='Publishers' available={this.props.facets.publishers } facets={this.state.resource.publishers} onChange={(new_data) => this.update_facet('publishers', new_data)} />
          <EditResourceFacet name='Sectors' available={this.props.facets.sectors } facets={this.state.resource.sectors} onChange={(new_data) => this.update_facet('sectors', new_data)} />
          <EditResourceFacet name='Strategies' available={this.props.facets.strategies } facets={this.state.resource.strategies} onChange={(new_data) => this.update_facet('strategies', new_data)} />
          <EditResourceFacet name='States' available={this.props.facets.states } facets={this.state.resource.states} onChange={(new_data) => this.update_facet('states', new_data)} />
*/
