import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Home from '../components/Home';
import AddPeople from '../components/AddPeople';
import Notification from '../components/Notification';
import PostUpload from '../components/PostUpload';


const Tab = createBottomTabNavigator();

export default class TabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarInactiveTintColor:'gray',
          tabBarActiveTintColor:'black',
          tabBarStyle:{borderRadius:5},
        }}
      >
        <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home', headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <AwesomeIcon name="home" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Add People" component={AddPeople} options={{
          tabBarLabel: 'Add People', headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <AwesomeIcon name="user-friends" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Notification" component={Notification} options={{
          tabBarLabel: 'Notification', headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <AwesomeIcon name="plus-square" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Post Upload" component={PostUpload} options={{
          tabBarLabel: 'Post Upload', headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <AwesomeIcon name="bell" color={color} size={size} />
          ),
        }} />
       
      </Tab.Navigator>
    );
  }
}