import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionOverlay from '../../action_overlay';
import Form from './../form';
import {resetCreateResource, createResource, facetQuery} from './actions';
import {performCompleteIndexSearch} from './../../geofocuses/index/actions';
import "./component.css";

class Create extends Component {
  submit(data) {
    this.props.performResourceCreate(data, this.props.history);
  }

  render() {
    return (
    <div className='container create-component'>
      <ActionOverlay busy={this.props.is_creating}
          onPerformErrorReset={() => this.props.performReset()}
          error={this.props.error}/>
      <Form onSubmit={(data) => this.submit(data)}
            resource={ {} }
            submit_name="Create Resource"
            header_name="Create New Resource" />
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    is_creating: state.resources_create.is_creating,
    created_docid: state.resources_create.created_docid,
    error: state.resources_create.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performResourceCreate: (resource, history) => dispatch(createResource(resource, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
