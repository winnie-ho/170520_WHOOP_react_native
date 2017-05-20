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

class GroupNew extends React.Component {

  constructor(props) {
    super(props)
    this.handleOnChangeName = this.handleOnChangeName.bind(this);

    this.state = { 
    }
  }

  handleOnChangeName(event){
    var addedGroup = event.target.value
    this.props.setGroup(addedGroup)
  }


  render(){
    return(
      <div className = "new-group-form-div">
        <form onSubmit={this.props.addGroup} className="new-group-form">
          <input type="text" onChange={this.handleOnChangeName} placeholder="name" />
          <button onClick={this.props.addGroup}> ADD </button>
        </form>
      </div>
    )
  }
}

export default GroupNew