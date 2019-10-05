import React, { Component } from "react";
import { RouteComponentProps } from 'react-router';
import { Link } from "react-router-dom";
import * as moment from 'moment';

import ContactsList from './components/ContactsList';
import ContactCard from './components/ContactCard';
import ContactForm from './components/ContactForm';
import "./App.css";

class App extends Component<{} & RouteComponentProps<{id: any, param: any}>, any> {
  state = {
    contacts: [
      {
        id: '1',
        name: 'tarek',
        email: 't@a.w',
        modified: '05-10-2019 14:56',
        created: '05-10-2019 14:56'
      },
      {
        id: '2',
        name: 'sabera',
        email: 't@a.w',
        modified: '05-10-2019 14:56',
        created: '05-10-2019 14:56'
      },
      {
        id: '3',
        name: 'farhan',
        email: 't@a.w',
        modified: '05-10-2019 14:56',
        created: '05-10-2019 14:56'
      },
      {
        id: '4',
        name: 'alesha',
        email: 't@a.w',
        modified: '05-10-2019 14:56',
        created: '05-10-2019 14:56'
      }
    ],
    currentId: 4, // TODO, this sould be coming from backend
  }

  constructor(props: any) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleDelete = (item: any) => {
    this.setState((state: any) => ({
      contacts: state.contacts.filter((contact: any) => contact.id !== item.id),
    }));
  }

  handleUpdate = (item: any, isnew: boolean = false) => {
    const now = moment.default().format('DD-MM-YYYY HH:mm');
    if (isnew) {
      item.id = (this.state.currentId + 1).toString();
      item.created = now;
      item.modified = now;
      this.setState((state: any) => ({
        contacts: [...state.contacts, item],
        currentId: state.currentId + 1,
      }));
    } else {
      const contact = this.state.contacts.find(contact => contact.id === item.id);
      if (contact) {
        contact.name = item.name;
        contact.email = item.email;
        contact.modified = now;

        const newList = this.state.contacts.filter(contact => contact.id !== item.id);
        newList.push(contact);

        this.setState({
          contacts: newList,
        });
      }
    }
  }

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

    if (match.path === '/contacts') {
      return (
        <ContactsList
          contacts={this.state.contacts}
          handleDelete={this.handleDelete}
        />
      );
    }

    if (match.path === '/add') {
      return (
        <ContactForm handleUpdate={this.handleUpdate} />
      );
    }

    if (typeof match.params.id !== undefined && match.path === '/update/:id') {
      const contact = this.state.contacts.find(item => item.id === match.params.id);
      return (
        <ContactForm
          contact={contact}
          handleUpdate={this.handleUpdate}
        />
      );
    }

    if (typeof match.params.id !== undefined && !isNaN(match.params.id)) {
      const contact = this.state.contacts.find(item => item.id === match.params.id);
      return (
        contact ? <ContactCard contact={contact} /> : null
      );
    }
  }
}

export default App;
