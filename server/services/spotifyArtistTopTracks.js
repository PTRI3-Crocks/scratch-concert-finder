const axios = require('axios');
const config = require('../config');

const spotifyArtistTopTracks = async ({ artistId, access_token }) => {

  const config = {
    method: 'get',
    url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axios(config);
    const playable = response.data.tracks.filter((t) => t.is_playable);
    return playable;
  } 
  catch (e) {
    throw new Error('spotifyArtistTopTracks error: ' + e.message);
  }
  
};

module.exports = spotifyArtistTopTracks;
