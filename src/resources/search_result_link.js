import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';

class SearchResultLink extends Component {
  render() {
    var [type, link] = this.props.value.split("::");

    return (<div>
      <label className='badge badge-default'>{type}</label>
      <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
    </div>);
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultLink);
