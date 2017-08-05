import React, { Component } from 'react';
import MultiSelect from '../multi_select';
import { connect } from 'react-redux';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {geofocus: {}};
  }

  update_field(evt_or_val, field) {
    let val = evt_or_val;
    if (evt_or_val.target) {
      val = evt_or_val.target.value;
    }

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
            <div className='form-text text-muted'>
              The name is the display name for the geofocus "Southwestern Nevada", etc.
            </div>
          </div>
          <MultiSelect title="Type"
              onChange={(val) => this.update_field(val, 'type')}
              allow_custom={true}
              options={['facility','municipality','county','watershed','state/province','subnational region','country','transnational region','continent','populated place']} />
          <div className="form-group">
            <label>UID</label>
            <input value={this.state.geofocus.uid || ((this.props.geofocus || {}).uid) || ""} className='form-control' onChange={(evt) => this.update_field(evt, 'uid')}/>
            <div className='form-text text-muted'>
              The UID is the type-specific identifier which will be used when searching (an example would be a zipcode or watershed id).
            </div>
          </div>
          <div className="form-group">
            <label>GeoJSON</label>
            <textarea value={this.state.geofocus.geom || ((this.props.geofocus || {}).geom) || ""} className='form-control' onChange={(evt) => this.update_field(evt, 'geom')}/>
            <div className='form-text text-muted'>
              The GeoJSON should be properly formatted and simple features (no feature collections!)
            </div>
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
