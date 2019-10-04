import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from 'react-router-dom';

class ContactsList extends React.Component<any> {
  handleClick = (item: any) => {
    this.props.history.push(`/contact/${item.id}`);
  };

  render() {
    return (
      <div>
        { this.props.contacts ? (
            <div>
                <List>
                    { this.props.contacts.map((item: any) => (
                      <ListItem key={item.id} button onClick={((e) => this.handleClick(item))}>
                        <ListItemText primary={item.name} />
                        <ListItemSecondaryAction>
                          <IconButton onClick={((e) => this.props.handleDelete(item))}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                </List>
            </div>
        ) : "No contacts found" }
      </div>
    )
  }
}

export default withRouter(ContactsList);