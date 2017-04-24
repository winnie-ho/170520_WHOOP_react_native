import React from "react";
import Home from "./containers/Home";
import Groups from "./containers/Groups";

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
					<Scene key = "home" component = {Home} title = "Home"/>
					<Scene key = "groups" component = {Groups} title = "Groups"/>
				</Scene>
			</Router>
		);
	}
}

export default App;