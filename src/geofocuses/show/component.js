import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGeofocus, deleteGeofocus } from './../actions';
import {Link} from 'react-router-dom';
import "./component.css";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geofocus: {}
    };
  }

  componentDidMount() {
    // Want to fetch the details
    this.props.performGeofocusGet(this.props.match.params.id);
  }
  delete_geofocus (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    if (window.confirm("Delete Geofocus?\n\nThis will permanently delete the record!")) {
      this.props.performGeofocusDelete(this.props.geofocus.id);
      // Send yourself "back" in the browser
    }
  }

  render() {
    if (this.props.geofocus) {
      return (
        <div className='container-fluid'>
          <h2>
            {this.props.geofocus.name}
            <Link className='btn btn-secondary' to={'/geofocuses/' + this.props.geofocus.id +'/edit'}> Edit Geofocus </Link>
            <button onClick={(evt) => this.delete_geofocus(evt)} className='btn btn-danger'> Delete Geofocus </button>
          </h2>
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
    geofocus: state.geofocuses[ownProps.match.params.id],
    error: state.geofocuses.errors[ownProps.match.params.id],
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performGeofocusGet: (id) => dispatch(getGeofocus(id)),
    performGeofocusDelete: (id) => dispatch(deleteGeofocus(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
