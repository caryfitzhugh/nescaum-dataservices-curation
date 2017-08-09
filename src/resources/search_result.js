import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResultLink from './search_result_link';
import {Link} from 'react-router-dom';
import './search_result.css';
class SearchResult extends Component {
  render() {
    var resource = this.props.resource;
    var published_on = null;
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    try {
      if (resource.pubstart === resource.pubend) {
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
                        + monthNames[resource.pubend.getMonth()] + " "
                        + resource.pubstart.getFullYear();
        }
        // (MonthStart) (Year Start) - MEnd YearEnd
        else {
          published_on = monthNames[resource.pubstart.getMonth()] + " "
                        + resource.pubstart.getFullYear() + ' - ' +
                        + monthNames[resource.pubend.getMonth()] + " "
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
        <div className='search-result' key={resource.id}>
          <h3>
            <Link to={"/resources/" + this.props.resource.id}> {this.props.resource.title} </Link>
          </h3>
          <h5>{this.props.resource.subtitle}</h5>
          {published}

          {(resource.links || []).map( (link) => {
            return <SearchResultLink key={link} value={link}/>
          })}
        </div>
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
