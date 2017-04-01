import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Quote from './quote.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Quote of the Day</h2>
        </div>
        <div>
            <Quote />
        </div>
      </div>
    );
  }
}

export default App;
