import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { Query, Mutation } from '@apollo/react-components';

import {
  ADD_CONTACT,
  GET_CONTACT,
  ALL_CONTACTS,
  UPDATE_CONTACT,
} from './constants';

const basicEmailCheck = (email: string) => {
  return /\S+@\S+\.\S+/.test(email)
}

const isContactValid = (contact: any) => {
  if (contact.name === '' || !basicEmailCheck(contact.email)) {
    return false;
  }
  return true;
}

class ContactForm extends React.Component<any, any> {
  nameRef:any = React.createRef();
  emailRef:any = React.createRef();

  showContactList = () => {
    this.props.history.push(`/contacts`);
  }

  handleChange = (e: any, contact: any) => {
    contact[e.target.id] = e.target.value;
  }

  renderForm = (gqlMutation: any = ADD_CONTACT, contact: any = { name: '', email: '', id: 'id' }) => (
    <Mutation mutation={gqlMutation} key={contact.name} refetchQueries={() => [{query: ALL_CONTACTS}, {query: GET_CONTACT, variables: { id: contact.id }}]}>
      {mutation => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 20,
            padding: 20
          }}
        >
        <form style={{ width: "50%" }}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name" type="text" defaultValue={contact.name} inputRef={this.nameRef} onChange={(e) => this.handleChange(e, contact)}/>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="email" defaultValue={contact.email} inputRef={this.emailRef} onChange={(e) => this.handleChange(e, contact)}/>
          </FormControl>
          <Button variant="text" color="primary" size="small" onClick={async () => {
            contact.name = this.nameRef.current.value;
            contact.email = this.emailRef.current.value;

            delete contact.created;
            delete contact.modified;

            if (!isContactValid(contact)) {
              window.alert('please enter valid name and email!');
              return;
            }
            await mutation({ variables: { contact } });
            this.showContactList();
          }}>
            Save
          </Button>
          <Button variant="text" color="secondary" size="small" onClick={this.showContactList}>
            Cancel
          </Button>
        </form>
      </div>
    )}
    </Mutation>
  );
  
  render() {
    const { id } = this.props.match.params;

    if (id) {
      return (
        <Query query={GET_CONTACT} variables={{ id }}>
          {({ loading, error, data }:any) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return this.renderForm(UPDATE_CONTACT, data.contact);
          }}
        </Query>
      )
    } else {
      return this.renderForm();
    }
  }
}

export default withRouter(ContactForm);
