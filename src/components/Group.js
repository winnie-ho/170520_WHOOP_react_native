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

import dbHandler from '../DBHandler';

class Group extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
      if(this.props.eventUpdates == -1){
        var eventAlert = <View></View>
      }else if (this.props.eventUpdates >= 0 ){
        eventAlert = 
        <View className = "alerts">
          <Text>🗓</Text>
        </View>
      }
    console.log("result", this.props.eventUpdates);

    // var alertNodes = 
    //   <View className = "alerts"> 
    //     <Text>💬</Text>

    //   </View>

    return(
      <View style={styles.container}>
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
export default Group
        // <Link to = {
        //   {
        //     "pathname": "/groups/"+ this.props.groupId,
        //     "state": {
        //       "groupId": this.props.groupId,
        //       "userName": this.props.userName,
        //       "userId": this.props.userId,
        //       "userTime": this.props.userTime,
        //       "eventUpdates": this.props.eventUpdates,
        //     }
        //   }
        // }>{this.props.group.name}
        // </Link>
        // {eventAlert}
