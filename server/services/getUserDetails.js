const { User } = require('../db');
const { spotifyCurrentUsersProfile } = require('./spotifyCurrentUsersProfile');
const getUserDetails = async (id) => {
  try {
    // const user = await User.findById(id);
    const favoriteSongs = [
      {
        track: {
          id: '32M5CgyOmMJA5vzTQirbGr',
          name: 'Bradley',
          uri: 'spotify:track:32M5CgyOmMJA5vzTQirbGr',
          href: 'https://api.spotify.com/v1/tracks/32M5CgyOmMJA5vzTQirbGr',
          external_urls: {
            spotify: 'https://open.spotify.com/track/4QNpBfC0zvjKqPJcyqBy9W',
          },
        },
        album: {
          id: '71tPWkpLU4nXoyM2i4Q1ax',
          name: 'Bradley',
          uri: 'spotify:album:71tPWkpLU4nXoyM2i4Q1ax',
          images: [
            {
              height: 640,
              url: 'https://i.scdn.co/image/ab67616d0000b2739d468a17f5e6c40a3e9d2aee',
              width: 640,
            },
          ],
          href: 'https://api.spotify.com/v1/albums/71tPWkpLU4nXoyM2i4Q1ax',
          external_urls: {
            spotify: 'https://open.spotify.com/album/4rG0MhkU6UojACJxkMHIXB',
          },
        },
        artist: {
          id: '4hgvJQ6te9I2VRBatFbhov',
          name: 'Casey Ahern',
          href: 'https://api.spotify.com/v1/artists/4hgvJQ6te9I2VRBatFbhov',
          uri: 'spotify:artist:4hgvJQ6te9I2VRBatFbhov',
          external_urls: {
            spotify: 'https://open.spotify.com/artist/0TnOYISbd1XYRBk9myaseg',
          },
        },
        venue: 'ATT Center',
        address: '123 Main Street',
        ticketsLink: `https://www.google.com/search?q=${'Casey Ahern'}+tickets`,
      },
    ];
    // send a request to spotify endpoint

    // set the headers to the spotify token which is the id
    // console.log the response data
    // grab the user details, place on res object
    console.log('id: ', id)
    let userDetails = spotifyCurrentUsersProfile(id);//'BQDB3Mn4tr6Hle_W0XEXOKMHLM8C8zk1FiHxU71mbUXI9TTAK1zW-7blNIUt47ZN2EBHEbgX26NPuaKaDeAXpIcYV6z0ZTIsoJTHpOoP2XtT64Giqhc9l_1UiPYjdbPx0x4L_k18wVsHfL4OVdtW6_KC-S6tjgAAdU9Dy0B-OgUVN-ZQqvOwhW-K6maMMFfJSWDh-T_JE8s_VHmKBltUGJELkGeexIey0ticIqmmsQbgW9D78-ybPsNldNUmsZWHJ4MnW6NxsfKjk3kPI3IaTtE');
    //console.log(userDetails);
    const { display_name, email } = userDetails;
    return {
      name: display_name,
      email: email,
      image: '',
      favoriteSongs: favoriteSongs,
    };
    // send a second request to get favorite songs  
  } catch (e) {
    throw new Error(`getUserDetails error: ${e.message}`);
  }
};

module.exports = {
  getUserDetails,
};
