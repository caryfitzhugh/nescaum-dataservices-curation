import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {geofocus: {}};
  }

  update_field(evt, field) {
    var val = evt.target.value;
    this.setState((old) => {
      var update = Object.assign({}, old.geofocus);
      update[field] = val;
      return Object.assign({}, old, {geofocus: update});
    });
  }

  submit(evt) {
    evt.preventDefault();
    var safe_geofocus = Object.assign({}, this.props.geofocus, this.state.geofocus);
    this.props.onSubmit(safe_geofocus);
  }

  render() {
    return (
      <div className='row'>
        <div className='form col'>
          <h1>{this.props.header_name}</h1>
          <div className="form-group">
            <label>Name</label>
            <input value={this.state.geofocus.name || ((this.props.geofocus || {}).name) || ""} className='form-control' onChange={(evt) => this.update_field(evt, 'name')}/>
          </div>

          <hr/>
          <div className="form-group">
            <button className='btn btn-primary' onClick={(evt) => this.submit(evt)}> {this.props.submit_name} </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
