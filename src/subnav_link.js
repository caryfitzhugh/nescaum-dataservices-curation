import React, { Component } from 'react';
import { withRouter } from 'react-router'
import HeaderLink from './header_link';

class SubnavLink extends Component {
 render() {
  return (
    <HeaderLink el='span' path={this.props.path} title={this.props.title}/>
  );
 }
}
export default withRouter(SubnavLink);
