import React, { Component } from 'react';
import Header from './Header';
import {Switch, Route} from 'react-router-dom'
import Search from './search/component';
import { connect } from 'react-redux';

import {performSearch} from "./search/actions";
// Importing CSS
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className='container'>
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
