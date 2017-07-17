import React, { Component } from 'react';
import ActionOverlay from '../../action_overlay';
import { connect } from 'react-redux';
import { resetGeofocusError, getGeofocus, updateGeofocus} from './../actions';
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
    return (
    <div className='container create-component'>
      <ActionOverlay busy={this.props.is_updating || this.props.is_deleting}
                     onPerformReset={() => this.performErrorReset(this.props.geofocus)}
                     error={this.props.error} />

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
    is_updating: (state.geofocuses[ownProps.match.params.id] || {}).is_updating,
    geofocus: state.geofocuses[ownProps.match.params.id],
    error: state.geofocuses.errors[ownProps.match.params.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performErrorReset: (geofocus) => dispatch(resetGeofocusError(geofocus)),
    performGeofocusGet: (id) => dispatch(getGeofocus(id)),
    performGeofocusUpdate: (geofocus,history) => dispatch(updateGeofocus(geofocus, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
