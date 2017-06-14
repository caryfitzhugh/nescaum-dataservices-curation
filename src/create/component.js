import React, { Component } from 'react';
import md from 'marked';
//import {performCreate} from "./actions";
import { connect } from 'react-redux';
import "./component.css";
import CreateResourceFacet from './create_resource_facet';
import {merge, isEqual, without, uniq} from 'lodash';
import {createResource, facetQuery} from './actions';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  strict_safify(htm) {
    // this prevents possible HTML attacks using the absolutely bare-minimum
    // essentials as specified by OWASP
    // https://www.owasp.org/index.php/XSS_%28Cross_Site_Scripting%29_Prevention_Cheat_Sheet
    // this method of pure string replacements are much safer and faster than
    // attempting to regex-match all tags

    // See jQuery plugin at end for example usage
    var htm = htm || "";
    return htm
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .replace(/\n/g, ' <br> ');

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
    return (
    <div className='container-fluid'>
      <div className='row'>
        <h1>Create</h1>
        <form className='col' onSubmit={(evt) => evt.preventDefault()}>
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
    facets: state.create.facets.available
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performFacetQuery: () => dispatch(facetQuery(["actions", "authors", "climate_changes", "effects", "formats", "geofocus", "keywords", "publishers", "sectors", "strategies", "states"])),
    performResourceCreate: (resource) => dispatch(createResource(resource))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
