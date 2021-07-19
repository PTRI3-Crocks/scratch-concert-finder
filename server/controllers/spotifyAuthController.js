const { default: axios } = require('axios');
const querystring = require('querystring');


/* This controller utilizes the Spotify Authorization Code Flow.
For more information, visit: https://developer.spotify.com/documentation/general/guides/authorization-guide/ */
const spotifyAuthController = {}
const redirect_uri = 'http://localhost:3000/api/callback';
const stateKey = 'spotify_auth_state';

/* This controller is part of the Spotify Authorization Code Flow. It redirects the user
to Spotify Accounts Services, where the user is prompted to authorize access*/
spotifyAuthController.getAuthURL = (req, res, next) => {

  // generates a randon string which will be a cookie
  const generateRandomString = function(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  // assigns cookie a random number and sets cookie
    let state = generateRandomString(16);
    res.cookie(stateKey, state);

  // requests authorization code from spotify
  const scope = 'streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state playlist-modify-private playlist-read-private user-library-modify user-library-read';
  res.locals.authURL = ('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  }))
  return next()
}

/* This controller is part of the Spotify Authorization Code Flow. It sends the auth code, clientId and clientSecret to Spotify. It returns a token which can then
be used in subsequent API calls */
spotifyAuthController.requestTokens = async (req, res, next) => {

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  // this conditional block handles failed security in the transaction between the server and Spotify
  if (state === null || state !== storedState) {
      console.log('Failed transaction between the server and Spotify in spotifyAuthController.requestTokens')
      return next();
  } 

  res.clearCookie(stateKey);

  // send the code back to spotify to get a token
  var authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
  };

  try {
    const response = await axios(authOptions)
    if (response.status === 200) {

      res.locals.access_token = response.data.access_token;
      res.locals.refresh_token = response.data.refresh_token;
      res.locals.expires_in = response.data.expires_in;
      
      res.cookie('refresh_token', res.locals.refresh_token, {maxAge: 2592000}); 

      return next();

    } else {
      console.log('This is the response error from spotify in spotifyauthcontroller.requestTokens, error from spotify: ', response.data.error);
    }
  }
  catch(err) {
      console.log('Error in axios call in spotifyauthcontroller.requestToken, ', err);
  }
}

// This controller uses the refresh token (stored in users cookies) to get a new access token
// TODO: Test and implement
spotifyAuthController.exchangeRefreshToken = async (req, res, next) => {

  if (req.cookies === 'refresh_token') {

    const refresh_token = req.cookie.refresh_token;

    const options = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
    };

    try {
      const response = await axios(options); 
      if (response.statusCode === 200) {

        res.clearCookie('refresh_token');

        res.locals.access_token = response.data.access_token;
        res.locals.refresh_token = response.data.refresh_token;
        res.locals.expires_in = response.data.expires_in;

        res.cookie('refresh_token', refresh_token, {maxAge: 2592000}); 

        return next();
      }
    }
    catch(err) {
      console.log("error in sporifyAuthController.exchangeRefreshToken, ", err)
    }
  }
  return next();
}



module.exports = spotifyAuthController;