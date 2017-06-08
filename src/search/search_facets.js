import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';
import SearchFacet from './search_facet';
import SearchFacetNested from './search_facet_nested';
import deep_equal from 'deep-equal';

class SearchFacets extends Component {
  constructor(props) {
    super(props);
    this.pending_search = this.pending_search.bind(this);
    this.clear_search = this.clear_search.bind(this);
    this.apply_filters = this.apply_filters.bind(this);
  }
  clear_search() {
    this.props.performSearch("", {}, this.props.per_page);
  }

  pending_search() {
    return !deep_equal(this.props.parameters, this.props.request);
  }

  apply_filters () {
    this.props.performSearch(this.props.query, this.props.facets, this.props.per_page);
  }

  render() {
    if (this.props.response) {
      var facets = this.props.response.facets || {};
      return (
        <div>
          <h3>Search Facets</h3>
          {this.pending_search() ? <button onClick={this.apply_filters} className='btn btn-primary'> Apply Filters</button> : null}
          <button onClick={this.clear_search} className='btn btn-secondary'> Clear Filters</button>

          <ul className="nav nav-pills nav-stacked">
            <li><SearchFacetNested type="actions" title="Actions" facets={facets.actions}/></li>
            <li><SearchFacetNested type="climate_changes" title="Climate Changes" facets={facets.climate_changes}/></li>
            <li><SearchFacetNested type="effects" title="Effects" facets={facets.effects}/></li>
            <li><SearchFacetNested type="formats" title="Formats" facets={facets.formats}/></li>
            <li><SearchFacetNested type="geofocus" title="GeoFocus" facets={facets.geofocus}/></li>
            <li><SearchFacet type="authors" title="Authors" facets={facets.authors}/></li>
            <li><SearchFacet type="keywords" title="Keywords" no_expansion={true} facets={facets.keywords}/></li>
            <li><SearchFacet type="publishers" title="Publishers" facets={facets.publishers}/></li>
            <li><SearchFacet type="sectors" title="Sectors" facets={facets.sectors}/></li>
            <li><SearchFacet type="states" title="States" facets={facets.states}/></li>
            <li><SearchFacet type="strategies" title="Strategies" facets={facets.strategies}/></li>
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
    per_page: state.search.parameters.per_page,
    query: state.search.parameters.query,
    facets: state.search.parameters.facets,
    response: state.search.response,
    parameters: state.search.parameters,
    request: state.search.request,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query, facets, per_page) => dispatch(performSearch({query: query, facets: facets, page: 1, per_page: per_page}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFacets);
