import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom'
import HeaderLink from './header_link';
import ResourcesSubnav from './resources/subnav.js';
import CollectionsSubnav from './collections/subnav.js';
import GeofocusesSubnav from './geofocuses/subnav.js';
import ActionsSubnav from './actions/subnav.js';

import "./header.css";

class Header extends Component {
 render() {
   return (
     <div>
      <nav className='navbar navbar-toggleable-md navbar-inverse bg-inverse'>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className='navbar-brand'> NDS</Link>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className="navbar-nav mr-auto">
            <HeaderLink path_prefix='/resources' path='/resources' title='Resources' />
            <HeaderLink path_prefix='/collections' path='/collections' title='Collections' />
            <HeaderLink path_prefix='/geofocuses' path='/geofocuses' title='Geofocuses' />
            <HeaderLink path_prefix='/history' path='/history' title='History' />
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path='/resources' component={ResourcesSubnav}/>
        <Route path='/collections' component={CollectionsSubnav}/>
        <Route path='/geofocuses' component={GeofocusesSubnav}/>
        <Route path='/history' component={ActionsSubnav}/>
      </Switch>
    </div>
  );
 }
}
export default Header;
