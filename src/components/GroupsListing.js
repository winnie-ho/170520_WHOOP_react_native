import React from 'react';

import {
	AppRegistry,
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from 'react-native';

import {
	Actions,
} from 'react-native-router-flux';

import dbHandler from '../DBHandler';
import Group from "./Group"
import GroupNew from "./GroupNew"


class GroupsListing extends React.Component{

  constructor(props) {
    super(props)
    console.log(this.props.eventUpdates);
    this.doSearch = this.doSearch.bind(this);
    this.handleNewGroup = this.handleNewGroup.bind(this);
    this.resetNewGroup = this.resetNewGroup.bind(this);
    this.state = {
      searchQuery: ""
    }
  }

  doSearch(event){
    this.setState({searchQuery: event.target.value});
  }

  handleNewGroup(){
    this.setState({newGroup:true});
  }

  resetNewGroup(){
    this.setState({newGroup:this.props.newGroup});
  }

  goHomePage(){
		Actions.home();
	}

  render() {
    //conditional for new group for to show
    if(this.props.newGroup === true){
      var newGroupForm = 
      <GroupNew 
        reset = {this.resetNewGroup} 
        setGroup = {this.props.setGroup} 
        addGroup = {this.props.addGroup}/>
    } else if (this.props.newGroup === false) {
      newGroupForm = 
      		<Text>+</Text>
    }

    console.log("eventUpdates in GL", this.props.eventUpdates);

    return(

      <View style={styles.container}>
        <View style={styles.header}>
          <Text onPress={this.goHomePage}> ←home </Text>
        </View>

        <View style={styles.searchBar}>
	        <TextInput 
	          placeholder = "🔎 search" 
	          value = {this.state.searchQuery} 
	          onChangeText = {this.doSearch} />
	      </View>

        <ScrollView style={styles.groupList}> 
	        {/*does the search filtering for the search bar*/}

	        {
	          this.props.groups.filter((group) => `${group.group.name}`.toUpperCase().indexOf(this.state.searchQuery.toUpperCase()) >= 0)
	          .map((group) => (
	            <Group { ...group } 
	              key = {group.id} 
	              userId = {this.props.userId}
	              userName = {this.props.userName} 
	              group = {group.group} 
	              groupId = {group.group_id} 
	              groups = {this.props.groups}
	              userTime = {this.props.userTime}
	              // groupUpdates = {this.props.groupUpdates}
	              eventUpdates = {this.props.eventUpdates.indexOf(group.group_id)}
	              router = {this.props.router}/>
	            ))
	        }
	          <View style={styles.newGroup}
	          	onPress = {this.props.handleNewGroup}>
	            {newGroupForm}
	          </View>

	          <View className = "new-group-fake">
	          </View>

	          <View className = "new-group-fake">
	          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	header: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		padding: 10,
	},
	searchBar: {
		flex: 0,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		width: 350,
		padding: 5,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
	},
	groupList: {
		flex: 0,
		flexDirection: 'column',
		alignContent: 'flex-start',
	},
	newGroup: {
    height: 50,
    width: 330,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
})

export default GroupsListing;