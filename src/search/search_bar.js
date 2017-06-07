import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.execute_search = this.execute_search.bind(this);
    this.handle_key_press = this.handle_key_press.bind(this);
    this.update_query = this.update_query.bind(this);
    this.state = {
      search_query: ''
    };
  }

  update_query(evt) {
    this.setState({ search_query: evt.target.value });
  }

  handle_key_press(target) {
    if(target.key === "Enter") {
      this.execute_search();
    }
  }

  execute_search () {
    this.props.performSearch(this.state.search_query);
  }

  render() {
    return (
          <div className='input-group'>
            <input value={this.state.search_query}
                   onChange={this.update_query}
                   onKeyDown={this.handle_key_press}
                   className='form-control' type='text' placeholder="Enter search query here"/>
            <div className='input-group-addon btn btn-primary' onClick={this.execute_search}>Search</div>
          </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    parameters: state.search.parameters
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (query) => dispatch(
      performSearch({query: query, facets:{}, page: 1, per_page: 10}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
