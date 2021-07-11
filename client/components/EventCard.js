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

const EventCard = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container>
          <Grid item xs={8}>
            <Typography>EventTitle</Typography>
            <Typography>EventDate</Typography>
            <Typography>Venue/Location</Typography>
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
};

export default EventCard;
