import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { Query } from '@apollo/react-components';

import { GET_CONTACT } from './constants';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ContactCard({ match }:any) {
  const classes = useStyles();
  const { id } = match.params;

  return (
    <React.Fragment>
      <Query query={GET_CONTACT} variables={{ id }}>
        {({ loading, error, data }:any) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                    Name: {data.contact.name}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Email: {data.contact.email}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Modified: {data.contact.modified}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Created: {data.contact.created}
                </Typography>
              </CardContent>
            </Card>
          );
        }}
      </Query>
       <br />
       <Link to="/contacts">Back to contact list</Link>
    </React.Fragment>
  );
}