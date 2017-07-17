import React, { Component } from 'react';
import {performIndexSearch} from "./actions";
import { connect } from 'react-redux';
import SearchSpinner from './../../search_spinner';
import SearchResults from './search_results';

class Search extends Component {
  componentDidMount() {
    console.log('wha?', this.props.history);
    this.props.performSearch(1, this.props.per_page) ;
  }

  render() {
    return (
    <div className='container'>
      <div className='row'>
        <div id='sidebar' >
          <h3>Collections</h3>
          <p> These collections are a list of all collectiones in the system</p>
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
  return {
    is_searching: state.collections_index.is_searching,
    per_page: state.collections_index.per_page,
    page: state.collections_index.page,
    response: state.collections_index.response
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (p, pp) => dispatch(performIndexSearch({page: p, per_page: pp}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
