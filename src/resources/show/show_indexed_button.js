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
            <div >
              <label> Is PUBLIC </label>
              <button className='btn btn-primary' onClick={(evt) => this.make_private()}>Make Private</button>
            </div>);
    } else {
    return (
            <div>
              <label>Is PRIVATE </label>
              <button className='btn btn-primary' onClick={(evt) => this.make_public()}>Make Public</button>
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
