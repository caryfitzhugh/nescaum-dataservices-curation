import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router'
import {Switch, Route} from 'react-router-dom'
import SubnavLink from './../subnav_link';

class CollectionsSubnav extends Component {
 render() {
  return (
    <div className='subnav'>
      <div>
        <SubnavLink path='/collections' title='Search' />
      </div>
      <div>
        <Link className='btn btn-primary create-btn btn-sm' to="/resources/create">Create Collection</Link>
      </div>
    </div>
  );
 }
}

export default withRouter(CollectionsSubnav);
