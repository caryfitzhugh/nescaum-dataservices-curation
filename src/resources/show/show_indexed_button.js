import React, { Component } from 'react';
import { connect } from 'react-redux';
import { indexResource } from './../actions';

class ShowIndexedButton extends Component {
  constructor(props) {
    super(props);
  }
  make_public () {
    this.props.indexResource(this.props.resource.docid, true);
  }
  make_private () {
    this.props.indexResource(this.props.resource.docid, false);
  }
  render() {
    if (this.props.resource.indexed) {
    return (
      <div className='show-indexed-button btn-group' >
        <button className='btn btn-sm btn-secondary disabled'> Is PUBLIC </button>
        <button className='btn btn-sm btn-primary' onClick={(evt) => this.make_private()}>Make Private</button>
      </div>);
    } else {
    return (
      <div className='show-indexed-button btn-group'>
        <button className='btn btn-sm btn-primary' onClick={(evt) => this.make_public()}>Make Public</button>
        <button className='btn btn-sm btn-secondary disabled'> Is PRIVATE </button>
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
    indexResource: (docid, indexed) => dispatch(indexResource(docid, indexed))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowIndexedButton);
