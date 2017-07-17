import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router'
import SubnavLink from './../subnav_link';

class GeofocusesSubnav extends Component {
 render() {
  return (
    <div className='subnav'>
      <div>
        <SubnavLink path='/geofocuses' title='Index' />
      </div>
      <div>
        <Link className='btn btn-primary create-btn btn-sm' to="/geofocuses/create">Create Geofocus</Link>
      </div>
    </div>
  );
 }
}
export default withRouter(GeofocusesSubnav);
