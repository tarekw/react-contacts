import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";
import { withRouter } from 'react-router-dom';

// very basic email check
const emailIsValid = (email: string) => {
  return /\S+@\S+\.\S+/.test(email)
}

class ContactForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const newContact = {
      name: '',
      email: '',
    };

    this.state = {
      contact: props.contact || newContact,
      isNew: typeof props.contact === 'undefined',
    };
  }

  handleChange = (e: any) => {
    const contact = {
      ...this.state.contact,
    };
    contact[e.target.id] = e.target.value;

    this.setState((state: any) => ({
      contact,
    }));
  };

  handleUpdate = () => {
    if (this.state.contact.name === '' || !emailIsValid(this.state.contact.email)) {
      window.alert('please enter valid name and email!');
      return;
    }
    this.props.handleUpdate(this.state.contact, this.state.isNew);
    this.props.history.push(`/contacts`);
  }

  handleCancel = () => {
    this.props.history.push(`/contacts`);
  }
  
  render() {
    return (
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
            <Input id="name" type="text" value={this.state.contact.name} onChange={this.handleChange} />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="email" value={this.state.contact.email} onChange={this.handleChange} />
          </FormControl>
          <Button variant="text" color="primary" size="small" onClick={this.handleUpdate}>
            Save
          </Button>
          <Button variant="text" color="secondary" size="small" onClick={this.handleCancel}>
            cancel
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(ContactForm);
