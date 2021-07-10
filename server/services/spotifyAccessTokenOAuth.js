const axios = require('axios');
const qs = require('qs');
const moment = require('moment');

const config = require('../config');
const { Token } = require('../db/index');


//  this should be the 'second call' to spotify. It is a get request which passes the auth code to spotify and returns a token

const spotifyAccessTokenOAuth = async (code) => {
  // destructure the clientId and clientSecret from the config
  const { spotifyClientId, spotifyClientSecret } = config;
  try {
    // create a base64 string to send as a header to spotify, composed of id and secret
    const encodedIdAndSecret = Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
      'base64'
    );
    // create a data object to be passed to spotify?
    const data = qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:8080/callback',
    });

    // USED 'CONFIG' AS AN IMPORT VARIABLE!!! RENAME!!!
    const config = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token/',
      headers: {
        Authorization: `Basic ${encodedIdAndSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };
    const token = await axios(config).then((response) => response.data);
    // are they generating their own timestamp? instead of pulling one off the spotify response?
    const dbPayload = {
      source: 'Spotify OAuth',
      tokenId: token.access_token,
      timestamp: moment(),
    };
    await new Token(dbPayload).save();
    return token;
  } catch (e) {
    throw new Error('spotifyAccessTokenOAuth error: ' + e.message);
  }
};

module.exports = spotifyAccessTokenOAuth;
