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
  StatusBar,
} from 'react-native';
import { Header } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

export default class Options extends Component {
  constructor(props) {
    super();
    this.state = {
      choice: '',
      options: [],
      isModalVisible: false,
      img: '',
    };
    backgroundColor = '#ADD8E6';
  }
  getChoice = () => {
    var ch = this.props.route.params.choice;
    this.setState({
      choice: ch,
    });
    if (ch == 'Very Hot') {
      this.setState({
        options: [
          {
             title: 'Shorts and t-shirt',
            image: require('../assets/options/shorts_n_tee-removebg-preview.png'),
          },
          {
             title: 'Short, half sleeve dress',
            image: require('../assets/options/shortdress.png'),
          },
         {
             title:  'Skirt and top',
            image: require('../assets/options/skirttop.png'),
          },
          
        ],
      });
    }
    if (ch == 'Hot') {
      this.setState({
        options: [
          {
            title: 'Shorts and long sleeve top',
            image: require('../assets/options/shortslongsleeve.png'),
          },
          {
            title: 'long sleeve dress',
            image: require('../assets/options/longdress.png'),
          },
          {
            title:  'Legging and top',
            image: require('../assets/options/leggingtop.png'),
          },
         
        ],
      });
    }
    if (ch == 'Cold') {
      this.setState({
        options: [
          {
            title: 'Jeans and long sleeve top',
            image: require('../assets/options/longsleevejeans.png'),
          },
          {
            title: 'Joggers and long sleeve top',
            image: require('../assets/options/joggerslongsleeve.png'),
          },
          {
            title: 'Hoodie and jeans',
            image: require('../assets/options/hoodiejeans.png'),
          }
          
        ],
      });
    }
    if (ch == 'Very Cold') {
      this.setState({
        options: [
          {
            title: 'Jacket, hoodie and jeans',
            image: require('../assets/options/jackethoodiejeans.png'),
          },
          {
            title: 'Sweatshirt and joggers',
            image: require('../assets/options/sweatshirtjoggers.png'),
          },
          {
            title: 'Fleece and leggings',
            image: require('../assets/options/fleeceleggings.png'),
          },
          
        ],
      });
    }
  };
  componentDidMount() {
    this.getChoice();
  }
  showoptions = (index) => {
    this.setState({
      isModalVisible: true,
      img: this.state.options[index].image,
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'pink' }}>
        <SafeAreaView style={styles.androidSafearea} />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{this.state.choice}</Text>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          
          >
          <Image
            source={this.state.img}
            style={{ width: 350, height: 350 ,resizeMode:'contain',alignSelf:'center'}}></Image>
            <TouchableOpacity
            onPress={()=>  this.setState({ isModalVisible: false})}
            >
            <Text style={{fontSize:30, fontFamily:'Lobster',alignSelf: 'center',}}>Tap to close: </Text>
            </TouchableOpacity>
            
        </Modal>
        <Text style={styles.info}>
          Click on the buttons to see the descriptions...
        </Text>

        {this.state.options.map((item, index) => {
          console.log(item);
          return (
            <TouchableOpacity
              onPress={() => this.showoptions(index)}
              style={styles.button}>
              <Text style={styles.optionText}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  androidSafearea: {
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 20,
  },
  button: {
    backgroundColor: '#CBC3E3',
    marginTop: 30,
    width: 250,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  titleContainer: {
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
    height: 70,
  },
  titleText: {
    alignSelf: 'center',
    fontFamily: 'Lobster',
    fontSize: 50,
  },
  optionText: {
    alignSelf: 'center',
    fontFamily: 'Lobster',
    fontSize: 20,
  },
  info: {
    fontFamily: 'Lobster',
    alignSelf: 'center',
  },
});
