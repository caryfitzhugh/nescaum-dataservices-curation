import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';
import SearchFacet from './search_facet';

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
        <div>
          <h3>Search Facets</h3>
          <ul className="nav nav-pills nav-stacked">
            <li><SearchFacet title="Actions" facets={facets.actions}/></li>
            <li><SearchFacet title="Authors" facets={facets.authors}/></li>
            <li><SearchFacet title="Climate Changes" facets={facets.climate_changes}/></li>
            <li><SearchFacet title="Effects" facets={facets.effects}/></li>
            <li><SearchFacet title="Formats" facets={facets.formats}/></li>
            <li><SearchFacet title="GeoFocus" facets={facets.geofocus}/></li>
            <li><SearchFacet title="Keywords" facets={facets.keywords}/></li>
            <li><SearchFacet title="Publishers" facets={facets.publishers}/></li>
            <li><SearchFacet title="Sectors" facets={facets.sectors}/></li>
            <li><SearchFacet title="States" facets={facets.states}/></li>
            <li><SearchFacet title="Strategies" facets={facets.strategies}/></li>
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
    response: state.search.response
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //performSearch: () => dispatch(performSearch({query: "hi", facets: {actions: [1,2,3]}, page: 1, per_page: 10}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFacets);
