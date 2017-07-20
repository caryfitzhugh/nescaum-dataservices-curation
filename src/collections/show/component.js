import React, { Component } from 'react';
import ActionOverlay from '../../action_overlay';
import { connect } from 'react-redux';
import CollectionList from './../collection_list';
import { resetCollectionError, getCollection, deleteCollection } from './../actions';
import {Link} from 'react-router-dom';
import "./component.css";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: {}
    };
  }

  componentDidMount() {
    // Want to fetch the details
    this.props.performCollectionGet(this.props.match.params.id);
  }

  delete_collection (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if (window.confirm("Delete Collection?\n\nThis will permanently delete the record!")) {
      // Send yourself "back" in the browser
      this.props.performCollectionDelete(this.props.collection, this.props.history);
    }
  }
  render() {

    if (this.props.collection) {
      return (
        <div className='container-fluid'>
          <ActionOverlay busy={this.props.is_deleting}
                       onErrorPerformReset={() => this.props.performReset(this.props.geofocus)}
                       error={this.props.error} />
          <h2>
            {this.props.collection.name}
            <Link className='btn btn-secondary' to={'/collections/' + this.props.collection.id +'/edit'}> Edit Collection </Link>
            <button onClick={(evt) => this.delete_collection(evt)} className='btn btn-danger'> Delete Collection </button>
          </h2>
          <CollectionList docids={this.props.collection.resources} />
        </div>);
    } else if (this.props.error ) {
      return (
        <div className='container-fluid'>
          <h1> Error</h1>
          <p>{this.props.error}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    is_deleting: (state.collections[ownProps.match.params.id] || {}).is_deleting,
    collection: state.collections[ownProps.match.params.id],
    error: state.collections.errors[ownProps.match.params.id],
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performCollectionGet: (id) => dispatch(getCollection(id)),
    performCollectionDelete: (collection, history) => dispatch(deleteCollection(collection, history)),
    performReset: (collection) => dispatch(resetCollectionError(collection)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
