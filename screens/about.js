import { StyleSheet, Text, View ,ImageBackground} from 'react-native'
import React from 'react'
import { GlobalStyle } from '../static/globalstyle'

export default function About() {
    return (
        <ImageBackground  style={{flex:1}} source={require('../assets/bg.jpg')}>
        <View style={GlobalStyle.container}>
          <Text>About</Text>
        </View>
        </ImageBackground>
      )
    }