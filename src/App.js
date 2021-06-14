import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';


export default class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game" component={Game} />


      </Switch>
    );

  }
}
