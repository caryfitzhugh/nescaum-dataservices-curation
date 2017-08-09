import React, { Component } from 'react';
import Header from './header';
import {Switch, Route, Redirect} from 'react-router-dom'

import ResourcesSearch from './resources/search/component';
import ResourcesCreate from './resources/create/component';
import ResourcesShow from   './resources/show/component';
import ResourcesEdit from   './resources/edit/component';
import ResourcesUnindexed from   './resources/unindexed/component';

import GeofocusesIndex from './geofocuses/index/component';
import GeofocusesShow from './geofocuses/show/component';
import GeofocusesCreate from './geofocuses/create/component';
import GeofocusesEdit from './geofocuses/edit/component';

import CollectionsCreate from './collections/create/component';
import CollectionsShow from './collections/show/component';
import CollectionsEdit from './collections/edit/component';
import CollectionsIndex from './collections/index/component';

import ActionsIndex from './actions/index/component';


// Importing CSS
import './app.css';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <Header location={this.props.location}/>
        <Switch>
          <Route exact path='/' render={() => <Redirect to="/resources" /> }/>
          <Route exact path='/resources/unindexed' component={ResourcesUnindexed}/>
          <Route exact path='/resources/create' component={ResourcesCreate}/>
          <Route exact path='/resources/:id/edit' component={ResourcesEdit}/>
          <Route exact path='/resources/:id' component={ResourcesShow}/>
          <Route exact path='/resources' component={ResourcesSearch}/>

          <Route exact path='/geofocuses/create' component={GeofocusesCreate}/>
          <Route exact path='/geofocuses/:id/edit' component={GeofocusesEdit}/>
          <Route exact path='/geofocuses/:id' component={GeofocusesShow}/>
          <Route exact path='/geofocuses' component={GeofocusesIndex}/>

          <Route exact path='/collections/create' component={CollectionsCreate}/>
          <Route exact path='/collections/:id/edit' component={CollectionsEdit}/>
          <Route exact path='/collections/:id' component={CollectionsShow}/>
          <Route exect path='/collections' component={CollectionsIndex}/>

          <Route exect path='/history' component={ActionsIndex}/>
        </Switch>
      </div>
    );
  }
}

export default App;
