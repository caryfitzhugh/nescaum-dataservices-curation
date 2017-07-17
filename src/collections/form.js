import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {collection: {}};
  }

  update_field(evt, field) {
    var val = evt.target.value;
    this.setState((old) => {
      var update = Object.assign({}, old.collection);
      update[field] = val;
      return Object.assign({}, old, {collection: update});
    });
  }

  submit(evt) {
    evt.preventDefault();
    var safe_collection = Object.assign({}, this.props.collection, this.state.collection);
    this.props.onSubmit(safe_collection);
  }

  render() {
    return (
      <div className='row'>
        <div className='form col'>
          <h1>{this.props.header_name}</h1>
          <div className="form-group">
            <label>Name</label>
            <input value={this.state.collection.name || ((this.props.collection || {}).name) || ""} className='form-control' onChange={(evt) => this.update_field(evt, 'name')}/>
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
