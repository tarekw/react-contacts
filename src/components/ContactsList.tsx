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

class ContactsList extends React.Component<any> {
  handleClick = (item: any) => {
    this.props.history.push(`/contact/${item.id}`);
  }

  handleUpdate = (item: any) => {
    this.props.history.push(`/update/${item.id}`);
  }

  render() {
    return (
      <div>
        { this.props.contacts && this.props.contacts.length ? (
            <div>
                <List>
                    { this.props.contacts.map((item: any) => (
                      <ListItem key={item.id} button onClick={() => this.handleClick(item)}>
                        <ListItemText primary={item.name} />
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => this.handleUpdate(item)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={(e) => this.props.handleDelete(item)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                </List>
            </div>
        ) : <h3>No contacts found</h3> }
        <Divider />
        <br />
        <Link to="/add">Add new contact</Link>
      </div>
    )
  }
}

export default withRouter(ContactsList);