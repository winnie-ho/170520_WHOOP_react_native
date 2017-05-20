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
    // event.preventDefault();
    // const request = new XMLHttpRequest();
    // request.open("DELETE", this.props.url);
    // request.setRequestHeader("content-type", "application/json");
    // request.withCredentials = true;

    // request.onload = () =>{
    //   console.log("signed out", request.status);
    //   if (request.status === 204) {
    //     this.props.onSignOut(null);
    //   }  
    // }
    // request.send(null);

    console.log("Signing out!");
  }

  render() {
    return (
        <TouchableOpacity onPress={this.signOut}>
          <Text> SIGN OUT </Text>
        </TouchableOpacity>
    )
  }
}

export default SignOut