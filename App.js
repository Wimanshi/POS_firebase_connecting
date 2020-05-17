import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createAppContainer } from "react-navigation";

import Login from './Screens/Login';
import Profile from './Screens/Profile';
import Home from './Screens/Home';
import CreateEmployee from './Screens/CreateEmployee';
import { createStackNavigator, HeaderTitle} from 'react-navigation-stack';
import { Provider } from 'react-redux'
import { store } from './redux/app-redux';
import firebaseDb from './database/firebaseDb';
import * as firebase from 'firebase';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoadingComplete : false,
    };
    // initialize firebase...
    if (!firebase.apps.length){firebase.initializeApp(firebaseDb.firebaseConfig);}
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Profile: {
    screen: Profile
  },
  Home: {
    screen : Home
  },
  Create: {
    screen: CreateEmployee
  }
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
