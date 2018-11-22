import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});

export default class HomeScreen extends Component {
  public static navigationOptions = {
    title: 'おうち',
  };

  public render() {
    return (
      <View style={styles.container}>
        <Text>HOME SCREEN</Text>
      </View>
    );
  }
}
