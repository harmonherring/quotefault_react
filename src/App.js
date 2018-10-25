import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Quotefault from './quotefault_api_fetch.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue : '',
    }
  }

  render() {
    return (
      <>
      <Quotefault />
      </>
    );
  }
}

export default App;
