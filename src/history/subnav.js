import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router'
import {Route} from 'react-router-dom'
import SubnavLink from './../subnav_link';

class HistorySubnav extends Component {
 render() {
  return (
    <div className='subnav'>
      <div>
        <SubnavLink path='/history' title='Report' />
      </div>
      <div>
      </div>
    </div>
  );
 }
}
export default withRouter(HistorySubnav);
