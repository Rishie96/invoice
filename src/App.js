import React, { Component } from 'react';
import Header from './Header';
import Items from './Items';

export default class App extends Component {

  onAddNewHandler = () => {

  }

  render() {
    return (
      <div>
        <Header />
        <Items />
      </div>
    )
  }
}