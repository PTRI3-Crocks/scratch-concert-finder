const axios = require('axios');
const config = require('../config');
const { googleMapsApiKey } = config;

const googleMapsDistance = async ({ pointA, pointB }) => {

  const config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${pointA}&destinations=${pointB}&mode=driving&units=imperial&key=${googleMapsApiKey}`,
    headers: {},
  };

  try {
    const response = await axios(config);
    return response.data.rows[0].elements[0].distance.text;
  } 
  catch (e) {
    throw new Error(e.message);
  }
};

module.exports = googleMapsDistance;
