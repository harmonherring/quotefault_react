import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Quotefault_Navbar from './header.js';
import 'csh-material-bootstrap/dist/csh-material-bootstrap.min.css';

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
      <Quotefault_Navbar />
      <Quotefault />
      </>
    );
  }
}

export default App;
