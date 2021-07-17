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
    
    height: '100%',
    maxHeight: '90vh',
    backgroundColor: 'f1faee',
    overflow: 'auto',
  },
  titleCard: {
    margin: 5,
    backgroundColor: 'f1faee'
  },
  
  titleCardContent: {
    justifyContent: 'center',
   
    alignItems: 'center',
    margin: 0,
    backgroundColor: 'f1faee'
  },
  title: {
    fontSize: '60%',
    fontWeight: 700,
    color: '1d3557',
    backgroundColor: 'f1faee'
  },
  event: {
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.4) ',   
  },
}));

//click on list card, change color, press play button to play sample song, click find tickets opens new tab
// for whatever ticket vendor, pin changes color on map to indicated the one selected on list.
const ConcertList = ({
  playlistData,
  setTrack,
  setCardClicked,
  cardClicked,
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.root} >
      <Card variant="outlined" className={classes.card}>
        <CardContent className={classes.titleCardContent}>
          <Box className={classes.titlecard}>
            <Typography className={classes.title}>Upcoming Events</Typography>
          </Box>
        </CardContent>
      </Card>
      <Divider />
      {playlistData?.map((event, idx) => (
        <EventCard
          className={classes.event}
          key={idx}
          idx={idx}
          event={event}
          setTrack={setTrack}
          cardClicked={cardClicked}
          setCardClicked={setCardClicked}
        />
      ))}
    </Container>
  );
};

export default ConcertList;
