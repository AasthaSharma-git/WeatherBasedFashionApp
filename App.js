import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import Home from './screens/Home';
import Options from './screens/Options';
 import LocationSearch from './screens/LocationSearch';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Lobster_400Regular} from '@expo-google-fonts/lobster';
import * as Font from 'expo-font'
var Stack = createStackNavigator();
export default class App extends Component {
  componentDidMount(){
   Font.loadAsync({
   Lobster: Lobster_400Regular
    })
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="options" component={Options} />
          <Stack.Screen name="locationsearch" component={LocationSearch}/>
        
        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }
}
