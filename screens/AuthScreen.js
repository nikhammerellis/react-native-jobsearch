import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';
//import { facebookLogin } from '../actions'; //single action alternative

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props); //not necessarily needed
    //AsyncStorage.removeItem('fb_token');//remove once auth screen is working as intended, uncomment to clear token and test fb auth
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View />
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
};

export default connect(mapStateToProps, actions)(AuthScreen);
