import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { Header } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      location: {},
      temp: 0,
    };
  }

  getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status == 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        location: location.coords,
      });
      this.getWeather();
    }
  };
  getWeather = async () => {
    const { location } = this.state;

    var url =
      'https://weather-l6tl.onrender.com/api/getCurrentWeather/' +
      location.latitude +
      '/' +
      location.longitude;

    return await fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        
        this.setState({
          temp: responseJson.data.temperature,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  options = () => {
    const { temp } = this.state;
    
    var choice = '';
    if (temp >= 25 && temp < 45) {
      choice = 'Very Hot';
    }
    if (temp < 25 && temp > 11) {
      choice = 'Hot';
    }
    if (temp < 11 && temp > 3) {
      choice = 'Cold';
    }
    if (temp < 3) {
      choice = 'Very Cold';
    }
    console.log(choice)
    this.props.navigation.navigate('options', { choice: choice });
  };
  componentDidMount = async () => {
    await this.getLocation();
  };
  render() {
    return (
      <View style={{ backgroundColor: '#ADD8E6', flex: 1 }}>
        <SafeAreaProvider>
          <Header
            centerComponent={{
              text: 'Weather Based Fashion App',
              style: styles.heading,
            }}
            backgroundColor="pink"
          />
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 40,
              fontFamily: 'Lobster',
              fontSize: 20,
            }}>
            {'Temperature: ' + this.state.temp + ' °C'}
          </Text>
          <Image
            source={require('../assets/thermometer.png')}
            style={styles.thermometer}
          />

          <TouchableOpacity onPress={this.options} style={styles.button}>
            <Text style={styles.buttontext}>What should I wear today?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('locationsearch')}
            style={styles.button}>
            <Text style={styles.buttontext}>Search for another location</Text>
          </TouchableOpacity>
          <Image
            source={require('../assets/clothing.png')}
            style={styles.clothing}
          />
        </SafeAreaProvider>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: 'Lobster',
    height:50,
    alignSelf: 'center',
  },
  button: {
    marginTop: 50,
    alignSelf: 'center',
    borderWidth: 2,
    width: 350,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#CBC3E3',
  },
  buttontext: {
    alignSelf: 'center',
    fontFamily: 'Lobster',
    fontSize: 20,
  },
  thermometer: {
    width: 100,
    height: 180,
    alignSelf: 'center',
    marginTop: 20,
  },
  clothing: {
    width: 200,
    height: 180,
    alignSelf: 'center',
    marginTop: 30,
  },
});
