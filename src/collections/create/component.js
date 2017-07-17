import React, { Component } from 'react';
import { connect } from 'react-redux';
import {resetCreateCollection, createCollection} from './actions';
//import {Link} from 'react-router-dom';
import Form from '../form';

class Create extends Component {
  componentDidMount() {
    this.props.performReset();
  }

  submit(data) {
    this.props.performCollectionCreate(data, this.props.history);
  }

  render() {
    var overlay = null;
    if (this.props.is_creating) {
      overlay = <div className='loading-overlay'>
          <div className='content'>
            <span className='fa fa-spinner'></span>
          </div>
        </div>;
    }
    if (this.props.error) {
      overlay = <div className='loading-overlay'>
          <div className='content'>
            <h1> Error</h1>
            <p> There was an error creating this record. </p>

            <pre>
              {JSON.stringify(this.props.error)}
            </pre>

            <a className='btn btn-primary' onClick={(evt) => { this.props.performReset() }}> Clear </a>
          </div>
        </div>;

    }

    return (
    <div className='container create-component'>
      {overlay}
      <Form onSubmit={(data) => this.submit(data)}
            collection={{}}
            submit_name="Create Collection"
            header_name="Create New Collection"/>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    is_creating: state.collections_create.is_creating,
    error: state.collections_create.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performReset: () => dispatch(resetCreateCollection()),
    performCollectionCreate: (collection, history) => dispatch(createCollection(collection, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
