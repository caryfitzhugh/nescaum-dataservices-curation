import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router'
import HeaderLink from './header_link';
import {Route} from 'react-router-dom'

class SubnavLink extends Component {
 render() {
  let is_active = this.props.path === this.props.location.pathname;
  let li_class = is_active ? 'active' : '';

  return (
    <HeaderLink el='span' path={this.props.path} title={this.props.title}/>
  );
 }
}
export default withRouter(SubnavLink);
