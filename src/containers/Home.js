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
// import SignOut from '../auth/SignOut';


class Home extends React.Component {
	constructor(props){
		super(props)

		
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

					<Text style = {styles.h3}>
					Hi
					{"\n"}
					</Text>

					<TouchableOpacity
						style = {styles.button}
						onPress = {this.goGroupsPage}>
						<Text>my groups</Text>
					</TouchableOpacity>

					<SignIn 
						url="https://whooprails.herokuapp.com/users/sign_in.json" 
						onSignIn={this.setUser}>
					</SignIn>

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