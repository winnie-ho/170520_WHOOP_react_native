import React from "react";
import Home from "./containers/Home";
import Groups from "./containers/Groups";
import GroupView from "./containers/GroupView";

import {
	Router,
	Scene,
} from "react-native-router-flux";

import{
	Platform
} from "react-native"

class App extends React.Component {
	render(){
		return(
			<Router>
				<Scene key = "root" style={{paddingTop: Platform.OS=== "ios" ? 64 : 54}}>
					<Scene key = "home" component = {Home} title = " WH◉◎P"/>
					<Scene key = "groups" component = {Groups} title = "WH◉◎P Groups"/>
					<Scene key = "groupView" component = {GroupView} title = "Group"/>
				</Scene>
			</Router>
		);
	}
}

export default App;