const { default: axios } = require('axios');
const { access } = require('fs');
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
  console.log('inside spotifyAuthController, res.locals.authURL: ', res.locals.authURL)
  return next()
}

/* This controller is part of the Spotify Authorization Code Flow. It sends the auth code, clientId and clientSecret to Spotify. It returns a token which can then
be used in subsequent API calls */
spotifyAuthController.requestTokens = (req, res, next) => {
  // invoke request tokens with the refresh token as the code...
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

  axios(authOptions)
  .then(function(response) { console.log('this is the axios response: ', response.data);
    if (response.status === 200) {
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      const expires_in = response.data.expires_in;

      res.locals.access_token = access_token;
      res.locals.refresh_token = refresh_token;
      res.locals.expires_in = expires_in;
        
      res.cookie('refresh_token', refresh_token, {maxAge: 2592000}); 

      return next();
    } else {
      console.log('This is the response error from spotify: ', response.data.error);
    }
  })   
   .catch((err) => console.log('Error in axios call in spotifyauthcontroller.requestToken, ', err));
}


// This controller uses the refresh token (stored in users cookies) to get a new access token
spotifyAuthController.exchangeRefreshToken = (req, res, next) => {
  // check if req.cookies.refresh_token exists, and if it does invoke this code
    const refresh_token = req.query.refresh_token;
    const options = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
    };
  
    axios(options) 
      .then((response) => {
        if (response.statusCode === 200) {
          const refresh_token = response.data.refresh_token;
          res.clearCookie('refresh_token');
          res.cookie('refresh_token', refresh_token, {maxAge: 2592000}); 
        }
      })
    .catch((err) => {
      console.log("error in sporifyAuthController.exchangeRefreshToken, ", err)
    })
}



module.exports = spotifyAuthController;