import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';
import SearchFacets from './search_facets';
import SearchBar from './search_bar';
import SearchSpinner from './../../search_spinner';
import SearchResults from './../search_results';

class Search extends Component {
  componentDidMount() {
    this.props.performBlankSearch() ;
  }

  onChangePage(page) {
    this.props.performSearch(
      this.props.current_query,
      this.props.current_facets,
      page,
      this.props.current_per_page);
  }

  render() {
    return (
    <div className='container-fluid'>
      <div className='row'>
        <div id='sidebar' >
          <SearchFacets/>
        </div>
        <div className='col'>
          <div className='row'>
            <SearchBar/>
            <SearchSpinner is_searching={this.props.is_searching}/>
            <SearchResults is_searching={this.props.is_searching} response={this.props.response}
              onChangePage={(page) => this.onChangePage(page)}/>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.resources_search,
    per_page: state.resources_search.per_page,
    is_searching: state.resources_search.is_searching,
    response: state.resources_search.response,
    current_per_page: state.resources_search.parameters.per_page,
    current_facets: state.resources_search.parameters.facets,
    current_query: state.resources_search.parameters.query,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performBlankSearch: () => dispatch(performSearch({query: "", facets: {}, page: 1, per_page: 25})),
    performSearch: (query, facets, page, per_page) =>
    dispatch(performSearch({query: query, facets: facets, per_page: per_page, page:page, }))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
