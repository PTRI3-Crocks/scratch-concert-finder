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
    // maxHeight: '800px',
    margin: 5,
    padding: 10,
    overflow: 'scroll-y',
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
//click on list card, change color, press play button to play sample song, click find tickets opens new tab
// for whatever ticket vendor, pin changes color on map to indicated the one selected on list.
const ConcertList = ({
  playlistData,
  setTrack,
  setCardClicked,
  cardClicked,
  anchorEl,
  setAnchorEl,
}) => {
  const classes = useStyles();
  console.log('CARDCLICKED IN CONCERTLIST', setCardClicked);

  return (
    <Container className={classes.root} style={{ overflow: 'scroll-y' }}>
      <Card variant="outlined">
        <CardContent className={classes.titleCardContent}>
          <Box className={classes.titlecard}>
            <Typography className={classes.title}>Upcoming Events</Typography>
          </Box>
        </CardContent>
      </Card>
      <Divider />
      {playlistData?.map((event, idx) => (
        <EventCard
          key={idx}
          idx={idx}
          event={event}
          setTrack={setTrack}
          cardClicked={cardClicked}
          setCardClicked={setCardClicked}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
      ))}
    </Container>
  );
};

export default ConcertList;
