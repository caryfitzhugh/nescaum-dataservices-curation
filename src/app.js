import React, { Component } from 'react';
import Header from './header';
import {Switch, Route} from 'react-router-dom'
import Search from './search/component';
import Create from './create/component';
import Show from   './show/component';
import { connect } from 'react-redux';

import {performSearch} from "./search/actions";
// Importing CSS
import './app.css';

class App extends Component {
  render() {
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path='/' component={Search}/>
          <Route exact path='/resources/create' component={Create}/>
          <Route exact path='/resources/:id' component={Show}/>
        </Switch>
      </div>
    );
  }
}

export default App;
