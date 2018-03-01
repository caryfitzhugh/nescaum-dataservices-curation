import React, { Component } from 'react';
import md from 'marked';
import {resetCreateResource} from './create/actions';
import { connect } from 'react-redux';
import EditResourceFacet from './fields/edit_resource_facet';
import EditResourceWeblinks from './fields/edit_resource_weblinks';
import GeofocusesFacet from './fields/edit_geofocuses_facet';
import StatesField from './fields/states';
import SectorsField from './fields/sectors';
import './form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {resource: {}, changed: {}};
  }

  componentDidMount() {
    this.props.performReset();
  }

  field_value(attr_name, default_val) {
    let presource = (this.props.resource || {})[attr_name];
    let sresource = (this.state.resource || {})[attr_name];
    let changed = this.state.changed[attr_name];
    if (changed) {
      return sresource;
    } else {
      return presource || sresource || default_val;
    }
  }

  update_field(evt_or_val, field) {
    let val = evt_or_val;
    if (evt_or_val.target) {
      val = evt_or_val.target.value;
    }

    this.setState((old) => {
      let update = Object.assign({}, old.resource);
      update[field] = val;
      let changed_update = Object.assign({}, old.changed);
      changed_update[field] = true;

      return Object.assign({}, old, {resource: update}, {changed: changed_update});
    });
  }

  submit(evt) {
    evt.preventDefault();
    let safe_resource = Object.assign({}, this.props.resource, this.state.resource);
    this.props.onSubmit(safe_resource);
  }

  render() {

    return (
      <div className='row'>
        <div className='resources-form form col'>
          <h1>{this.props.header_name}</h1>

          <div className="form-group">
            <h3>Title</h3>
            <input value={this.field_value('title', '')}
                  className='form-control' onChange={(evt) => this.update_field(evt, 'title')}/>
            <div className='form-text text-muted'>
              The resource's title.
            </div>
          </div>
          <div className="form-group">
            <h3>Subtitle</h3>
            <input value={this.field_value('subtitle')}
                  className='form-control' onChange={(evt) => this.update_field(evt, 'subtitle')}/>
            <div className='form-text text-muted'>
              The resource's sub-title.
            </div>
          </div>
          <div className="form-group img-edit">
            <h3>Image</h3>
            <img alt='resource thumbnail' src={this.field_value('image', 'http://placehold.it/300&text=no_image')}/>
            <input className='form-control col-10' value={this.field_value('image')}
                   onChange={(evt) => this.update_field(evt, 'image')}/>
          </div>

          <div className="form-group content-split-view">
            <h3>Content</h3>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col'>
                  <label>Content</label>
                  <textarea className='md-input form-control'
                    value={this.field_value('content')} onChange={(evt) => this.update_field(evt, 'content')}/>
                </div>
                <div className='col' >
                  <label>Output</label>
                  <div className='md-preview' dangerouslySetInnerHTML={{__html: md(this.field_value('content', ''))}}></div>
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
                    value={this.field_value('published_on_start', "").split("T")[0]}
                    onChange={(new_data) => this.update_field(new_data, 'published_on_start')}/>
                </div>
              </div>
              <div className='col-5'>
                <div className=''>
                  <div className='col-6'>
                    <label> End Date</label>
                  </div>
                  <input type='date'
                    value={this.field_value('published_on_end',  "").split("T")[0]}
                    onChange={(new_data) => this.update_field(new_data, 'published_on_end')}/>
                </div>
              </div>
            </div>
          </div>

          <SectorsField
            values={this.field_value('sectors', [])}
            onChange={(new_data) => this.update_field(new_data, 'sectors')}
            />

          <StatesField values={this.field_value('states', [])}
            onChange={(new_data) => this.update_field(new_data, 'states')} />

          <EditResourceFacet name='Authors'
            field_name="authors"
            allow_custom={true}
            values={this.field_value('authors', [])}
            onChange={(new_data) => this.update_field(new_data, 'authors')} />

          <EditResourceFacet name='Publishers'
            field_name="publishers"
            allow_custom={true}
            values={this.field_value('publishers', [])}
            onChange={(new_data) => this.update_field(new_data, 'publishers')} />

          <EditResourceFacet name='Keywords'
            field_name='keywords'
            allow_custom={true}
            values={this.field_value('keywords', [])}
            onChange={(new_data) => this.update_field(new_data, 'keywords')} />

          <GeofocusesFacet
            values={this.field_value('geofocuses', [])}
            onChange={(new_data) => this.update_field(new_data, 'geofocuses')} />

          <EditResourceFacet name='Content Types'
            field_name="content_types"
            preload={true}
            values={this.field_value('content_types', [])}
            onChange={(new_data) => this.update_field(new_data, 'content_types')} />

          <EditResourceWeblinks name="WebLinks"
            links={this.field_value('external_data_links', [])}
            onChange={(new_data) => this.update_field(new_data, 'external_data_links')} />

          <EditResourceFacet name='Actions'
             field_name="actions"
            values={this.field_value('actions', [])}
            onChange={(new_data) => this.update_field(new_data, 'actions')} />

          <EditResourceFacet name='Climate Changes'
            field_name="climate_changes"
            preload={true}
            values={this.field_value('climate_changes', [])}
            onChange={(new_data) => this.update_field(new_data, 'climate_changes')} />

          <EditResourceFacet name='Effects'
            field_name="effects"
            allow_custom={true}
            preload={true}
            values={this.field_value('effects', [])}
            onChange={(new_data) => this.update_field(new_data, 'effects')} />

          <EditResourceFacet name='Strategies'
            field_name="strategies"
            preload={true}
            values={this.field_value('strategies', [])}
            onChange={(new_data) => this.update_field(new_data, 'strategies')} />

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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performReset: () => dispatch(resetCreateResource()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
