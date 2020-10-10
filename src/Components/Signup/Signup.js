import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import styles from '../../styles/signup.module.scss';
import SignupForm from '../SignupForm/SignupForm';
import { getSignup } from '../../actions/userActions'

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tokenSent: true,
			referralCode: null,
			token: null,
			signupSuccess: false
		};
	}


	componentDidMount(){
		this.setState({
			token: this.props.location.state.token,
			referralcode: this.props.location.state.referralCode ? this.props.location.state.referralCode : null
		})
	}
	signup = (params) =>{
		if(params.agreeToPrivacyPolicy == "on"){
			params["agreeToPrivacyPolicy"] = true
		}

		params["token"] = this.state.token;
		params["referralCode"] = this.state.referralCode ? this.state.referralCode : null;
		this.setState({ 
			phoneNumber: params.phoneNumber,
			email: params.email
		}, ()=>{
			this.props.getSignup(params)
		})
		
	}
	componentDidUpdate(prevProps, prevState){
		console.log(this.props)
		if(
			prevProps.signupResponse && 
			this.props.signupResponse.success &&
			this.props.signupResponse.data &&
			this.props.signupResponse.data != prevProps.signupResponse.data
			){
				this.setState({
					signupSuccess: true
				})
			}
	}
	render() {
		return (
			<div className={[styles.container,!this.state.signupSuccess ? styles.width_sn : styles.width_rn].join(" ")}>
				{!this.state.signupSuccess && <SignupForm signup={this.signup} /> }
				{this.state.signupSuccess &&
				<div className={styles.hero_card}>
				<div className={styles.header}>
						<h1 className={styles.header_text}>Please verify</h1>
						<div className={styles.linkwrapper}>
						<Link className={styles.link_btn} to={{
							pathname: "/email/verification",
							state: {
								token: this.state.token,
								phoneNumber: this.state.phoneNumber,
								email: this.state.email
							}
						}}>Verify Email</Link>
						</div>
					</div>
					</div>
					}
			</div>
		);
	}
}

const mapStateToProps = state =>{
	return{
		signupResponse: state.signupResponse
	}
}

const mapDispatchToProps = dispatch => {
	return{
		getSignup: params => dispatch(getSignup(params))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
