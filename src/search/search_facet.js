import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';

class SearchFacet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var sorted = (this.props.facets || []).sort();
console.log(sorted);
    return (<div>
              <label>{this.props.title}</label>
            <ul>
              {sorted.map((facet) => {
                return <li key={facet.value}>{facet.value} </li>
                })}
            </ul>
            </div>);
  }
}

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
