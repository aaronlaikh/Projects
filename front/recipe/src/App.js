import React, { Component } from 'react';
import './App.css';
import List from './components/List';
import Recipe from './components/Recipe';
//var Recipe = require('./components/Recipe');

class App extends Component {
  render() {
    return (
      <div className="App">
        <List />
      </div>
    );
  }
}

export default App;
