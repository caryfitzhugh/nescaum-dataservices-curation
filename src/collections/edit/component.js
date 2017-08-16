import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCollection, updateCollection} from './../actions';
import Form from '../form';

class Edit extends Component {
  componentDidMount() {
    // Want to fetch the details
    this.props.performCollectionGet(this.props.match.params.id);
  }

  submit(data) {
    this.props.performCollectionUpdate(data, this.props.history);
  }

  render() {
    var overlay = null;
    if (this.props.is_updating || this.props.is_deleting) {
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
      <Form
        cancel_destination={"/collections/"+this.props.match.params.id}
        onSubmit={(data) => this.submit(data)}
        collection={this.props.collection}
        submit_name="Update"
        header_name="Update Collection"/>
    </div>
    );
  }
}

const mapStateToProps = (state,ownProps) => {
  return {
    is_updating: (state.collections[ownProps.match.params.id] || {}).is_updating,
    collection: state.collections[ownProps.match.params.id] || {},
    error: state.collections.errors[ownProps.match.params.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performCollectionGet: (id) => dispatch(getCollection(id)),
    performCollectionUpdate: (collection,history) => dispatch(updateCollection(collection, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
