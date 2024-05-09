import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
  TextInput,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Header } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class LocationSearch extends Component {
  constructor() {
    super();
    this.state = {
      lat: 0,
      lon: 0,
      searchResults: [],
      searchText: '',
      lonDel: 20,
      temp: 0,
      location: {},
    };
  }
  degreesToRadians = (angle) => {
    return angle * (Math.PI / 180);
  };

  kMToLongitudes = (km, atLatitude) => {
    return (km * 0.0089831) / Math.cos(this.degreesToRadians(atLatitude));
  };

  getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status == 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
      this.getWeather();
      var val = this.kMToLongitudes(1, location.coords.latitude);
      this.setState({
        lonDel: val,
      });
    }
  };
  componentDidMount = async () => {
    await this.getLocation();
  };
  handleSearch = async () => {
    const { searchText } = this.state;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`
      );
      const data = await response.json();
      console.log(data[0]);

      if (data && data.length > 0) {
        this.setState({
          searchResults: data,
          lat: data[0].lat,
          lon: data[0].lon,
        });
        this.getWeather();
      }
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };
  getWeather = async () => {
    const { lat,lon } = this.state;

    var url =
      'https://weather-l6tl.onrender.com/api/getCurrentWeather/' +
      lat +
      '/' +
      lon;

    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
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
    this.props.navigation.navigate('options', { choice: choice });
  };
  render() {
    const { searchText, searchResults, lat, lon, lonDel } = this.state;
    if (lat == 0 && lon == 0) {
      return <Text style={styles.loadingtext}>Loading</Text>;
    }

    return (
      <View style={{ flex: 1, backgroundColor: 'pink' }}>
        <TextInput
          style={styles.input}
          placeholder="Enter the Location"
          value={searchText}
          onChangeText={(text) => this.setState({ searchText: text })}
        />
        <Image source={require('../assets/cloud.png')} style={styles.cloud} />
        <Image source={require('../assets/sun.png')} style={styles.sun} />
        <Text style={{alignSelf:'center',fontFamily:'Lobster'}}>{'Temperature: '+this.state.temp}</Text>
        <Button title="Search" onPress={this.handleSearch} />
        <MapView
          style={styles.map}
          region={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            latitudeDelta: 0.00001,
            longitudeDelta: lonDel,
          }}>
          {searchResults.length > 0 ? (
            <Marker
              coordinate={{
                latitude: parseFloat(searchResults[0].lat),
                longitude: parseFloat(searchResults[0].lon),
              }}
            />
          ) : (
            <Marker
              coordinate={{
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
              }}
            />
          )}
        </MapView>
        <TouchableOpacity onPress={this.options} style={styles.buttonlocation}>
          <Text style={styles.buttonlocation}> Show me options </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonlocation: {
    backgroundColor: '#CBC3E3',
    marginTop: 20,
    width: 250,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    fontFamily: 'Lobster',
    fontSize: 30,
  },
  info: {
    fontFamily: 'Lobster',
    alignSelf: 'center',
  },
  loadingtext: {
    marginTop: 200,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#ADD8E6',
    fontFamily: 'Lobster',
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    marginTop: 60,
    alignSelf: 'center',
  },
  map: {
    flex: 1,
    marginTop: 5,
  },
  cloud: {
    width: 180,
    height: 130,
    marginRight: -20,
  },
  sun: {
    width: 180,
    height: 130,
    marginLeft: 210,
    marginTop: -130,
  },
  loadingtext: {
    backgroundColor: '#ADD8E6',
    alignSelf: 'center',
    fontFamily: 'Lobster',
  },
});
