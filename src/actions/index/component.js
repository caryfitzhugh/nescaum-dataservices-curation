import React, { Component } from 'react';
import {performIndexSearch} from "./actions";
import {performCompleteIndexSearch} from "./../../users/index/actions";
import { connect } from 'react-redux';
import SearchSpinner from './../../search_spinner';
import SearchResults from './search_results';
import './component.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      startdate: null,
      enddate: null,
      page: 1,
    }
  }
  componentDidMount() {
    this.props.performLoadUsers();
    this.setState({page: 1}, () => {
      this.perform_search();
    });
  }
  perform_search() {
    this.props.performSearch(this.state.page, this.props.per_page,
                             this.state.user_id, this.state.startdate, this.state.enddate) ;
  }

  select_user(user) {
    this.setState(
      {user_id: user ? user.id : null},
      () => {
        this.perform_search();
      }
    );
  }

  render() {
    return (
    <div className='container'>
      <div className='row'>
        <div id='sidebar' >
          <h3>History</h3>
          <p> Reports on user activity </p>

          <h5> Users </h5>
          <ul className='actions-users nav nav-pills nav-stacked'>
            <li className='nav-item' key='all'
                onClick={(evt) => this.select_user(null)}>
              <label className={(this.state.user_id === null ? 'active' : '') + ' nav-link'}>
                All
              </label>
            </li>
            {this.props.users.map(user => {
              return <li className='nav-item'
                         key={user.id}
                         onClick={(evt) => this.select_user(user)}>
                  <label className={(this.state.user_id === user.id ? 'active' : '')+ ' nav-link' }> {user.name}</label>
                </li>
            })}
          </ul>
        </div>

        <div className='col'>
          <div className='row'>
            <SearchSpinner is_searching={this.props.is_searching}/>
            <SearchResults is_searching={this.props.is_searching} response={this.props.response}
                           onChangePage={(new_p) => { this.props.performSearch(new_p, this.props.per_page) }}/>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    is_searching: state.actions_index.is_searching,
    per_page: state.actions_index.per_page,
    page: state.actions_index.page,
    response: state.actions_index.response,
    users: ((state.users_index || {}).response || {}).users || []
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (p, pp, user_id, startd, endd) => dispatch(performIndexSearch({user_id: user_id, startdate: startd, enddate:endd, page: p, per_page: pp})),
    performLoadUsers: () => dispatch(performCompleteIndexSearch())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
