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
  Animated,
  Text,
  Button,
  TouchableWithoutFeedback,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';

import {
  COLOR_BACKGROUND,
  COLOR_BLUE_MEDIUM,
  COLOR_FACEBOOK,
  COLOR_GOOGLE,
  COLOR_TEXT_INPUT,
} from './colors';

var {height, width} = Dimensions.get('window')

export default class Splash extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        textOpacity: new Animated.Value(0),
        textMarginTop: new Animated.Value(height/2),
    }

    async componentDidMount() {
        Animated.sequence([
            Animated.timing(this.state.textOpacity, {
                toValue: 1,
                duration: 1000,
            }),
            Animated.timing(this.state.textMarginTop, {
                toValue: 10,
                duration: 1500,
            })
        ]).start(() => {
            this.props.navigation.navigate('Login')
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <Animated.Text style={{...styles.text, opacity: this.state.textOpacity}}>DEMO</Animated.Text>
                <Animated.Text style={{...styles.text, opacity: this.state.textOpacity, marginTop: this.state.textMarginTop}}>APP</Animated.Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 50,
        color: COLOR_TEXT_INPUT,
    }
});