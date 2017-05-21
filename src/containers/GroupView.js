import React from 'react';
import {
	AppRegistry,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	TextInput,
} from 'react-native';

import {
	Actions,
} from 'react-native-router-flux';

import dbHandler from '../DBHandler';

import { 
  Form,
  Separator,
  InputField,
  LinkField,
  SwitchField,
  PickerField,
  DatePickerField,
  TimePickerField,
  KeyboardAwareScrollView
} from 'react-native-form-generator';



class GroupView extends React.Component {
	constructor(props){
		super(props);
    console.log('Group ID Selected:', this.props.groupId)
    // this.groupSelected = this.props.location.state.groupId;
    this.getData = this.getData.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleOnChangeMsg = this.handleOnChangeMsg.bind(this);
    this.addEventUpdate = this.addEventUpdate.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.editGroup = this.editGroup.bind(this);
    this.handleOnChangeGroupName = this.handleOnChangeGroupName.bind(this);
    this.handleEditGroup = this.handleEditGroup.bind(this);
    this.scrollMsg = this.scrollMsg.bind(this);
    this.jumpRight = this.jumpRight.bind(this);
    this.deleteGroupSwitch = this.deleteGroupSwitch.bind(this);
    this.resetDeleteGroup = this.resetDeleteGroup.bind(this);
    this.getUpdates = this.getUpdates.bind(this);
    this.setLastSeen = this.setLastSeen.bind(this);
    this.goGroupsPage = this.goGroupsPage.bind(this);

    this.state = { 
      groupData: [],
      events: [],
      messages: [],
      // userId: this.props.location.state.userId,
      // userName: this.props.location.state.userName,
      msg: null,
      name: null,
      editGroup: false,
      editedGroupId: null,
      changedName: "",
      deleteGroup: false,
      // lastSeen: this.props.location.state.userTime,
      msgUpdates: null,
    }
		
	}

	goEvent(){
		Actions.eventView();
	}

	componentWillMount(){
	    this.getData();
	  }

	componentDidMount(){
	  }

	getData(){
	    var urlSpec = "groups/" + this.groupSelected;
	    var word = "GET";
	    var callback = function(data){
	      this.setState({groupData: data, messages: data.messages, events: data.events});
	      this.setLastSeen();
	      this.scrollMsg();
	      this.getUpdates();
	    }.bind(this);
	    var dataToSend = null;
	    var DBQuery = new dbHandler();
	    DBQuery.callDB(urlSpec, word, callback, dataToSend);
	  }

  setLastSeen(){
    var time = new Date();
    var timeNow = time.toISOString();
    var getLastSeen = null;
    if(localStorage.getItem("lastSeen-" + this.state.groupData.id + "-" + this.state.userId) === null){
      getLastSeen = this.props.location.state.userTime
    }else{
      getLastSeen = localStorage.getItem("lastSeen-" + this.state.groupData.id + "-" + this.state.userId)
    }
    this.setState({lastSeen: getLastSeen});
    console.log("LAST SEEN", getLastSeen);
    localStorage.setItem("lastSeen-" + this.state.groupData.id + "-" + this.state.userId, timeNow);
  }

  getUpdates(){
    var numberUpdates = 0;
    var groupMessages = this.state.messages;
    for(var msg of groupMessages){
      if (this.state.lastSeen < msg.updated_at && msg.user_id !== this.state.userId){
        numberUpdates ++;
      }
    }

    console.log("updates", numberUpdates);
    this.setState({msgUpdates: numberUpdates});
  }

  addMessage(event){
    event.preventDefault();
    var urlSpec = "groups/:id/messages";
    var word = "POST";
    var callback = function(data){
      this.getData() ;
    }.bind(this);
    const data = {
      message: {
        msg: this.state.msg,
        group_id: this.groupSelected,
        userName: this.state.userName,
        user_id: this.state.userId
      }
    }

    var dataToSend = JSON.stringify(data);
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
    console.log("message added", data);
    ReactDOM.findDOMNode(this.refs.form).value = "";
  }

  scrollMsg(){
    var msgScroll = document.querySelector(".message-list");
    msgScroll.scrollTop = msgScroll.scrollHeight;
  }

  addEventUpdate(event){
    this.getData();
  }

  handleOnChangeMsg(event){
    this.setState({msg: event.target.value});
  }


  deleteGroupSwitch(){
    this.setState({deleteGroup: true});
  }

  resetDeleteGroup(){
    this.setState({deleteGroup: false});
  }

