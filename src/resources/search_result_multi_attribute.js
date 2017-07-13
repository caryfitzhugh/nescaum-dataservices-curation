import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';
import './search_result_multi_attribute.css';

class SearchResultMultiAttribute extends Component {
  render() {
    if (this.props.values) {
      return (
        <div className='search-result-multi-attribute'>
          <label>{this.props.title}</label>
          {this.props.values.map((val) => {
            return <span key={val} className='badge badge-default'> {val}</span>
          })}
        </div>
      );
    } else {
      return (
        <div className='search-result-multi-attribute'>
        </div>
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultMultiAttribute);
