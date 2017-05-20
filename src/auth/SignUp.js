import React from 'react';

import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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

class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.signUp = this.signUp.bind(this)
    this.handleOnChangeName = this.handleOnChangeName.bind(this)
    this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this)
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this)
    this.handleOnChangePassConf = this.handleOnChangePassConf.bind(this)
    this.state = {
      name:"",
      email:"", 
      password:"", 
      passwordConfirmation:""
    }
  }

  signUp(){
    fetch('https://whooprails.herokuapp.com/users.json', {  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.passwordConfirmation
        }) 
      }).then((response) => {
        console.log(response.json);
        return response.json()
      })
      .then((responseData) => {
          console.log(responseData);
      })
      .done();
  }

  handleOnChangeName(event) {
    this.setState({name: event.target.value})
  }

  handleOnChangeEmail(event) {
    this.setState({email: event.target.value})
  }

  handleOnChangePassword(event) {
    this.setState({password: event.target.value})
  }

  handleOnChangePassConf(event) {
    this.setState({passwordConfirmation: event.target.value})
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Form style={styles.form}>
          <InputField 
            onChange={this.handleOnChangeName}  
            placeholder="name" 
          />
          <InputField 
            onChange={this.handleOnChangeEmail}  
            placeholder="email"
          />
          <InputField 
            onChange={this.handleOnChangePassword}  
            placeholder="password" 
          />
          <InputField 
            onChange={this.handleOnChangePassConf}  
            placeholder="password confirmation" 
          />
          <TouchableOpacity 
            onPress={this.signUp}
            style={styles.button}>
              <Text>SIGN UP</Text>
          </TouchableOpacity>
        </Form>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  logo: {
    fontSize: 20,
    marginTop: 10,
  },
  h3: {
    fontSize: 15,
  },
  button: {
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    width: 100,
    alignItems: 'center',
    margin: 5,
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

export default SignUp