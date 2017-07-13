import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';

class SearchResultLink extends Component {
  constructor(props) {
    super(props);
  }

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
    //parameters: state.search.parameters
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //performSearch: () => dispatch(performSearch({query: "hi", facets: {actions: [1,2,3]}, page: 1, per_page: 10}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultLink);
