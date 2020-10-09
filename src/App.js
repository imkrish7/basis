import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './Components/FontAwesomeIcons'

// Component
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import DefaultLayout from './Containers';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/dashboard" component={DefaultLayout} />
				</Switch>
			</Router>
		);
	}
}

export default App;
