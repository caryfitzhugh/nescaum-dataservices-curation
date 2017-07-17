import React, { Component } from 'react';
import { connect } from 'react-redux';
import {resetCreateGeofocus, createGeofocus} from './actions';
import ActionOverlay from '../../action_overlay';
//import {Link} from 'react-router-dom';
import Form from '../form';

class Create extends Component {
  componentDidMount() {
    this.props.performReset();
  }

  submit(data) {
    this.props.performGeofocusCreate(data, this.props.history);
  }

  render() {
    return (
    <div className='container create-component'>
      <ActionOverlay busy={this.props.is_creating}
                     onErrorPerformReset={() => this.props.performReset()}
                     error={this.props.error}/>
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
