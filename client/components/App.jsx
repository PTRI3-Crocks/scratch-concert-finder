import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Search from './Search';
import Profile from './Profile';
import Signin from './Signin';


const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#95d5b2',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#71c29a',
      main: '#40916c',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#000000',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});


//  

const App = () => (
  
    <Router>
      <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/callback">
          <Search />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path='/signin'>
          <Signin/>
        </Route>
        <Route path="/">
          <Search />
        </Route>
      </Switch></ThemeProvider>
    </Router>
  
);

export default App;
