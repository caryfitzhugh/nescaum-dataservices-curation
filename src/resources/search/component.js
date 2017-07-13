import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';
import SearchFacets from './search_facets';
import SearchBar from './search_bar';
import SearchSpinner from './../search_spinner';
import SearchResults from './../search_results';

class Search extends Component {
  componentDidMount() {
    this.props.performBlankSearch() ;
  }

  render() {
    return (
    <div className='container-fluid'>
      <div className='row'>
        <div id='sidebar' className='col-2'>
          <SearchFacets/>
        </div>
        <div className='col'>
          <div className='row'>
            <SearchBar/>
            <SearchSpinner is_searching={this.props.is_searching}/>
            <SearchResults is_searching={this.props.is_searching} response={this.props.response}/>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    per_page: state.search.per_page,
    is_searching: state.search.is_searching,
    response: state.search.response,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performBlankSearch: () => dispatch(performSearch({query: "", facets: {}, page: 1, per_page: 10}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
