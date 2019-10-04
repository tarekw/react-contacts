import React, { Component } from "react";
import { RouteComponentProps } from 'react-router';
import ContactsList from './components/ContactsList';
import ContactCard from './components/ContactCard';
import "./App.css";

class App extends Component<{} & RouteComponentProps<{id: any}>, any> {
  state = {
    contacts: [
      {
        id: '1',
        name: 'tarek',
        email: 't@a.w',
        modified: 'today',
        created: 'yesterday'
      },
      {
        id: '2',
        name: 'sabera',
        email: 't@a.w',
        modified: 'today',
        created: 'yesterday'
      },
      {
        id: '3',
        name: 'farhan',
        email: 't@a.w',
        modified: 'today',
        created: 'yesterday'
      },
      {
        id: '4',
        name: 'alesha',
        email: 't@a.w',
        modified: 'today',
        created: 'yesterday'
      }
    ]
  }

  handleDelete = (item: any) => {
    this.setState((state: any) => ({
      contacts: this.state.contacts.filter(contact => contact.id !== item.id),
    }));
  }

  render() {
    const { match } = this.props;

    if (match.path === '/contacts') {
      return (
        <ContactsList contacts={this.state.contacts} handleDelete={this.handleDelete}/>
      );
    }
    
    if (typeof match.params.id !== undefined) {
      const contact = this.state.contacts.find(item => item.id === match.params.id);
      return (
        contact ? <ContactCard contact={contact} /> : null
      );
    }

    return (
      <div className="App">
        <h1>Contacts</h1>
      </div>
    );
  }
}

export default App;
