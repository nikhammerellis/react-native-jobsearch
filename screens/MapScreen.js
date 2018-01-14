import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

import * as actions from '../actions';
// longitude: -122.3321, this is seattle, replace with this
// latitude: 47.6062,
class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={30} color={tintColor} />;
    }
  });

  state = {
    mapLoaded: false,
    region: {
      longitude: -122.3321,
      latitude: 47.6062,
      longitudeDelta: 0.04,
      latitudeDelta:  0.09
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
      this.setState({ region });
  }

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {//pass the navigate as a callback that runs inside fetchJobs
      this.props.navigation.navigate('deck');
    });
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          initialRegion={this.state.region}
          //region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />

        <View style={styles.buttonContainer}>
        {/* //use when implementing zipcode functionality
          <TextInput
            style={styles.inputStyle}
            placeholder="Zip Code"
            placeholderTextColor='orange'
          />
          */}
          <Button
            large
            rounded
            title="Search this area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  },
  // inputStyle: {
  //   color: '#000',
  //   fontSize: 20,
  //   width: SCREEN_WIDTH * 0.3,
  //   textAlign: 'center',
  //   borderBottomWidth: 2,
  //   borderColor: 'black'
  // },
};



export default connect(null, actions)(MapScreen);
