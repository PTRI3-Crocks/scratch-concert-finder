const axios = require('axios');
const config = require('../config');
const { predictHqClientTemporaryToken } = config;

const predictHQConcerts = async (coordinates) => {

    const { lat, lng } = coordinates;
    const latLong = `${lat},${lng}`;
    const radius = 100;

    const config = {
      method: 'get',
      url: `https://api.predicthq.com/v1/events?category=concerts&location_around.origin=${latLong}&location_around.scale=${radius}mi`,
      headers: {
        Authorization: `Bearer ${predictHqClientTemporaryToken}`,
      },
    };
    
    try {
      const response = await axios(config);
      return response.data.results;
    }
    catch (e) {
      throw new Error(e.message);
  }
};

module.exports = predictHQConcerts;
