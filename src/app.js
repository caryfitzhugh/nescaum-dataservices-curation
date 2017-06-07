import React, { Component } from 'react';
import Header from './header';
import {Switch, Route} from 'react-router-dom'
import Search from './search/component';
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
        </Switch>
      </div>
    );
  }
}

//<Route path='/new' component={Create}/>
//<Route path='/edit/:id' component={Edit}/>
const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
