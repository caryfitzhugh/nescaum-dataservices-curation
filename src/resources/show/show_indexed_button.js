import React, { Component } from 'react';
import { connect } from 'react-redux';
import { indexResource } from './../actions';

class ShowIndexedButton extends Component {
  make_public () {
    this.props.indexResource(this.props.resource.id, true);
  }
  make_private () {
    this.props.indexResource(this.props.resource.id, false);
  }
  render() {
    if (this.props.resource.indexed) {
    return (
      <div className='show-indexed-button btn-group' >
        <button className='btn btn btn-warning disabled'> Is PUBLIC </button>
        <button className='btn btn btn-success' onClick={(evt) => this.make_private()}>Make Private</button>
      </div>);
    } else {
    return (
      <div className='show-indexed-button btn-group'>
        <button className='btn btn btn-success' onClick={(evt) => this.make_public()}>Make Public</button>
        <button className='btn btn btn-warning disabled'> Is PRIVATE </button>
      </div>);
    }
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    indexResource: (id, indexed) => dispatch(indexResource(id, indexed))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowIndexedButton);
