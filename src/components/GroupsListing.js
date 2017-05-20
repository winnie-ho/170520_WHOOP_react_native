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

  goGroupsPage(){
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
      newGroupForm = <Text>+</Text>;
    }

    console.log("eventUpdates in GL", this.props.eventUpdates);

    return(

      <View className = "groups-listing-View">
        <View className = "logo">
          <View>
            <Text> ←home </Text>
          </View>
          <Text>WH◉◎P</Text>
        </View>
        <TextInput 
          placeholder = "🔎 search" 
          value = {this.state.searchQuery} 
          onChangeText = {this.doSearch} />

        <View className="groups-scroll"> 

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
          <View 
          	onPress = {this.props.handleNewGroup}>
            {newGroupForm}
          </View>
          <View className = "new-group-fake">
          </View>
          <View className = "new-group-fake">
          </View>
        </View>
      </View>
    )
  }
}

export default GroupsListing;