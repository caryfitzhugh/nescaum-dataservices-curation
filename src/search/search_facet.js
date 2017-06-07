import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';
import "./search_facets.css";

class SearchFacet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
  <label>{this.props.title}</label>
</div>);
  }
}

  /* if (this.props.value.match(/::$/)) {
      return (
        <div className='search-facet-group'>
         <input type='checkbox'/>
          <label>{this.props.value.slice(0,-2)}</label>
        </div>
      );
    } else {
      return null;
  */
const mapStateToProps = (state) => {
  return {
    parameters: state.search.parameters
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: () => dispatch(performSearch({query: "hi", facets: {actions: [1,2,3]}, page: 1, per_page: 10}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFacet);
