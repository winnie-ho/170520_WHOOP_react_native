import React from 'react';

import {
  AppRegistry,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AlertIOS
} from 'react-native';

import { 
  Form,
  Separator,
  InputField,
  LinkField,
  SwitchField,
  PickerField,
  DatePickerField,
  TimePickerField,
  KeyboardAwareScrollView
} from 'react-native-form-generator';

class SignIn extends React.Component {

  constructor(props){
    super(props)
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this)
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this)
    this.signIn = this.signIn.bind(this)

    this.state = {
      email:"", 
      password:""
    }
  }

  handleOnChangeEmail(event) {
    this.setState({email: event.target.value})
  }

  handleOnChangePassword(event) {
    this.setState({password: event.target.value})
  }

  signIn(){
    console.log('logging in');
    // const request = new XMLHttpRequest();
    // request.open("POST", this.props.url);
    // request.setRequestHeader("content-type", "application/json");
    // request.withCredentials = true;
    // request.onload = () => {
    //   if (request.status === 201){
    //     const user = JSON.parse(request.responseText);
    //     this.props.onSignIn(user)
    //   }

      fetch('https://whooprails.herokuapp.com/users/sign_in.json', {  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }) 
      }).then((response) => {
        console.log(response.json);
        return response.json()
      })
      .then((responseData) => {
          console.log(responseData);
      })
      .done();


    
    //the following data is sent first before the request is returned above which checks that the user is a valid user. Order is a bit switched.
    // const data = {
    //   user: {
    //     email: this.state.email,
    //     password: this.state.password
    //   }
    // }
    //   request.send(JSON.stringify(data))
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>SIGN IN</Text>

        <Form
          style={styles.form}
          ref='login-form'
          label="login">

          <InputField 
            style={styles.input}
            ref='email' 
            placeholder='email'
            onChange={this.handleOnChangeEmail}
            />
          
          <InputField 
            style={styles.input}
            ref='password'
            placeholder='password'
            onChange={this.handleOnChangePassword}
            />

        </Form>

        <TouchableOpacity 
          onPress={this.signIn} 
          style={styles.button} > 
            <Text>SIGN IN</Text>
        </TouchableOpacity>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: 300,
  },
  input: {
    width: 300,
  },
  button: {
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    width: 100,
    alignItems: 'center',
    margin: 30,
  },
    loginForm: {
    fontFamily: 'GeoSansLight',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
  }

})

export default SignIn