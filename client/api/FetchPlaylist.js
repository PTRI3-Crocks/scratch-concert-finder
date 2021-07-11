import axios from 'axios';
//populates one song from suggested playlist
const FetchPlaylist = async ({ placeId }) => {
  try {
    return axios.post('/api/playlist', { placeId }).then((response) => response.data);
  } catch (e) {
    console.log(e);
  }
};

export default FetchPlaylist;
