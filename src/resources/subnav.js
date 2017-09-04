import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router'
import SubnavLink from './../subnav_link';

class ResourcesSubnav extends Component {
 render() {
  let show_create = !this.props.location.pathname.match('/resources/create');
  return (
    <div className='subnav'>
      <div>
        <SubnavLink path='/resources' title='Search' />
        <SubnavLink path='/resources/unindexed' title='Unindexed' />
      </div>
      <div>
        {show_create ? <Link className='btn btn-primary create-btn btn-sm' to="/resources/create">Create Resource</Link> : null}
      </div>
    </div>
  );
 }
}
export default withRouter(ResourcesSubnav);
