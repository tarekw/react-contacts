import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Query, Mutation } from '@apollo/react-components';

import {
  ALL_CONTACTS,
  DELETE_CONTACT,
} from './constants';

class ContactsList extends React.Component<any, any> {
  handleClick = (item: any) => {
    this.props.history.push(`/contact/${item.id}`);
  }

  handleUpdate = (item: any) => {
    this.props.history.push(`/update/${item.id}`);
  }

  render() {
    return (
      <React.Fragment>
        <List>
          <Query query={ALL_CONTACTS}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              return data.contacts.map((item: any) => (
                <ListItem key={item.id} button onClick={() => this.handleClick(item)}>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => this.handleUpdate(item)}>
                      <EditIcon />
                    </IconButton>
                    <Mutation mutation={DELETE_CONTACT} key={item.id} refetchQueries={() => [{query: ALL_CONTACTS}]}>
                      {deleteContact => (
                        <IconButton onClick={(e) => deleteContact({ variables: { id: item.id } }) }>
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Mutation>
                  </ListItemSecondaryAction>
                </ListItem>
              ));
            }}
          </Query>
        </List>
        <Divider />
        <br />
        <Link to="/add">Add new contact</Link>
      </React.Fragment>
    );
  }
}

export default withRouter(ContactsList);