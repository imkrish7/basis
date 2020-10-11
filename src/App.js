import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './Components/FontAwesomeIcons';

// Component
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import DefaultLayout from './Containers';
import Referral from './Components/Referral/Referral'
import RequestEmailVerification from './Components/RequestEmailVerification/RequestEmailVerification'

const isAuthenticated = () => {
	return localStorage.getItem('basis_token') ? true : false;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated() ? (
					<Component {...props} />
				) : <Redirect
				to="/login"
			/>
			}
		/>
	);
};
class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/email/verification" component={RequestEmailVerification} />
					<Route exact path="/referral/:token?" component={Referral} />
					<PrivateRoute path="/" component={DefaultLayout} />
				</Switch>
			</Router>
		);
	}
}

export default App;
