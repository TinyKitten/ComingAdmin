import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  Alert,
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
 } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import AuthStore, { AuthError, IAuthStore } from '../stores/Auth';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#333',
    elevation: 1,
    justifyContent: 'center',
    marginTop: 32,
    padding: 12,
    shadowColor: 'black',
    shadowOffset: {  width: 0.25,  height: 0.25  },
    shadowOpacity: 0.25,
    width: 240,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logo: {
    height: 120,
    width: 120,
  },
  pwInput: {
    backgroundColor: '#fff',
    elevation: 1,
    marginTop: 12,
    padding: 12,
    shadowColor: 'black',
    shadowOffset: {  width: 0.25,  height: 0.25  },
    shadowOpacity: 0.25,
    width: 240,
  },
  snInput: {
    backgroundColor: '#fff',
    elevation: 1,
    marginTop: 32,
    padding: 12,
    shadowColor: 'black',
    shadowOffset: {  width: 0.25,  height: 0.25  },
    shadowOpacity: 0.25,
    width: 240,
  },
});

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface IState {
  screenName: string;
  password: string;
}

@observer
export default class LoginScreen extends Component<IProps, IState> {
  public static navigationOptions = {
    title: 'Login',
  };

  private store: IAuthStore = new AuthStore();

  private passwordInput: TextInput | null = null;

  constructor(props: IProps) {
    super(props);
    this.state = {
      password: '',
      screenName: '',
    };

    this.onLogin = this.onLogin.bind(this);
    this.onScreenNameChange = this.onScreenNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  public onLogin() {
    const { screenName, password } = this.state;
    const { navigation } = this.props;
    this.store.getToken(screenName, password)
    .then(() => navigation.replace('Home'))
    .catch((err: AuthError) => {
      if (err === AuthError.ERR_UNAUTHORIZED) {
        Alert.alert(
          'エラー',
          '認証に失敗しました。',
          [
            {text: 'OK'},
          ],
        );
      }
      if (err === AuthError.ERR_INTERNAL_SERVER_ERROR) {
        Alert.alert(
          'エラー',
          '内部サーバエラーです。',
          [
            {text: 'OK'},
          ],
        );
      }
      if (this.passwordInput) {
        this.passwordInput.clear();
      }
    });
  }

  public onScreenNameChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    this.setState({
      screenName: e.nativeEvent.text,
    });
  }

  public onPasswordChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    this.setState({
      password: e.nativeEvent.text,
    });
  }

  public render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <TextInput
          style={styles.snInput}
          placeholder="SCREEN NAME"
          onChange={this.onScreenNameChange}
        />
        <TextInput
          style={styles.pwInput}
          placeholder="PASSWORD"
          secureTextEntry={true}
          onChange={this.onPasswordChange}
          ref={(input) => this.passwordInput = input}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.onLogin}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
