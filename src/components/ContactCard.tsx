import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

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

export default function ContactCard({ contact }:any) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
              {contact.name}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
              {contact.email}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
              {contact.modified}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
              {contact.created}
          </Typography>
        </CardContent>
      </Card>
      <br />
      <Link to="/contacts">Go to contact list</Link>
    </React.Fragment>
  );
}