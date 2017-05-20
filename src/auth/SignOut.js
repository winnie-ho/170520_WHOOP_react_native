import React from 'react';

import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

class SignOut extends React.Component{

  constructor(){
    super()
    this.signOut = this.signOut.bind(this)
  }
  
  signOut(event){
    event.preventDefault();
    const request = new XMLHttpRequest();
    request.open("DELETE", this.props.url);
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;

    request.onload = () =>{
      console.log("signed out", request.status);
      if (request.status === 204) {
        this.props.onSignOut(null);
      }  
    }
    request.send(null);

    console.log("Signing out!");
  }

  render() {
    return (
        <TouchableOpacity 
          style={styles.button} 
          onPress={this.signOut}>
            <Text> SIGN OUT </Text>
        </TouchableOpacity>
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
  button: {
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    width: 100,
    alignItems: 'center',
    margin: 30,
  }
})


export default SignOut