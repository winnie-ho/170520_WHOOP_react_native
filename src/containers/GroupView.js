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
	Actions,
} from 'react-native-router-flux';


class GroupView extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			events: ["Park Run", "Great Edinburgh Run", "Social Night", "Long Saturday Run"],
			messages: ["Hi", "Anyone for running Sat?", "Me"]
		}
		
	}

	render(){
		var eventNodes = this.state.events.map((event, index)=>{
			return(
					<TouchableOpacity
						key={index}>
						<Text>{event.toUpperCase()}</Text>
					</TouchableOpacity>
				)
		})

		var messageNodes = this.state.messages.map((message, index)=>{
			return(
					<TouchableOpacity
						key={index}>
						<Text>{message.toUpperCase()}</Text>
					</TouchableOpacity>
				)
		})




		return(
				<View style = {styles.container}>
					<Text style = {styles.logo}>
					WH◉◎P
					{"\n"}
					</Text>

					<ScrollView>
						{eventNodes}
						{messageNodes}
					</ScrollView>
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
	groupButton: {
		height: 100,
		width: 340,
		borderRadius: 5,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5,
	},

})

export default GroupView;