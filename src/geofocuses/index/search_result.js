import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './search_result.css';

class SearchResult extends Component {
  render() {
    var geofocus = this.props.geofocus;
      return (
        <div className='search-result' key={geofocus.id}>
          <h3>
            <Link to={"/geofocuses/" + this.props.geofocus.id}> {this.props.geofocus.name} </Link>
          </h3>

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