  deleteGroup(){
    event.preventDefault();
    var urlSpec = "groups/" + this.groupSelected;
    var word = "DELETE";
    var callback = function(data){
      this.props.router.push("/groups");
    }.bind(this);
    var DBQuery = new dbHandler();
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  editGroup(event){
    event.preventDefault();
    var urlSpec = "groups/" + this.groupSelected;
    var word = "PUT";
    var callback = function(data){
      this.setState({editGroup:false},this.getData());
    }.bind(this);
    const data = {
      group: {
        name: this.state.changedName
      }
    }
    var dataToSend = JSON.stringify(data);
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
    console.log("group updated", data);
  }

  handleEditGroup(){
    this.setState({editGroup: true});
  }

  handleOnChangeGroupName(event){
    var updatedName = event.target.value
    this.setState({changedName: updatedName}) 
  }

  jumpRight(){
    var divScroll = document.querySelector(".group-main");
    divScroll.scrollLeft = divScroll.scrollWidth;
    console.log("jump right");
  }

  jumpLeft(){
    var divScroll = document.querySelector(".group-main");
    divScroll.scrollLeft = 0;
    console.log("jump left");
  }

  goGroupsPage(){
		Actions.groups();
	}

	render(){
		console.log("groupId coming through", this.props.groupId);
		console.log("groupId coming through", this.props.data);
		var eventNodes = this.state.events.map((event, index)=>{
			return(
					<TouchableOpacity
						onPress={this.goEvent}
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

		// var memberNodes = this.state.members.map((member, index)=>{
		// 	return(
		// 			<TouchableOpacity
		// 				key={index}>
		// 				<Text>{member}</Text>
		// 			</TouchableOpacity>
		// 		)
		// })

		console.log("groupData", this.state.groupData);
  //group title and edit group name conditional    
    var upperGroupTitle = `${this.state.groupData.name}`.toUpperCase()
    if (this.state.editGroup===true){
      var header = <View className = "edit-group">
      <input onChange = {this.handleOnChangeGroupName}placeholder = "group name"></input>
      <TouchableOpacity onPress = {this.editGroup} >update</TouchableOpacity>
      </View>
      } else if (this.state.editGroup === false) {
        header = <View> {upperGroupTitle}</View>
      }
  //group delete confirm conditional 
    if(this.state.deleteGroup === true){
    var deleteBox = 
    <View>
      <DeleteConfirm deleteFunction = {this.deleteGroup} resetFunction = {this.resetDeleteGroup} dialogue = "Delete Group?"/>
    </View>
    } else if (this.state.deleteGroup === false) {
      deleteBox = 
      <View>
        <TouchableOpacity onPress = {this.deleteGroupSwitch} className = "icon-TouchableOpacity"><Text>✄</Text></TouchableOpacity>
        <TouchableOpacity onPress = {this.handleEditGroup} className = "icon-TouchableOpacity"><Text>✎</Text></TouchableOpacity>
      </View>
    }
  //msg updates conditional 
  if(this.state.msgUpdates > 0){
    var msgAlert = 
    <View className = "msgAlert">
      <Text>{this.state.msgUpdates}</Text>
    </View>
  } else {
    msgAlert = <View></View>
  }

  // if(this.props.location.state.eventUpdates > -1){
  //   var eventAlert =
  //   <View className = "alerts">
  //     <Text>🗓</Text>
  //   </View>
  // }else{
  //   eventAlert = ""
  // }





		return(
			<View style = {styles.container}>
				<Text style = {styles.h3}>GROUPIES</Text>
				<ScrollView style = {styles.membersListing}>
				</ScrollView>
				<Text style = {styles.h3}>MESSAGES</Text>
				<ScrollView style = {styles.messageListing}>
					{messageNodes}
				</ScrollView>

				<Text style = {styles.h3}>EVENTS</Text>
				<ScrollView style = {styles.eventListing}>
					{eventNodes}
				</ScrollView>




	      <View className="group-view">
        <Text>{header}</Text>
        <View className = "top-bar">
          <View>
            <Text onPress = {this.goGroupsPage}>← my groups</Text>
          </View>
            <View className = "top-bar-right">
              {deleteBox}
            </View>
        </View>

        <View className = "members-View">

        </View>
        <View className = "group-main">

        
        <View className = "message-board">
            {msgAlert}
          


          <Form 
          onSubmit = {this.addMessage} 
          className = "new-message-form">
          <TextInput 
          ref="form" 
          onChange = {this.handleOnChangeMsg} 
          placeholder = "✏︎ message" 
          className = "message-box"/> 
          <TouchableOpacity onPress = {this.addMessage}><Text>POST</Text></TouchableOpacity>
          </Form>
        </View>

        <View className = "arrow" onPress = {this.jumpRight}> <Text> ▷ </Text> </View>
        <View className = "arrow" onPress = {this.jumpLeft}> <Text> ◀︎ </Text></View>

        <View className = "events-board">
          <Text> EVENTS </Text> 
          
        </View>
        </View>
          ⦿⦿
      </View>


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
	h3: {
		fontSize: 15,
		margin: 5,
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
	membersListing: {
		height: 20,
		width: 360,
		overflow: 'hidden',
	},
	eventListing:{
		width: 360,
		borderRadius: 5,
		borderColor: 'gray',
		borderWidth: 1,
		margin: 5,
		padding: 5,
	},
	messageListing:{
		width: 360,
		height: 300,
		borderRadius: 5,
		borderColor: 'gray',
		borderWidth: 1,
		margin: 5,
		padding: 5,
	},

})

export default GroupView;