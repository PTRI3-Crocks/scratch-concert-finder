import React from 'react';
import {
  makeStyles,
  Box,
  Grid,
  Card,
  CardContent,
  Container,
  Typography,
  Divider,
} from '@material-ui/core';
import EventCard from './EventCard';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.4) ',
    height: '100%',
    margin: 5,
    padding: 10,
  },
  titleCard: {
    margin: 10,
  },
  titleCardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  title: {
    fontSize: '2em',
    fontWeight: 800,
  },
}));

const ConcertList = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Card variant="outlined">
        <CardContent className={classes.titleCardContent}>
          <Box className={classes.titlecard}>
            <Typography className={classes.title}>Upcoming Events</Typography>
          </Box>
        </CardContent>
      </Card>
      <Divider />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
    </Container>
  );
};

export default ConcertList;
