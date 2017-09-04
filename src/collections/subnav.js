import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router'
import SubnavLink from './../subnav_link';

class CollectionsSubnav extends Component {
 render() {
  let show_create = !this.props.location.pathname.match('/collections/create');
  return (
    <div className='subnav'>
      <div>
        <SubnavLink path='/collections' title='Search' />
      </div>
      <div>
      {show_create ? <Link className='btn btn-primary create-btn btn-sm' to="/collections/create">Create Collection</Link> : null}
      </div>
    </div>
  );
 }
}

export default withRouter(CollectionsSubnav);
