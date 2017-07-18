import React, { Component } from 'react';
import { withRouter } from 'react-router'
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
