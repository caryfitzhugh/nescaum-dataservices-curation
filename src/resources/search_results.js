import React, { Component } from 'react';
import { connect } from 'react-redux';
import {performSearch} from "./search/actions";
import SearchResult from './search_result';
import SearchPagination from './../search_pagination';
import "./search_results.css";

class SearchResults extends Component {
  onChangePage(page) {
    this.props.performSearch(
      this.props.current_query,
      this.props.current_facets,
      page,
      this.props.per_page);
  }


  render() {
      if (!this.props.is_searching) {
        if (this.props.response.total === 0) {
         // Searched, found nothing
          return (<div className='no-results'>
                    <div className='jumbotron'>
                      <h1> No Results Found </h1>
                    </div>
                  </div>);
        } else {
          var resources = ((this.props.response || {}).resources || [])
          return (
            <div className='search-results'>
              <SearchPagination response={this.props.response}
                onChangePage={(new_page) => this.onChangePage(new_page)}/>
              <ul className='results'>
                {resources.map(resource => {
                  return <SearchResult key={resource.id}
                                resource={resource}/>
                })}
              </ul>
            </div>);
        }
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    per_page: state.resources_search.parameters.per_page,
    current_facets: state.resources_search.parameters.facets,
    current_query: state.resources_search.parameters.query,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query, facets, page, per_page) =>
    dispatch(performSearch({query: query, facets: facets, per_page: per_page, page:page, }))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
