import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MarkersList from './MarkerList';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },

  title: {
    fontSize: 20,
  },
  details: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function PopperContent({
  markers,
  idx,
  setAnchorEl,
  anchorEl,
  selectedMarker,
  setSelectedMarker,
  markerdex,
}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  //   console.log('MARKER IN POP CONTENT ', markerdex.props.id, markers);
  const d = new Date(markers[markerdex.props.id].start);
  const m = d.getUTCMonth();
  const date = d.getUTCDate();
  const y = d.getUTCFullYear();
  return (
    <Card className={classes.root}>
      <CardContent>
        {markers && (
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Event Details
          </Typography>
        )}

        {markerdex && (
          <Typography variant="h4" component="h2">
            {markers[markerdex.props.id].artist.name}
          </Typography>
        )}
        <Typography variant="body2" component="p" className={classes.details}>
          {markers[markerdex.props.id].venue}
        </Typography>
        <Typography variant="body2" component="p">
          {markers[markerdex.props.id].address}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {`${m}/${date}/${y}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          color={'secondary'}
          size={'small'}
          variant={'outlined'}
          onClick={() => {
            console.log();
            setSelectedMarker(null);
            setAnchorEl(null);
          }}
        >
          Close
        </Button>
      </CardActions>
    </Card>
  );
}
