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

  // sets cookie to a random number
  // this is a cookie key
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

spotifyAuthController.requestTokens = (req, res, next) => {
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
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
    return next();
}

module.exports = spotifyAuthController;