import React from 'react';
import {
	AppRegistry,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';

import {
	Actions,
} from 'react-native-router-flux';

import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import SignOut from '../auth/SignOut';
import dbHandler from '../DBHandler';


class Home extends React.Component {
	constructor(props){
		super(props)

		this.setUser = this.setUser.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.getData = this.getData.bind(this);
    this.loginView = this.loginView.bind(this);

    this.state = {
      currentUser: null,
      createAccount: false,
      data: [],
    }
	}

	componentDidMount(){
    this.getUser();
  }

  getUser(){
    const request = new XMLHttpRequest();
    request.open("GET", "https://whooprails.herokuapp.com/users/1.json");
    request.setRequestHeader("content-type", "application/json");
    request.withCredentials = true;
    request.onload = () => {
      if(request.status === 200){
        console.log("request.responseText", request.responseText);
        const receivedUser = JSON.parse(request.responseText);
        this.setUser(receivedUser, this.getData());
      } else if (request.status === 401){
        console.log("request.responseText", request.responseText);
        this.setUser(null);
      }
    }
    request.send(null);
  }

  getData(){
  	console.log("get Data Fetch");
    var urlSpec = "memberships/1";
    var word = "GET";
    var callback = function(data){
      this.setState({data: data})
      console.log("Getting user data:", data);
    }.bind(this);
    var DBQuery = new dbHandler();
    var dataToSend = null;
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  setUser(user){
    this.setState({currentUser:user});
    console.log("current user", user);
  }

  createAccount() {
    this.setState({currentUser:null});
    this.setState({createAccount:true});
    console.log("create account clicked", this.state.createAccount);
  }

	goGroupsPage(){
		Actions.groups();
	}

	loginView(){
		this.setState({createAccount:false});
	}

	render(){

		// 1 - Main Sign In
			let mainDiv = 
			<View style = {styles.signIn}>
				<SignIn 
					url="https://whooprails.herokuapp.com/users/sign_in.json"
					create={this.state.createAccount} 
					onSignIn={this.setUser}>
				</SignIn>

        <Text onPress={this.createAccount}> create account </Text>
			</View>

			let createAccDiv = <View></View>
			let signOutDiv = <View></View>


		// 2 - Sign Up
			if(this.state.createAccount === true){
		    createAccDiv = 
		    	<View style = {styles.signUp}> 

			      <SignUp 
			      	url="https://whooprails.herokuapp.com/users.json" 
			      	create={this.state.createAccount} 
			      	onSignUp={this.setUser}>
			      </SignUp>

	          <Text onPress={this.loginView}> ← sign in </Text>

			    </View>

		    mainDiv = <View></View>
		    signOutDiv = <View></View>
  		}

  	// 3 - Enter
  		if(this.state.currentUser){
		    mainDiv = 
			    <View style={styles.signIn}>
		        <Text style={styles.greeting}> Hi </Text>
		        <Text style={styles.greeting}> {this.state.currentUser.name} </Text>
		        <TouchableOpacity 
		        	style={styles.button} 
		        	onPress = {this.goGroupsPage}>
		        	<Text> MY GROUPS </Text>
		        </TouchableOpacity>
			    </View>

		    signOutDiv = 
			    <View>
			      <SignOut 
			      	url="https://whooprails.herokuapp.com/users/sign_out.json"
			      	onSignOut={this.setUser}>
			      </SignOut>
			    </View>
			  createAccDiv = <View></View>
  		}


		return(
			<View style = {styles.main}>
				<Text style = {styles.logo}>
					WH◉◎P
					{"\n"}
				</Text>

				<View style = {styles.container}>
					<View>
	          { mainDiv }
	        </View>

	        <View>
	          { createAccDiv }
	        </View>

	        <View>
		        { signOutDiv }
		      </View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	main: {
		flex: 0,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	signIn: {
		flex: 0,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 50,
	},
	signUp: {
		flex: 0,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	intro: {
		flex: 0,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 0,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	greeting: {
		fontSize: 20,
	},
	logo: {
		fontSize: 40,
		margin: 50,
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


export default Home;