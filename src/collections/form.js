import React, { Component } from 'react';
import EditCollectionList from './edit_collection_list';
import {Link} from 'react-router-dom';
import SearchSpinner from './../search_spinner';
import {performSearch} from "./../resources/search/actions";
import SearchBar from './../resources/search/search_bar';
import ResourceSearchResults from './resource_search_results';
import './form.css';

import { connect } from 'react-redux';

class Form extends Component {

  update_field(evt, field) {
    var val = evt.target.value;
    this.setState((old) => {
      let update = Object.assign({}, old);
      update[field] = val;
      let res =  Object.assign({}, old, update);
      return res;
    });
  }

  update_resources(new_ids) {
    this.setState((state, props) => {
      let resource = Object.assign({}, state.collection);
      resource.resources = new_ids;
      let new_state =  Object.assign({}, state, resource);
      console.log(new_state, new_ids);
      return new_state;
    });
  }


  submit(evt) {
    evt.preventDefault();
    var safe_collection = Object.assign({}, this.props.collection, this.state || {});
    this.props.onSubmit(safe_collection);
  }

  render() {
    var state = this.state || {};

    let name = state.name || this.props.collection.name;

    let resources = state.resources || this.props.collection.resources || [];

    //let resources =
    return (
      <div className='row collection-form'>
        <div className='form col'>
          <h1>{this.props.header_name}</h1>
          <div className="form-group">
            <label>Name</label>
            <input value={name || ""} className='form-control' onChange={(evt) => this.update_field(evt, 'name')}/>
          </div>

          <h3> Resources </h3>
          <EditCollectionList ids={resources}
                              onChange={(new_ids) => this.update_resources(new_ids)} />
          <hr/>
          <div>
            <h3> Find New Resources To Add </h3>

            <SearchBar/>
            <SearchSpinner is_searching={this.props.is_searching}/>
            <ResourceSearchResults ids={resources} is_searching={this.props.is_searching} response={this.props.response}
                  onAdd={(id) => { this.update_resources(resources.concat(id))}} />
          </div>

          <hr/>
          <div className="form-group form-submit-or-cancel">
            <Link to={this.props.cancel_destination}> Cancel </Link>
            <span>or</span>
            <button className='btn btn-primary' onClick={(evt) => this.submit(evt)}> {this.props.submit_name} </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.resources_search,
    is_searching: state.resources_search.is_searching,
    response: state.resources_search.response,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performResourceSearch: (search_string, per_page) => dispatch(performSearch({query: search_string, page: 1, per_page: per_page}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
