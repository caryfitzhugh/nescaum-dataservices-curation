import React, { Component } from 'react';
import {performUnindexedSearch} from "./actions";
import { connect } from 'react-redux';
import SearchSpinner from './../search_spinner';
import SearchResults from './../search_results';

class Search extends Component {
  componentDidMount() {
    this.props.performSearch(1, this.props.per_page) ;
  }

  render() {
    return (
    <div className='container'>
      <div className='row'>
        <div id='sidebar' >
          <h3>Unindexed Resources</h3>
          <p> These resources are not in the search index</p>
        </div>
        <div className='col'>
          <div className='row'>
            <SearchSpinner is_searching={this.props.is_searching}/>
            <SearchResults is_searching={this.props.is_searching} response={this.props.response}
                           onChangePage={(new_p) => { this.props.performSearch(new_p, this.props.per_page) }}/>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("DB", state);

  return {
    is_searching: state.resources_unindexed.is_searching,
    per_page: state.resources_unindexed.per_page,
    page: state.resources_unindexed.page,
    response: state.resources_unindexed.response,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (p, pp) => dispatch(performUnindexedSearch({page: p, per_page: pp}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
