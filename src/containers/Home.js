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


class Home extends React.Component {
	constructor(props){
		super(props)

		this.setUser = this.setUser.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.getData = this.getData.bind(this);

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
        this.setUser(null);
      }
    }
    request.send(null);
  }

  getData(){
    var urlSpec = "memberships/1";
    var word = "GET";
    var callback = function(data){
      this.setState({data: data})
      console.log("Warming up", data);
    }.bind(this);
    var DBQuery = new dbHandler();
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  setUser(user){
    this.setState({currentUser:user});
  }

  createAccount() {
    this.setState({currentUser:null});
    this.setState({createAccount:true});
    console.log("create account clicked", this.state.createAccount);
  }

	goGroupsPage(){
		Actions.groups();
	}

	render(){
		return(
				<View style = {styles.container}>
					<Text style = {styles.logo}>
					WH◉◎P
					{"\n"}
					</Text>

					<TouchableOpacity
						style = {styles.button}
						onPress = {this.goGroupsPage}>
						<Text>my groups</Text>
					</TouchableOpacity>

					<Text>LOGIN</Text>
					<SignIn 
						url="https://whooprails.herokuapp.com/users/sign_in.json"
						create = {this.state.createAccount} 
						onSignIn={this.setUser}>
					</SignIn>

					<View onPress = {this.createAccount}>
      			<Text>create account</Text>
    			</View>

					<Text>SIGN UP</Text>
		      <SignUp 
		      	url="https://whooprails.herokuapp.com/users.json">
		      </SignUp>
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
	}

})


export default Home;