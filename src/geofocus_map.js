import React, { Component } from 'react';
import {L} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import gjBounds from 'geojson-bounds';
import {Map, TileLayer, GeoJSON} from 'react-leaflet';
import {performCompleteIndexSearch} from './geofocuses/index/actions';
import {getGeofocus } from './geofocuses/actions';
import {compact} from 'lodash';
import { connect } from 'react-redux';

class GeofocusMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: {}
    };
  }

  componentDidMount() {
  }

  render() {
    let geofocuses = compact((this.props.geofocuses || []).map((gfid) => {
                    let gf = ((this.props || {}).all_geofocuses || {})[gfid];
                    if (!gf) {
                      this.props.performGeofocusRequest(gfid);
                    }
                    return gf;
                  }));

    let bbox = gjBounds.extent({type: "GeometryCollection",
                                 geometries: geofocuses.map((gf) => gf.geom)});

    let bounds = bbox[0] ? [[bbox[1],bbox[0]],[bbox[3], bbox[2]]] : null;
    if (bounds) {
      return (
            <div className='geofocus-map'>
              <Map boundsOptions={{padding: [50,50]}} bounds={[[bbox[1],bbox[0]],[bbox[3], bbox[2]]]}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                {geofocuses.map((gf) => {
                  return gf ? <GeoJSON key={gf.id} data={gf.geom} /> : null;
                })}
              </Map>
              <ul>
                {geofocuses.map((gf) => {
                  return gf ? <li key={gf.id}> {gf.name} </li> : null;
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
