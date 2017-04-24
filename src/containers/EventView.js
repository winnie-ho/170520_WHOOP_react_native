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


class EventView extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			attendees: ["Winnie Ho", "Kate Murray"],
		}
		
	}



	render(){
		var attendeeNodes = this.state.attendees.map((attendee, index)=>{
			return(
					<Text key={index}>{attendee}</Text>
				)
		})

		return(
				<View style = {styles.container}>

					<View style = {styles.event}>
						<Text style = {styles.h3} > 
							PARK RUN 
						</Text>

						<Text>
							Date: 20th May 2017
							{"\n"}
							Time: 09:30
							{"\n"}
							Location: Cramond Shore
							{"\n"}
							Description: 5km Park Run Event
						</Text>
					</View>

						<Text style = {styles.h3}>
							GOING
						</Text>

						<ScrollView style = {styles.attendeeListing}>
							{attendeeNodes}
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
	event: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: 700,
		width: 360,
		margin: 5,
		padding: 5,
		borderRadius: 5,
		borderColor: 'gray',
		borderWidth: 1,
	},

	h3: {
		fontSize: 15,
		margin: 5,
	},
	attendeeListing:{
		width: 360,
		borderRadius: 5,
		borderColor: 'gray',
		borderWidth: 1,
		margin: 5,
		padding: 5,
	},

})

export default EventView;