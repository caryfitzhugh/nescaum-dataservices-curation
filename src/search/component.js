import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';
import SearchFacets from './search_facets';
import SearchBar from './search_bar';
import SearchSpinner from './search_spinner';
import SearchResults from './search_results';

class Search extends Component {
  constructor(props) {
    super(props);
    this.debug = this.debug.bind(this);
  }

  debug () {
    this.props.performSearch();
  }

  render() {
    return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-2'>
          <SearchFacets/>
        </div>
        <div className='col'>
          <div className='row'>
            <SearchBar/>
            <SearchSpinner/>
            <SearchResults/>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: () => dispatch(performSearch({query: "hi", facets: {actions: [1,2,3]}, page: 1, per_page: 10}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
