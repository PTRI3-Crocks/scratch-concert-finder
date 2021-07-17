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
    backgroundColor: 'rgb(94, 96, 206,0.42)',
    margin: 10,
    '&:hover': {
      backgroundColor: 'rgb(72, 191, 227, 0.42)',
    },
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

const EventCard = ({
  event,
  setTrack,
  idx,
  cardClicked,
  setCardClicked,
  anchorEl,
  setAnchorEl,
}) => {
  const d = new Date(event.start);
  const m = d.getUTCMonth();
  const date = d.getUTCDate();
  const y = d.getUTCFullYear();
  const classes = useStyles();

  if (event) {
    return (
      <Card
        variant="outlined"
        className={classes.titleCard}
        onClick={(e) => {
          console.log('ID IN CARD ONLCIK', idx);
          console.log('currentTarget', e.currentTarget);
          setCardClicked(idx);
        }}
      >
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
