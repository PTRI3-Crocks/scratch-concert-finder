// https://mariestarck.com/how-to-display-a-mapbox-map-and-geocoder-mapbox-react-tutorial-part-1/

import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
// import MarkersList from './MarkersList';
import axios from 'axios';

const mapboxApiKey = process.env.MAPBOXAPIKEY;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const VenueMap = ({ search, mapZip }) => {

  // set Markers state

  const [status, setStatus] = useState(null);

  const [markers, setMarkers] = useState({});

  useEffect(() => {
    const defaultLocation = 'Mountain View, CA';
    
  }, []);

  const classes = useStyles('');

  const mapRef = useRef();
  const geocoderContainerRef = useRef();

  const mapStyle = {
    width: '100%',
    height: '800px',
  };

  const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px',
  };
  const zipConvert = async (zip) => {
    await axios(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    ).then((data) => {
      console.log('ZIP CONVERT', data);

      handleViewportChange({
        longitude: data?.data.results['0'].geometry.location.lng,
        latitude: data?.data.results['0'].geometry.location.lat,
        zoom: 12,
        bearing: 0,
        pitch: 0,
      });

      console.log(
        'ZIP ',
        data?.data.results['0'].geometry.location.lat,
        data?.data.results['0'].geometry.location.lng
      );
    });
  };
  useEffect(() => {
    mapZip && zipConvert(mapZip);
  }, [mapZip]);
  //   useEffect(() => {
  //     search && zipConvert(search);
  //   }, [search]);

  //when click on location in search, set viewport.
  const [viewport, setViewport] = useState({
    // default location - NY,NY
    longitude: -73.9712,
    latitude: 40.7831,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });

  const [addressCoordinates, setAddressCoordinates] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0,
  });

  const handleViewportChange = useCallback((newViewport) => {
    
    setViewport(newViewport);
    // save coordinate to reverse lookup address by coordinates
    setAddressCoordinates(newViewport);
  }, []);

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  return (
    <Container>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}></Grid>

          <ReactMapGL
            ref={mapRef}
            mapboxApiAccessToken={mapboxApiKey}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            {...viewport}
            {...mapStyle}
            onViewportChange={handleViewportChange}
          >
            

            <div style={navStyle}>
              <NavigationControl />
            </div>
          </ReactMapGL>
        </Grid>
      </div>
      <div>
        {/* <Paper className={classes.paper}>
          xs=12 lat: {viewport.latitude} <br />
          lng: {viewport.longitude} <br />
          zoom: {viewport.zoom}
        </Paper> */}
      </div>
    </Container>
  );
};

export default VenueMap;
