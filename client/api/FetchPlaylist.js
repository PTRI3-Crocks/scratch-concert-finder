import axios from 'axios';
//populates one song from suggested playlist
const FetchPlaylist = async ({ placeId, access_token }) => {
  try {
    const response = await axios.post('/api/playlist', { placeId, access_token: access_token });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export default FetchPlaylist;
