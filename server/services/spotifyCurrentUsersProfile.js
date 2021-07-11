const axios = require('axios');

const spotifyCurrentUsersProfile = async ({ spotifyToken }) => {
  try {
    const requestOptions = {
      method: 'get',
      url: `https://api.spotify.com/v1/me`,
      headers: {
        Authorization: `Bearer + ${spotifyToken}`,
      },
    };
    return await axios(requestOptions).then((response) => console.log(response));
  } catch (e) {
    throw new Error('Error in spotifyCurrentUsersProfile.js: ' + e.message);
  }
};

module.exports = {
  spotifyCurrentUsersProfile
};