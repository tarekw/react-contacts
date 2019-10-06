import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./App.css";

class App extends Component<any, any> {
  render() {
    const { match } = this.props;

    if (match.path === '/') {
      return (
        <div className="App">
          <br />
          <Link to="/contacts">Go to contact list</Link>
        </div>
      );  
    }
  }
}

export default App;
