import React, { Component } from 'react'
import { } from 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack';
// import SignUp from '../components/SignUp';
import TabNavigator from './TabNavigator';
import Screen from '../screen/Screen';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';



const Stack = createStackNavigator();

export default class Stacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Screen" component={Screen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>

    )
  }
}
