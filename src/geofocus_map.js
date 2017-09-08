import React, { Component } from 'react';
import {} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import gjBounds from 'geojson-bounds';
import {Map, TileLayer, GeoJSON} from 'react-leaflet';
import {getGeofocus } from './geofocuses/actions';
import {uniq, compact} from 'lodash';
import { connect } from 'react-redux';

class GeofocusMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    let geofocuses = uniq(compact((nextProps.geofocuses || []).map((gfid) => {
                    let gf = ((nextProps).all_geofocuses || {})[gfid];
                    if (!gf) {
                      nextProps.performGeofocusRequest(gfid);
                    }
                    return gf;
                  })));
  }

  render() {
    let geofocuses = uniq(compact((this.props.geofocuses || []).map((gfid) => {
                    let gf = ((this.props || {}).all_geofocuses || {})[gfid];
                    return gf;
                  })));

    let bbox = gjBounds.extent({type: "GeometryCollection",
                                 geometries: geofocuses.map((gf) => gf.geom)});
    let default_bounds = [[37.0200982014,-81.5625],
                          [47.989921667,-63.281]];
    let bounds = bbox[0] ? [[bbox[1],bbox[0]],[bbox[3], bbox[2]]] : (this.props.always_show ? default_bounds : null);

    if (bounds) {
      return (
            <div className='geofocus-map'>
              <Map boundsOptions={{padding: [5,5]}} bounds={bounds}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                {geofocuses.map((gf, indx) => {
                  return gf.id ? <GeoJSON key={indx} data={gf.geom} /> : null;
                })}
              </Map>
              <ul>
                {geofocuses.map((gf, indx) => {
                  return gf.id ? <li key={indx}> {gf.name} </li> : null;
                })}
              </ul>
            </div>);
     } else {
       return null;
     }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    all_geofocuses: state.geofocuses || {},
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    performGeofocusRequest: (id) => dispatch(getGeofocus(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GeofocusMap);
