import React, { useState } from 'react';
import { Marker } from 'react-map-gl';
import Pin from './Pin';
// import MapModal from './components/MapModal';
import axios from 'axios';

const MarkersList = ({ markers, status, cardClicked }) => {
  console.log('MARKERS PLAYLIST DATA IN MARKERLIST', markers);
  let features = [];
  let singleLocation = {};
  // const { status } = props;
  console.log('status ', status);

  // setup state to toggle Popupp
  const [MapModalOpen, setMapModalOpen] = useState(false);

  //   const MarkersList = (markers) => {
  // const data = props.props.features;
  // const data = boiseList.propertiesForSale.features;

  const [showSingleLocation, setShowSingleLocation] = useState(false);

  //state to hold specific property details when map pin clicked
  //will be displayed on modal and saved to mongodb if fav added
  const [propDetail, setPropDetail] = useState({});

  //second api call to get rent data and rating on specific address
  // const getDetails = async (e, feature) => {
  //   // console.log('DATA ', data);
  //   console.log('clicked property');
  //   console.log(feature);
  //   if (props.props.propertiesForSale) {
  //     const res = await api.post('/properties/target', null, {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       params: {
  //         location: feature['properties']['Address'],
  //         home_type: feature['properties'].Type,
  //         beds: feature['properties']['# bedrooms'],
  //         baths: feature['properties']['# bathrooms'],
  //         Price: feature['properties'].Price,
  //         ZPID: feature['properties'].ZPID,
  //       },
  //     });
  //     console.log(JSON.stringify(res.data.targetForSale, null, 2));
  //     console.log(
  //       Object.assign(
  //         feature.properties,
  //         res.data.targetForSale.features[0].properties
  //       )
  //     );
  //     setPropDetail(feature);
  //     console.log('PROP DETAIL', propDetail);
  //     setMapModalOpen(true);
  //   } else {
  //     setPropDetail(feature);
  //     setMapModalOpen(true);
  //   }
  // };
  //open/close handlers for add record modal
  const handleOpen = (e, idx) => {
    e.preventDefault();
    getDetails(e, features[idx]);
    // setMapModalOpen(true);
    console.log('map modal OPEN');
  };

  const handleClose = () => {
    setMapModalOpen(false);
  };

  // setup clicked marker state
  const [selectedMarker, setSelectedMarker] = useState({});

  let content;

  if (status === 'loading') {
    // content = <Spinner />;
  } else if (status === 'done') {
    content = markers?.map((marker, idx) => (
      <Marker
        {...console.log('IDX IN MARKER', cardClicked)}
        key={idx}
        id={idx}
        longitude={marker.location['0']}
        latitude={marker.location['1']}
        // longitude={marker.geometry.coordinates[0]}
        // latitude={marker.geometry.coordinates[1]}
        // onClick={() => handleMarkerClick(marker)}
        onClick={(e) => handleOpen(e, idx)}
      >
        {/* <Pin size={20} color={'red'} /> */}
        <Pin
          size={idx === cardClicked ? 35 : 20}
          color={idx === cardClicked ? 'green' : 'red'}
        />
        {/* <Pin
          color={props.props.targetForSale && idx === 0 ? 'green' : 'red'}
          size={props.props.targetForSale && idx === 0 ? 35 : 20}
        /> */}
      </Marker>
    ));
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
