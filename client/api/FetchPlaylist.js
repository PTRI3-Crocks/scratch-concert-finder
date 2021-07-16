import axios from 'axios';
//populates one song from suggested playlist
const FetchPlaylist = async ({ placeId, access_token }) => {
  try {
    return await axios.post('/api/playlist', { placeId, access_token: access_token }).then((response) => {
      console.log('FETCH PLAYLIST DATA', response.data);
      return response.data;
    });
  } catch (e) {
    console.log(e);
  }
};

export default FetchPlaylist;
