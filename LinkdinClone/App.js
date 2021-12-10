import React, { Component } from 'react';
import Stack from './navigation/Stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './navigation/TabNavigator';

const Tab = createBottomTabNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
     <Stack/>
      </NavigationContainer>
    );
  }
}

