import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router'
import {Route} from 'react-router-dom'
import SubnavLink from './../subnav_link';

class ResourcesSubnav extends Component {
 render() {
  return (
    <div className='subnav'>
      <div>
        <SubnavLink path='/resources' title='Search' />
        <SubnavLink path='/resources/unindexed' title='Unindexed' />
      </div>
      <div>
        <Link className='btn btn-primary create-btn btn-sm' to="/resources/create">Create Resource</Link>
      </div>
    </div>
  );
 }
}
export default withRouter(ResourcesSubnav);
