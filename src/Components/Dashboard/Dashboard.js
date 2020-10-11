import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from '../../styles/dashboard.module.scss';

class Dashboard extends Component {
	redirect = () => {
		if (localStorage.getItem('basis_token')) {
			return <Redirect to="/dashboard" />;
		} else {
			return <Redirect to="/login" />;
		}
	};
	render() {
		return (
			<div className={styles.container}>
				{this.redirect()}
				<h1>Dashboard</h1>
			</div>
		);
	}
}

export default Dashboard;
