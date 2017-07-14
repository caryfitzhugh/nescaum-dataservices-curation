import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGeofocus, updateGeofocus} from './../actions';
import {Link} from 'react-router-dom';
import Form from '../form';

class Edit extends Component {
  componentDidMount() {
    // Want to fetch the details
    this.props.performGeofocusGet(this.props.match.params.id);
  }

  submit(data) {
    this.props.performGeofocusUpdate(data, this.props.history);
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

    if (this.props.created_id) {
      overlay = <div className='loading-overlay'>
          <div className='content'>
            <Link to={"/geofocuses/" + this.props.created_id}> Go To Geofocus </Link>
          </div>
        </div>;
    }

    return (
    <div className='container create-component'>
      {overlay}
      {JSON.stringify(this.props)}
      <Form onSubmit={(data) => this.submit(data)}
            geofocus={this.props.geofocus}
            submit_name="Update"
            header_name="Update Geofocus"/>
    </div>
    );
  }
}

const mapStateToProps = (state,ownProps) => {
  return {
    geofocus: state.geofocuses[ownProps.match.params.id],
    error: state.geofocuses.errors[ownProps.match.params.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performGeofocusGet: (id) => dispatch(getGeofocus(id)),
    performGeofocusUpdate: (geofocus,history) => dispatch(updateGeofocus(geofocus, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
