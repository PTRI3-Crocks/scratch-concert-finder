import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {ThemeProvider, createTheme} from '@material-ui/core';
import Search from './Search';
import Profile from './Profile';
import Signin from './Signin';


 
const theme = extendTheme({});
const  loopTheme = createTheme({
  palette:{
  // type:'dark'
  }
})

const App = () => (
  <ThemeProvider theme={loopTheme}>
  <ChakraProvider theme={theme}>
    <Router>
      
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
      </Switch>
    </Router>
  </ChakraProvider>
  </ThemeProvider>
);

export default App;
