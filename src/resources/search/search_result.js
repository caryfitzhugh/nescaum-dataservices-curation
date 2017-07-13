import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';
import SearchResultMultiAttribute from './search_result_multi_attribute';
import SearchResultLink from './search_result_link';
import {Link} from 'react-router-dom';

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

    try {
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
    } catch (e) {
      published_on = "";
    }
    var published = <div className='date'>
            <label>Published:</label>
            <span>{published_on}</span>
          </div>
    if (published_on === "") {
      published = null;
    }

      return (
        <div className='search-result' key={resource.docid}>
          <h3>
            <Link to={"/resources/" + this.props.resource.docid}> {this.props.resource.title} </Link>
          </h3>
          <h5>{this.props.resource.subtitle}</h5>
          {published}

          {(resource.links || []).map( (link) => {
            return <SearchResultLink key={link} value={link}/>
          })}
          <SearchResultMultiAttribute title='Actions' values={resource.actions}/>
          <SearchResultMultiAttribute title='Authors' values={resource.authors}/>
          <SearchResultMultiAttribute title='Climate Changes' values={resource.climate_changes}/>
          <SearchResultMultiAttribute title='Effects' values={resource.effects}/>
          <SearchResultMultiAttribute title='Formats' values={resource.formats}/>
          <SearchResultMultiAttribute title='GeoFocus' values={resource.geofocus}/>
          <SearchResultMultiAttribute title='Keywords' values={resource.keywords}/>
          <SearchResultMultiAttribute title='Publishers' values={resource.publishers}/>
          <SearchResultMultiAttribute title='Sectors' values={resource.sectors}/>
          <SearchResultMultiAttribute title='States' values={resource.states}/>
          <SearchResultMultiAttribute title='Strategies' values={resource.strategies}/>
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
