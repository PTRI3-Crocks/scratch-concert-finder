const axios = require('axios');

const spotifyCurrentUsersProfile = (spotifyToken) => {
  try {
    const requestOptions = {
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: `Bearer ${spotifyToken}`
      },
    };
    const userResponse = axios(requestOptions);//.then((response) => console.log('response: ', response));
    //console.log('userResponse ', userResponse);
    return userResponse;
  } catch (error) {
    console.log('Error in spotifyCurrentUsersProfile.js: ' + error.message);
  }
};

module.exports = {
  spotifyCurrentUsersProfile
};