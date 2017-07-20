import React, { Component } from 'react';
import EditCollectionList from './edit_collection_list';
import SearchSpinner from './../search_spinner';
import {performSearch} from "./../resources/search/actions";
import SearchBar from './../resources/search/search_bar';
import ResourceSearchResults from './resource_search_results';

import { connect } from 'react-redux';

class Form extends Component {

  update_field(evt, field) {
    var val = evt.target.value;
    this.setState((old) => {
      let update = Object.assign({}, old.collection);
      update[field] = val;
      return Object.assign({}, old, {collection: update});
    });
  }

  update_resources(new_docids) {
    this.setState((state, props) => {
      let resource = Object.assign({}, state.collection);
      resource.resources = new_docids;
      let new_state =  Object.assign({}, state, resource);
      console.log(new_state, new_docids);
      return new_state;
    });
  }
  add_resource(docid) {
    console.log('add', docid);
  }


  submit(evt) {
    evt.preventDefault();
    var safe_collection = Object.assign({}, this.props.collection, this.state || {});
    this.props.onSubmit(safe_collection);
  }

  render() {
    var state = this.state || {};

    let name = state.name || this.props.collection.name;
    console.log(state, this.props.collection);
    let resources = state.resources || this.props.collection.resources;
    //let resources =
    return (
      <div className='row'>
        <div className='form col'>
          <h1>{this.props.header_name}</h1>
          <div className="form-group">
            <label>Name</label>
            <input value={name || ""} className='form-control' onChange={(evt) => this.update_field(evt, 'name')}/>
          </div>

          <EditCollectionList docids={resources}
                              onChange={(new_docids) => this.update_resources(new_docids)} />
          <div>
            <h3> Find Resources To Add </h3>

            <SearchBar/>
            <SearchSpinner is_searching={this.props.is_searching}/>
            <ResourceSearchResults docids={resources} is_searching={this.props.is_searching} response={this.props.response}/>
          </div>

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
