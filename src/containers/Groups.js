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
			groups: ["Group 1", "Group 2", "Group 3"]
		}
		
	}

	render(){
		var groupNodes = this.state.groups.map((group, index)=>{
			return(
					<TouchableOpacity
						style = {styles.groupButton}
						onPress = {this.goGroup}
						key={index}>
						<Text>{group}</Text>
					</TouchableOpacity>
				)
		})




		return(
				<View style = {styles.container}>
					<Text style = {styles.logo}>
					WH◉◎P
					{"\n"}
					</Text>

					<ScrollView style = {styles.scrollView}>
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
		width: 100,
		borderRadius: 5,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollView: {
		flex: 1,
		flexDirection: 'row',
	}

})

export default Groups;