import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionOverlay from '../../action_overlay';
import Form from './../form';
import {getResource, resetResourceError, updateResource} from './../actions';
import "./component.css";

class Edit extends Component {
  submit(data) {
    this.props.performResourceUpdate(data, this.props.history);
  }
  componentDidMount() {
    // Want to fetch the details
    this.props.performResourceGet(this.props.match.params.id);
  }

  performReset() {
    this.props.performErrorReset();
  }


  render() {
    return (
    <div className='container create-component'>
      <ActionOverlay busy={this.props.is_updating}
          onPerformErrorReset={() => this.performReset()}
          error={this.props.error}/>
      <Form onSubmit={(data) => this.submit(data)}
            resource={ this.props.resource }
            submit_name="Edit Resource"
            header_name="Edit Resource" />
    </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    is_updating: (state.resources[ownProps.match.params.id] || {}).is_updating,
    resource: state.resources[ownProps.match.params.id],
    error: state.resources.errors[ownProps.match.params.id],
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performErrorReset: (resource) => dispatch(resetResourceError(resource)),
    performResourceGet: (id) => dispatch(getResource(id)),
    performResourceUpdate: (resource,history) => dispatch(updateResource(resource, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
