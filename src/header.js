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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className='navbar-brand'> NDS</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                  <HeaderLink path_prefix='/resources' path='/resources' title='Resources' />
                  <HeaderLink path_prefix='/collections' path='/collections' title='Collections' />
                  <HeaderLink path_prefix='/geofocuses' path='/geofocuses' title='Geofocuses' />
                  <HeaderLink path_prefix='/history' path='/history' title='History' />
                  <li>
                    <span className='nav-item'>
                      <a href="/sign_out" className='nav-link'> <span className='fa fa-sign-out'></span> Logout</a>
                    </span>
                  </li>
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
