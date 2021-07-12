import React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from '@material-ui/core/';
import green from '@material-ui/core/colors/green';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import SpotifyIcon from './SpotifyIcon';
import { rgba } from 'style-value-types';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        In The Loop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const signinTheme = createTheme({
  palette: {
    secondary: {
      main: green[500],
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },

  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1564585222527-c2777a5bc6cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(25, 0, 2),

    backgroundColor: green[500],
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const scope =
    'streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state';

  return (
    <ThemeProvider theme={signinTheme}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Box>
              <img src="https://i.imgur.com/pXJkBtM.png" width="400px" />
            </Box>
            <Typography component="h1" variant="h5">
              In The Loop
            </Typography>
            <form className={classes.form} noValidate>
              <Button
                type="submit"
                color={'inherit'}
                fullWidth
                variant="contained"
                className={classes.submit}
                startIcon={<SpotifyIcon />}
                /* onclick to signin route, oauth and redirect to main view */
                onClick={() =>
                  window.open(
                    `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=http:%2F%2Flocalhost:8080%2Fcallback&scope=${scope}`
                  )
                }
              >
                Sign In With Spotify
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="https://www.spotify.com/us/"
                    variant="body2"
                    target="_blank"
                  >
                    {"Don't have a Spotify account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
