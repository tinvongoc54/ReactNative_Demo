/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  TextInput,
  StatusBar,
} from 'react-native';

import {
  COLOR_BACKGROUND,
  COLOR_BLUE_MEDIUM,
  COLOR_FACEBOOK,
  COLOR_GOOGLE,
  COLOR_TEXT_INPUT,
} from './colors';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';

export default class Login extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  render() {
    const Divider = (props) => {
      return <View {...props}>
          <View style={styles.line}></View>
          <Text style={styles.or}>OR</Text>
          <View style={styles.line}></View>
        </View>
    }
    return (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.up}>
            <Text style={styles.textLogin}>LOGIN</Text>
          </View>
          <View style={styles.down}>
            <View style={styles.textInputContainer}>
              <Hideo
                onChangeText={text => { this.setState({...this.state, username: text}) }}
                value={this.state.username}
                iconClass={FontAwesomeIcon}
                iconName={'user'}
                inputSize={10}
                iconColor={COLOR_TEXT_INPUT}
                iconStyle= {{ height:30 }}
                // this is used as backgroundColor of icon container view.
                iconBackgroundColor={COLOR_BLUE_MEDIUM}
                inputStyle={{ backgroundColor: COLOR_TEXT_INPUT, color: '#333333' }}
                placeholder="Username"
              />
            </View>
            <View style={styles.textInputContainer}>
              <Hideo
                onChangeText={text => { this.setState({...this.state, password: text}) }}
                value={this.state.password}
                iconClass={FontAwesomeIcon}
                iconName={'key'}
                iconColor={COLOR_TEXT_INPUT}
                iconStyle= {{ height:30 }}
                // this is used as backgroundColor of icon container view.
                iconBackgroundColor={COLOR_BLUE_MEDIUM}
                inputStyle={{ backgroundColor: COLOR_TEXT_INPUT, color:'#333333' }}
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button color={COLOR_BLUE_MEDIUM} title="Login" onPress={ () => {
                console.log(this.state.username)
                console.log(this.state.password)
                if (this.state.username != "") {
                  if (this.state.password != "") {
                    if (this.state.username == "ngoctin") {
                      if (this.state.password == "12345678") {
                        this.props.navigation.navigate('Home')
                      } else {
                        alert("Password invalid!")
                      }
                    } else {
                      alert("Username invalid!")
                    }
                  } else {
                    alert("Please enter password!")
                  }
                } else {
                  alert("Please enter username!")
                }
              } } />
            </View>

            <Divider style={styles.divider}/>

            <View style={{ marginBottom: 10 }}>
              <FontAwesome.Button style={{width: 300, alignItems: 'center', justifyContent: 'center', borderRadius:5}} name="facebook" backgroundColor={COLOR_FACEBOOK}>
                <Text style={{ color:'white' }}>Login with Facebook</Text>
              </FontAwesome.Button>
            </View>

            <View>
              <FontAwesome.Button style={{width: 300, alignItems: 'center', justifyContent: 'center'}} name="google" backgroundColor={COLOR_GOOGLE}>
                <Text style={{ color:'white' }}>Login with Gmail</Text>
              </FontAwesome.Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_BACKGROUND,
  },
  up: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  down: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textLogin: {
    color: 'white',
    fontSize: 30
  },
  textInputContainer: {
    marginBottom: 20,
    borderRadius: 5,
    width: 300,
    height: 40,
  },
  buttonContainer: {
    width: 300,
    height: 40,
    borderRadius: 5,
  },
  line: {
    height: 0.7,
    flex: 2,
    backgroundColor:COLOR_TEXT_INPUT
  },
  or: {
    flex: 1,
    textAlign:'center',
    color: COLOR_TEXT_INPUT,
    textDecorationStyle: 'solid'
  },
  divider: {
    flexDirection: 'row',
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
