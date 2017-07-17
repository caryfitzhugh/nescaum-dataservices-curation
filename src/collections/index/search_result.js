import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './search_result.css';

class SearchResult extends Component {
  render() {
    var collection = this.props.collection;
      return (
        <div className='search-result' key={collection.id}>
          <h3>
            <Link to={"/collections/" + this.props.collection.id}> {this.props.collection.name} </Link>
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
