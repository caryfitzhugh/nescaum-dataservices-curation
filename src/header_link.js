import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router'

class HeaderLink extends Component {
 render() {
  let is_active = this.props.path === this.props.location.pathname;
  if (this.props.path_prefix) {
    is_active = this.props.location.pathname.match(this.props.path_prefix);
  }
  let li_class = is_active ? 'active' : '';
  let link = (<Link className='nav-link' to={this.props.path}>{this.props.title}</Link>);

  if (this.props.el === 'span') {
    return ( <span className={'nav-item ' + li_class}> {link } </span>);
  } else {
    return ( <li className={'nav-item ' + li_class}> {link} </li>);
  }
 }
}
export default withRouter(HeaderLink);
