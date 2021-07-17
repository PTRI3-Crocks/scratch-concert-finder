import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import PopperContent from './PopperContent';

const useStyles = makeStyles((theme) => ({
  paper: {
    border: 'none',
    padding: theme.spacing(1),
    backgroundColor: 'rgba(0,0,0,0)'//'#f1faee'//theme.palette.background.paper,
  },
  
}));

export default function PinPopper({
  idx,
  cardClicked,
  selectedMarker,
  markers,
  setSelectedMarker,
  markerdex,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e, anchorEl) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };
  // useEffect(() => {
  //   setAnchorEl(document.getElementById(`marker${cardClicked}`));
  //   // cardClicked === idx ? setAnchorEl(selectedMarker) : null;
  // }, [cardClicked]);
  useEffect(() => {
    setAnchorEl(null);
    setAnchorEl(selectedMarker);
  }, [selectedMarker]);

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;
  // console.log('ANCHOR IN  PINPOP ', anchorEl, open, idx);

  return (
    <div>
      <Popper
        id={'trasitions-popper'}
        open={open}
        placement={'top'}
        anchorEl={anchorEl}
        markers={markers}
        selectedMarker={selectedMarker}
        markerdex={markerdex}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className={classes.paper}>
              <PopperContent
                markers={markers}
                markerdex={markerdex}
                idx={idx}
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                setSelectedMarker={setSelectedMarker}
              />
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
