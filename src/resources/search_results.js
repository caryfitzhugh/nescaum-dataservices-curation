import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResult from './search_result';
import SearchPagination from './../search_pagination';
import "./search_results.css";

class SearchResults extends Component {

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
              <SearchPagination response={this.props.response} onChangePage={(new_page) => this.props.onChangePage(new_page)}/>
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
