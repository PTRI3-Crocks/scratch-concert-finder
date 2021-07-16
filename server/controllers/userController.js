const { getUserDetails } = require('../services/getUserDetails');
const { default: axios } = require('axios');
const { Token, User } = require('../db/index');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { name, email, password } = req.query;
  try {
    const newUser = await new User({ name, email, password });
    newUser.save();
    res.locals.id = newUser._doc._id;
    res.status(200).json(newUser);
    next();
  } catch (e) {
    console.log('createUser error: ', e.message);
    res.sendStatus(500) && next(e);
  }
};


// userController.verifyUser = async (req, res, next) => {
//   const { email, password } = req.query;
//   if(!email || !password) return next('Missing email and/or password');
//   try {
//     const user = await User.findOne({ email });
//     if(!user) return next('User not found');
//     if(!(user.password === password)) return next('Passwords do not match');
//     res.locals.id = user._doc._id;
//     res.status(200).json(user);
//     console.log('verifyUser', res.locals.id);
//     next();
//   }
//   catch(e){
//     console.log('verifyUser error: ', e.message);
//     res.sendStatus(500) && next(e);
//   }
// };


userController.sendUserDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserDetails(id);
    res.locals.user = user;
    return next();
  } catch(err){
    return next({
        log: 'userController.sendUserDetails error',
        message: { err: `Error occurred in userController.sendUserDetails. err log: ${err}` },
      });
  }
};

// This middleware should get user data from spotify, access_token must be passed in
userController.getUserData = (req, res, next) => {
  console.log('This is req.params', req.params);
  const { access_token } = req.params;
    // use the access token to access the Spotify Web API
    const options = {
      method: 'GET',
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + access_token },
    };
    // use the access token to access the Spotify Web API
    axios(options)
    .then((response) => {
      // console.log('getUserData from Spotify response: ', response);
      res.locals.user = response.data;
      console.log('User data: ', res.locals.user);
      return next();
    })
    .catch ((err) => console.log('This is an error in spotifyAuthController.getUserData, ', err));
}


module.exports = userController;
