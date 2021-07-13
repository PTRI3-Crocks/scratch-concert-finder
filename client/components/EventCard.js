import React from 'react';
import {
  makeStyles,
  Box,
  Grid,
  Card,
  CardContent,
  Container,
  Typography,
  Fab,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

const EventCard = ({ event, setTrack }) => {
  const d = new Date(event.start);
  const m = d.getUTCMonth();
  const date = d.getUTCDate();
  const y = d.getUTCFullYear();

  if (event) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h5" component="h5">
                {event.artist.name}
              </Typography>
              <Typography>{`${m}/${date}/${y}`}</Typography>
              <Typography>{event.venue}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Fab onClick={() => setTrack(event.track.uri)}>
                <PlayArrowIcon />
              </Fab>
            </Grid>
            <Grid item xs={2}>
              <Fab variant="extended">
                <ConfirmationNumberIcon />
                Find Tickets
              </Fab>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
};

export default EventCard;
