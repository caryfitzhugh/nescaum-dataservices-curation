import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';

class SearchResultMultiAttribute extends Component {
  constructor(props) {
    super(props);
    this.debug = this.debug.bind(this);
  }

  debug () {
    this.props.performSearch();
  }

  render() {
      return (
        <div className='search-result-multi-attribute'>
          <label>{this.props.title}</label>
          {this.props.values.map((val) => {
            return <span key={val} className='badge badge-default'> {val}</span>
          })}
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    is_searching: state.search.is_searching,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultMultiAttribute);
