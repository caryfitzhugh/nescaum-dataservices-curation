import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';
import SearchFacet from './search_facet';
import {isEmpty } from 'lodash';
import SearchFacetNested from './search_facet_nested';
import deep_equal from 'deep-equal';
import './search_facets.css';

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
  active_filters() {
    return !isEmpty(this.props.request.facets);
  }

  render() {
    if (this.props.response) {
      var facets = this.props.response.facets || {};
      return (
        <div className='search-facets'>
          <h3>Search Facets</h3>
          {this.pending_search() ? <button onClick={this.apply_filters} className='btn btn-sm btn-block btn-primary'> Apply Filters</button> : null}
          {this.active_filters() ? <button onClick={this.clear_search} className='btn btn-sm btn-block btn-secondary'> Clear Filters</button> : null}

          <ul className="nav nav-pills nav-stacked">
            <li><SearchFacetNested type="actions" title="Actions" facets={facets.actions}/></li>
            <li><SearchFacet type="authors" title="Authors" facets={facets.authors}/></li>
            <li><SearchFacetNested type="climate_changes" title="Climate Changes" facets={facets.climate_changes}/></li>
            <li><SearchFacetNested type="effects" title="Effects" facets={facets.effects}/></li>
            <li><SearchFacetNested type="formats" title="Formats" facets={facets.formats}/></li>
            <li><SearchFacetNested type="geofocus" title="GeoFocus" facets={facets.geofocus}/></li>
            <li><SearchFacetNested type="keywords" title="Keywords" no_expansion={true} facets={facets.keywords}/></li>
            <li><SearchFacet type="publishers" title="Publishers" facets={facets.publishers}/></li>
            <li><SearchFacetNested type="sectors" title="Sectors" facets={facets.sectors}/></li>
            <li><SearchFacet type="states" title="States" facets={facets.states}/></li>
            <li><SearchFacetNested type="strategies" title="Strategies" facets={facets.strategies}/></li>
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
    per_page: state.resources_search.parameters.per_page,
    query: state.resources_search.parameters.query,
    facets: state.resources_search.parameters.facets,
    response: state.resources_search.response,
    parameters: state.resources_search.parameters,
    request: state.resources_search.request,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query, facets, per_page) => dispatch(performSearch({query: query, facets: facets, page: 1, per_page: per_page}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFacets);
