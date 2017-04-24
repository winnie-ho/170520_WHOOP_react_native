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


class Groups extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			groups: ["Group 1", "Group 2", "Running", "Cohort 8", "Yoga", "Run4it"]
		}
		
	}

	goGroup(){
		Actions.groupView();
	}

	render(){
		var groupNodes = this.state.groups.map((group, index)=>{
			return(
					<TouchableOpacity
						style = {styles.groupButton}
						onPress = {this.goGroup}
						key={index}>
						<Text>{group.toUpperCase()}</Text>
					</TouchableOpacity>
				)
		})






		return(
				<View style = {styles.container}>

					<ScrollView>
						{groupNodes}
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

export default Groups;