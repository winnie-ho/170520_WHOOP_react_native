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
      <View>
        <Form 
          onSubmit={this.props.addGroup}>
          <TextInput type="text" onChangeText={this.handleOnChangeName} placeholder="name" />
          <TouchableOpacity
            style={styles.button} 
            onPress={this.props.addGroup}>ADD 
          </TouchableOpacity>
        </Form>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
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

export default GroupNew