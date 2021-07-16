const axios = require('axios');
const config = require('../config');
const { predictHqClientTemporaryToken } = config;

const predictHQConcerts = async (coordinates) => {
  try {
    const { lat, lng } = coordinates;
    const latLong = `${lat},${lng}`;
    const radius = 100;

    // const config = {
    //   method: 'get',
    //   url: 'https://api.predicthq.com/v1/events',
    //   headers: {
    //     Authorization: `Bearer ${predictHqClientTemporaryToken}`,
    //     Accept: 'application/json',
    //   },
    //   params: {
    //     category: 'concerts,festivals,performing-arts',
    //     label:
    //       'club,comedy,concert,entertainment,festival,music,performing-arts',
    //     'location_around.origin': `${latLong}`,
    //     'location_around.scale': `${radius}mi`,
    //   },
    // };
    const config = {
      method: 'get',
      url: `https://api.predicthq.com/v1/events?category=concerts&location_around.origin=${latLong}&location_around.scale=${radius}mi`,
      headers: {
        Authorization: `Bearer ${predictHqClientTemporaryToken}`,
      },
    };
    return await axios(config).then((response) => {
      // console.log('PREDICT CONCERTS', response.data);
      return response.data.results;
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = predictHQConcerts;
