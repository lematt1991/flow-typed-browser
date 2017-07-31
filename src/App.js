import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Browser from './pages/Browser'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Browser} />
        </Switch>
      </Router>
    );
  }
}

export default App;