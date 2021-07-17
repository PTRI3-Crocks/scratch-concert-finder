import React, { useState, createRef, forwardRef } from 'react';
import { Marker } from 'react-map-gl';
import axios from 'axios';
import Pin from './Pin';
import PinPopper from './PinPopper';

const MarkersList = ({ markers, status, cardClicked }) => {
  console.log('MARKERS PLAYLIST DATA IN MARKERLIST', markers);
  let features = [];
  let singleLocation = {};
  console.log('status ', status);

  const [showSingleLocation, setShowSingleLocation] = useState(false);

  const handleOpen = (e, idx) => {
    e.preventDefault();
    getDetails(e, features[idx]);
    // setMapModalOpen(true);
    console.log('map modal OPEN');
  };

  // setup clicked marker state
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerdex, setMarkerdex] = useState(null);

  let content;

  if (status === 'loading') {
    // content = <Spinner />;
  } else if (status === 'done') {
    content = markers?.map((marker, idx) => {
      console.log('MARKER IN MARKERMAP ', marker);
      return (
        <div>
          <Marker
            {...console.log('IDX IN MARKER', cardClicked)}
            key={idx}
            id={idx}
            longitude={marker.location['0']}
            latitude={marker.location['1']}
            onClick={(e, idx) => {
              setMarkerdex(idx);
              setSelectedMarker(e.target);
              console.log('TARGET ', e.target);
              console.log('MARKERINDEX ', markerdex.props.id);
            }}
          >
            <Pin
              id={idx}
              size={idx === cardClicked ? 35 : 20}
              color={idx === cardClicked ? 'green' : 'red'}
            />
            <PinPopper
              markers={markers}
              key={idx}
              idx={idx}
              markerdex={markerdex}
              cardClicked={cardClicked}
              selectedMarker={selectedMarker}
              setSelectedMarker={setSelectedMarker}
            />
          </Marker>
        </div>
      );
    });
  } else if (status === 'error') {
    content = <div>{status}</div>;
  }

  return (
    <div>
      {content}
      {/* {MapModalOpen && (
        <MapModal
          open={MapModalOpen}
          handleClose={handleClose}
          // propList={features}
          prop={propDetail}
        />
      )} */}
    </div>
  );
};

export default MarkersList;
