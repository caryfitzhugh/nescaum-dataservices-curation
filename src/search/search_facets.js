import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';
import SearchFacet from './search_facet';
import "./search_facets.css";

class SearchFacets extends Component {
  constructor(props) {
    super(props);
    this.debug = this.debug.bind(this);
  }

  debug () {
    this.props.performSearch();
  }

  render() {
    if (this.props.response) {
      var facets = this.props.response.facets || {};
      return (
        <div id='sidebar'>
          <h3>Facets</h3>
          <ul class="nav nav-pills nav-stacked">
            <li><SearchFacet title="Actions" facets={facets.actions}/></li>
            <li><SearchFacet title="Actions" facets={facets.actions}/></li>
          </ul>
        </div>
      );
    } else {
      return <div>{JSON.stringify(this.props)}</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    parameters: state.search.parameters,
    response: state.search.response
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: () => dispatch(performSearch({query: "hi", facets: {actions: [1,2,3]}, page: 1, per_page: 10}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFacets);
