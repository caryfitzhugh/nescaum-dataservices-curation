import React, { Component } from 'react';
//import {performCreate} from "./actions";
import { connect } from 'react-redux';

class Create extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className='container-fluid'>
      <div className='row'>
        <h1>Create</h1>
        <p>
          Component
        </p>
      </div>
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
//    performBlankCreate: () => dispatch(performCreate({query: "", facets: {}, page: 1, per_page: 10}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
