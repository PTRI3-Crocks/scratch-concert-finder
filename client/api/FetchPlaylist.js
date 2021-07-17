import axios from 'axios';
//populates one song from suggested playlist
const FetchPlaylist = async ({ placeId }) => {
  try {
    return await axios.post('/api/playlist', { placeId }).then((response) => {
      console.log('FETCH PLAYLIST DATA', response.data);
      return response.data;
    });
  } catch (e) {
    console.log(e);
  }
};

export default FetchPlaylist;
