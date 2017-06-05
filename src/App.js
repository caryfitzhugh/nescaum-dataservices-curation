import React, { Component } from 'react';
import Header from './Header';
import {Switch, Route} from 'react-router-dom'
import Search from './search/component';
// Importing CSS
import './App.css';
import './index.css';
import './bootstrap.scss';


class App extends Component {
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
export default App;
