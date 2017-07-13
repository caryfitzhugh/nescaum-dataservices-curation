import React, { Component } from 'react';
import Header from './header';
import {Switch, Route} from 'react-router-dom'
import ResourcesSearch from './resources/search/component';
import ResourcesCreate from './resources/create/component';
import ResourcesShow from   './resources/show/component';
import ResourcesUnindexed from   './resources/unindexed/component';
import { connect } from 'react-redux';

// Importing CSS
import './app.css';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <Header location={this.props.location}/>
        <Switch>
          <Route exact path='/resources' component={ResourcesSearch}/>
          <Route exact path='/resources/unindexed' component={ResourcesUnindexed}/>
          <Route exact path='/resources/create' component={ResourcesCreate}/>
          <Route exact path='/resources/:id' component={ResourcesShow}/>
        </Switch>
      </div>
    );
  }
}

export default App;
