const axios = require('axios');
const config = require('../config');
const { googleMapsApiKey } = config;

const googleMapsPlaceLatLong = async (placeId) => {

  const config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleMapsApiKey}`,
    headers: {},
  };

  try {
    const response = await axios(config);
    return response.data.result.geometry.location;
  } 
  catch (e) {
    throw new Error(e.message);
  }
};

module.exports = googleMapsPlaceLatLong;
