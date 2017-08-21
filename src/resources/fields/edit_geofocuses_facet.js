import React, { Component } from 'react';
import GeofocusesModal from './geofocuses_modal';
import { connect } from 'react-redux';
import './edit_geofocus_facet.css';
import {compact, without, uniq} from 'lodash';
import GeofocusMap from '../../geofocus_map';
import {getGeofocus } from './../../geofocuses/actions';

class EditGeofocusesFacet extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  create_new_facet(new_value) {
    this.props.onChange(uniq(this.props.values.concat([new_value])));
  }

  remove_facet(facet) {
    this.props.onChange(without(this.props.values, facet))
  }


  render() {
    let values = this.props.values || [];
    let geofocuses = compact(
      values.map((gfid) => {
                    let gf = ((this.props || {}).all_geofocuses || {})[gfid];
                    if (!gf) {
                      this.props.performGeofocusRequest(gfid);
                    }
                    return gf;
                  }));
    return (
    <div className='geofocuses-facet resource-facet'>
        <h3>Geofocuses</h3>
        <div>
          <ul>
          {values.length === 0 ?
            <li> <em> No Geofocuses</em></li> : null}
          { geofocuses.map( (geofocus, indx) => {
              return <li key={geofocus.id + 'i' +indx}>
                <span className='badge badge-primary'>
                  {geofocus.name}
                  <span className='fa fa-times-circle-o' onClick={(evt) => this.remove_facet(geofocus.id)}></span>
                </span>
                </li>
            })}
          </ul>
        </div>
        <GeofocusMap always_show={true} geofocuses={this.props.values || []} />
        <GeofocusesModal name={this.props.name}
                    field_name={this.props.field_name}
                    allow_custom={this.props.allow_custom}
                    onAdd={(newv) => this.create_new_facet(newv)} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    all_geofocuses: state.geofocuses || {},
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performGeofocusRequest: (id) => dispatch(getGeofocus(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGeofocusesFacet);
