import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styles from '../../styles/login.module.scss';

// Actions
import { getOTP, getLogin } from '../../actions/userActions'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			otpSent: false,
			phoneNumber: '',
			otpMessage: '',
			otpToken: '',
			otp: '',
			isLogin: false
		};
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	isValid = () => {
		return this.state.phoneNumber.length > 0 && this.state.phoneNumber.length < 10;
	};

	getOtp = (e) => {
		e.preventDefault();
		const params = {
			phoneNumber: this.state.phoneNumber,
		};
		this.props.getOTP(params)
	}

	getLogin = (e) => {
		e.preventDefault()
		const params = {
			phoneNumber: this.state.phoneNumber,
			verificationCode: this.state.otp,
			token: this.state.otpToken
		}
		this.props.getLogin(params)
	}

	componentDidUpdate(prevProps, prevState){
		if(
			this.props.otpResponse.data &&
			this.props.otpResponse.data.results && 
			this.props.otpResponse.data !== prevProps.otpResponse.data
			){
			this.setState({
				otpToken: this.props.otpResponse.data.results.token,
				otpMessage: this.props.otpResponse.data.message,
				otpSent: true,
				isLogin: this.props.otpResponse.data.results.isLogin
			})
		}
	}

	redirect = () => {
		if(localStorage.getItem("basis_token")){
			return <Redirect to="/dashboard" />
		}
		
	}


	render() {
		return (
			<div className={styles.container}>
				{ this.redirect() }
				{(!this.state.otpSent && !this.state.isLogin) ?<div className={styles.wrapper}>
					<div className={styles.header}>
						<h1 className={styles.header_text}>{this.state.otpMessage.length > 0 ? "Verify OTP ": "Login" }</h1>
						<p className={styles.sub_text}>{this.state.otpMessage.length > 0 ? this.state.otpMessage : "Enter your credentials" }</p>
					</div>
					<div className={styles.form_wrapper}>
						{!this.state.otpSent ? (
							<form onSubmit={this.getOtp} className={styles.form}>
								<section className={styles.input_wrapper}>
									<label className={styles.label}>Phone number</label>
									<input
										name="phoneNumber"
										onChange={this.handleChange}
										type="text"
										value={this.state.phoneNumber}
										maxLength={10}
										placeholder="111-222-3333"
										className={[
											styles.input,
											this.state.phoneNumber.length > 0
												? !this.isValid()
													? styles.success
													: styles.danger
												: null,
										].join(' ')}
									/>
								</section>
								<section className={styles.btn_wrapper}>
									<button
										disabled={this.isValid()}
										className={[
											styles.btn,
											this.state.phoneNumber.length >= 0 && this.state.phoneNumber.length < 10 ? styles.disabled : styles.valid,
										].join(' ')}
									>
										GET OTP
									</button>
								</section>
							</form>
						) : (
						<form onSubmit={this.getLogin} className={styles.form}>
								<section className={styles.input_wrapper}>
									<label className={styles.label}>OTP</label>
									<input 
									onChange={this.handleChange}
									value={this.state.otp}
									name="otp" 
									placeholder="1234"
									maxLength={4}
									className={styles.input} 
									/>
								</section>
								<section className={styles.btn_wrapper}>
									<button className={styles.btn}>Submit</button>
								</section>
							</form>
						)}
					</div>
				</div>
				: !this.state.isLogin &&
					<div className={styles.options}>
						<div className={styles.header}>
							<h1 className={styles.header_text}>Your call</h1>
							<p className={styles.sub_text}>Please select one. If you choose referral it will apply your referral code or a default one.</p>
						</div>
					<div className={styles.linkwrapper}>
						<Link className={styles.link_btn} to={{
							pathname: "/signup",
							state: {
								token: this.state.otpToken
							} 
						}}>Signup</Link>
						<Link className={styles.link_btn} to={{
							pathname: "/referral/S9JR4M",
							state: {
								token: this.state.otpToken
							}
						}}>If you had Refferall</Link>
					</div>
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = state => {

	return {
		otpResponse: state.otpResponse,
		loginResponse: state.loginResponse
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getOTP: params => dispatch(getOTP(params)),
		getLogin: params => dispatch(getLogin(params))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
