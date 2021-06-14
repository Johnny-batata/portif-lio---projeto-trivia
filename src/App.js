import React from 'react';
import logo from './trivia.png';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home'


export default class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route path="/" component={Home} />

      </Switch>
    );

  }
}
