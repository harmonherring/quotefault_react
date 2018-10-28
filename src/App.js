import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Quotefault_Navbar from './header.js';
import Quotefault from './quote-components/quotefault_api_fetch.js';

import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight
)

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
      <link href="https://themeswitcher.csh.rit.edu/api/get" rel="stylesheet" />
      <Quotefault_Navbar />
      <div className="container">
        <Quotefault />
      </div>
      </>
    );
  }
}

export default App;
