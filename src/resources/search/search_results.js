import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';
import SearchResult from './search_result';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.debug = this.debug.bind(this);
  }

  debug () { }

  render() {
      if (!this.props.is_searching) {
        if (this.props.response.hits === 0) {
         // Searched, found nothing
          return (<div className='no-results'>
                    <div className='jumbotron'>
                      <h1> No Results Found </h1>
                    </div>
                  </div>);
        } else {
          var resources = ((this.props.response || {}).resources || [])
          return (
            <ul className='results'>
              {resources.map(resource => {
                return <SearchResult key={resource.docid}
                              resource={resource}/>
              })}
            </ul>);
        }
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    is_searching: state.search.is_searching,
    response: state.search.response,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
