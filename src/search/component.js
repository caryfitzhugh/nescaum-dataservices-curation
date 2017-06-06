import React, { Component } from 'react';
import {performSearch} from "./actions";
import { connect } from 'react-redux';

class Search extends Component {
  constructor(props) {
    super(props);
    this.debug = this.debug.bind(this);
  }

  debug () {
    this.props.performSearch();
  }

  render() {
    return (
      <div className='container'>
        <div className='btn btn-primary' onClick={this.debug}>Debug Search</div>
        <span>{JSON.stringify(this.props.search)}</span>
      </div>
    );
  }
}

//<Route path='/new' component={Create}/>
//<Route path='/edit/:id' component={Edit}/>
const mapStateToProps = (state) => {
  return {
    search: state.search
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: () => dispatch(performSearch({query: "hi", facets: {actions: [1,2,3]}, page: 1, per_page: 10}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
