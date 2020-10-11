import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../../styles/header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { getLogout } from '../../actions/userActions'
import { errorRedirect } from '../../Utils/networkutils';
class Header extends Component{

	constructor(props){
		super(props)
		this.state = {
			show: false,
			user: {},
			logout: false
		}
	}

	componentDidMount(){
		try {
			if(this.props.loginResponse.data){
				this.setState({
					user: { ...this.props.loginResponse.data.results.user }
				})
			}
		} catch (error) {
			alert('Something went wrong. It will lead to relogin. Sorry for inconvenience');
			errorRedirect();
		}
		
	}

	toggle = ()=>{
		this.setState({
			show: !this.state.show
		})
	}

	logout = () => {
		const { _id } = this.state.user
		this.props.getLogout({id: _id})
	}

	componentDidUpdate(prevProps, prevState){
		try {
			if(
				prevProps.logoutResponse &&
				this.props.logoutResponse &&
				this.props.logoutResponse.success 
				){
					this.signout()
				}
		} catch (error) {
			alert('Something went wrong. It will lead to relogin. Sorry for inconvenience');
			errorRedirect();
		}
		

	}

	signout = ()=>{
		this.props.logout()
	}

	render(){
		return(
			<header className={styles.header}>
				{/* { this.state.logout && this.signout() } */}
				<div className={styles.logo}>
					<Link to="/dashboard" className={styles.logo_text}>Sample App</Link>
				</div>
				<nav className={styles.navbar}>
					<div onClick={this.toggle} className={styles.icon}>
						<FontAwesomeIcon icon={"user-minus"}/>
					</div>
					{ this.state.show && <div className={styles.options}>
						<Link to="/profile" className={styles.option}>Profile</Link>
						<div onClick={this.logout} className={[styles.option, styles.no_border].join(" ")}>Logout</div>
					</div>}
				</nav>
			</header>
		)
	}
}

const mapStateToProps = state =>{
	return {
		loginResponse: state.loginResponse,
		logoutResponse: state.logoutResponse
	}
}

const mapDispatchToProps = dispatch =>{
	return {
		getLogout: params => { dispatch(getLogout(params))}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)