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

const EventCard = ({ concert }) => {
  const d = new Date(concert.start);
  const m = d.getUTCMonth();
  const date = d.getUTCDate();
  const y = d.getUTCFullYear();

  console.log(concert.entities['0']?.name, d, 'CONCERT IN EVENTCARD');
  if (concert) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h5" component="h5">
                {concert.title}
              </Typography>
              <Typography>{`${m}/${date}/${y}`}</Typography>
              <Typography>{concert.entities['0']?.name}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Fab>
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
