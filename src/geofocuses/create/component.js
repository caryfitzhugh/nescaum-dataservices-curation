import React, { Component } from 'react';
import { connect } from 'react-redux';
import {resetCreateGeofocus, createGeofocus} from './actions';
import {Link} from 'react-router-dom';
import Form from '../form';

class Create extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.performReset();
  }

  submit(data) {
    this.props.performGeofocusCreate(data, this.props.history);
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
            geofocus={{}}
            submit_name="Create Geofocus"
            header_name="Create New Geofocus"/>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    is_creating: state.geofocuses_create.is_creating,
    error: state.geofocuses_create.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performReset: () => dispatch(resetCreateGeofocus()),
    performGeofocusCreate: (geofocus, history) => dispatch(createGeofocus(geofocus, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
