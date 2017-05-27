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
      <View
        style={styles.newGroup}>
        <TextInput 
            style={styles.input}
            type="text" 
            onChangeText={this.handleOnChangeName} 
            placeholder="group name" />
        <TouchableOpacity
          style={styles.button} 
          onPress={this.props.addGroup}>
          <Text>ADD</Text> 
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  newGroup: {
    height: 30,
    width: 330,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    height: 30,
    width: 260,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5,

  },
  button: {
    padding: 5,
    width: 50,
    marginLeft: 5,
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
})

export default GroupNew