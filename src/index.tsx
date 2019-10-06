import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';

import './index.css';
import App from './App';
import NavBar from './components/NavBar';
import ContactsList from './components/ContactsList';
import ContactCard from './components/ContactCard';
import ContactForm from './components/ContactForm';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  })
});

const routing = (
  <ApolloProvider client={client}>
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/contacts" component={ContactsList} />
          <Route path="/contact/:id" component={ContactCard} />
          <Route path="/add" component={ContactForm} />
          <Route path="/update/:id" component={ContactForm} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
