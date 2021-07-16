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
    backgroundColor: '#f1faee', //'rgb(94, 96, 206,0.42)',
    boxShadow: '0 2px 4px 1px rgba(0, 0, 0, 0.4) ',
    margin: 10,
    '&:hover': {
      backgroundColor: '457b9d'//'rgb(72, 191, 227, 0.42)',
    },
  },
  titleCardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  title: {
    fontSize: '65%',
    fontWeight: 800,
  },
  artist:{
    fontSize: '75%',
    fontWeight: 600,
  },
  info: {
    fontSize: '60%',
    fontWeight: 400,
  },
  grids:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  // button: {
  //   fontSize: '60%',
  //   height:'2em',
  //   width: '2em',
  //   alignItems  : 'center',
  //   justifyContent: 'center',
  //   // backgroundColor: '#a8dadc',
  //   '&:hover': {
  //     backgroundColor: '#a8dadc'
  //   },
  // },
  // tickets: {
  //   fontSize: '30%',
  //   height:'3em',
  //   width: '4em',
  //   alignContent: 'space-evenly',
  //   justifyContent: 'space-evenly',
  //   // backgroundColor: '#a8dadc',
  //   '&:hover': {
  //     backgroundColor: '#a8dadc'
  //   },
  // },
}));

const EventCard = ({ event, setTrack, idx, cardClicked, setCardClicked }) => {
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
        onClick={() => {
          setCardClicked(idx);
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item xs={8}>
              <Typography 
                className={classes.artist} 
                variant="h5" 
                component="h5">
                  {event.artist.name}
              </Typography>
              <Typography 
                className={classes.info} 
                variant="h5" 
                component="h5">
                  {`${m}/${date}/${y}`}
              </Typography>
              <Typography 
                className={classes.info} 
                variant="h5" 
                component="h5">
                  {event.venue}
              </Typography>
            </Grid>
            <Grid item xs={4} className={classes.grids}>
              <Fab className={classes.button} onClick={() => setTrack(event.track.uri)}>
                <PlayArrowIcon />
              </Fab>
              <Fab variant="extended" className={classes.tickets}>
                <ConfirmationNumberIcon />
                Find Tickets
              </Fab>
            </Grid>
            <Grid item xs={12}>
              <Fab variant="extended" className={classes.tickets}>
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
