
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './search_result.css';

class SearchResult extends Component {
  render() {
    var action = this.props.action;
      return (
        <div className='search-result' key={action.id}>
          <h3>
            <Link to={"/"+action.table +"/" + action.record_id}> {action.identifier || (action.table + "::" + action.record_id)} </Link>
          </h3>

          <span>
            {(this.props.users[action.user_id] || {}).name}
          </span>

          <span>  {action.description} </span>
          <span>  at </span>
          <span> {action.at} </span>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    users: (state.users || {})
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
