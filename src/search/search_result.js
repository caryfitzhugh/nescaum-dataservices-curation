import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';
import SearchResultMultiAttribute from './search_result_multi_attribute';
import SearchResultLink from './search_result_link';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.debug = this.debug.bind(this);
  }

  debug () {
    this.props.performSearch();
  }

  render() {
    var resource = this.props.resource;
    var published_on = null;
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    if (resource.pubstart == resource.pubend) {
      published_on = resource.pubstart.split("T")[0];
    } else {
      // (Month) (Year)
      if (resource.pubstart.getMonth() === resource.pubend.getMonth() &&
          resource.pubstart.getYear() === resource.pubend.getYear()) {
        published_on = monthNames[resource.pubstart.getMonth()] + " " + resource.pubstart.getFullYear();
      }
      // (MonthStart) - (MonthEnd) Year
      else if (resource.pubstart.getYear() === resource.pubend.getYear()) {
        published_on = monthNames[resource.pubstart.getMonth()] + " - "
                       monthNames[resource.pubend.getMonth()] + " "
                       + resource.pubstart.getFullYear();
      }
      // (MonthStart) (Year Start) - MEnd YearEnd
      else {
        published_on = monthNames[resource.pubstart.getMonth()] + " "
                      + resource.pubstart.getFullYear() + ' - ' +
                       monthNames[resource.pubend.getMonth()] + " "
                      + resource.pubend.getFullYear();
      }
    }

      return (
        <div className='search-result'>
          <h3>{this.props.resource.title}</h3>
          <h5>{this.props.resource.subtitle}</h5>

          <div className='date'>
            <label>Published:</label>
            <span>{published_on}</span>
          </div>
          {(resource.links || []).map( (link) => {
            return <SearchResultLink value={link}/>
          })}
          <SearchResultMultiAttribute title='Actions' values={resource.actions}/>
          <SearchResultMultiAttribute title='Authors' values={resource.authors}/>
          <SearchResultMultiAttribute title='Effects' values={resource.effects}/>
          <SearchResultMultiAttribute title='Sectors' values={resource.sectors}/>
          <SearchResultMultiAttribute title='Formats' values={resource.formats}/>
          <SearchResultMultiAttribute title='Strategies' values={resource.strategies}/>
          <SearchResultMultiAttribute title='States' values={resource.states}/>
          <SearchResultMultiAttribute title='Keywords' values={resource.keywords}/>
          <SearchResultMultiAttribute title='GeoFocus' values={resource.geofocus}/>
          <SearchResultMultiAttribute title='Climate Changes' values={resource.climate_changes}/>
          <SearchResultMultiAttribute title='Publishers' values={resource.publishers}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
