import React, { Component } from 'react';
import { connect } from 'react-redux';
//import {without, uniq} from 'lodash';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending_resource: "",
      collection: {
        name: '',
        resources: [],
      }};
  }

  update_field(evt, field) {
    var val = evt.target.value;
    this.setState((old) => {
      let update = Object.assign({}, old.collection);
      update[field] = val;
      return Object.assign({}, old, {collection: update});
    });
  }

  update_resources(evt) {
    var val = evt.target.value;
    this.setState((old) => {
      var update = Object.assign({}, old.collection);
      update.resources = val.split('\n').map((v) => {
        return v.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      });
      return Object.assign({}, old, {collection: update});
    });
  }

  submit(evt) {
    evt.preventDefault();
    var safe_collection = Object.assign({}, this.props.collection, this.state.collection);
    this.props.onSubmit(safe_collection);
  }

  render() {
    console.log({name: '', resources: []}, this.props.collection, this.state.collection);
    var model = Object.assign({name: '', resources: []}, this.props.collection, this.state.collection);
    let resources_text = model.resources.join("\n");
    return (
      <div className='row'>
        <div className='form col'>
          <h1>{this.props.header_name}</h1>
          <div className="form-group">
            <label>Name</label>
            <input value={model.name || ""} className='form-control' onChange={(evt) => this.update_field(evt, 'name')}/>
          </div>

          <textarea value={resources_text} onChange={(evt) => this.update_resources(evt)} ></textarea>

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
