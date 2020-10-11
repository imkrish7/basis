import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styles from '../../styles/login.module.scss';
import { errorRedirect } from '../../Utils/networkutils';
// Actions
import { getOTP, getLogin, getResendOTP } from '../../actions/userActions';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			otpSent: false,
			otpVerified: false,
			phoneNumber: '',
			otpMessage: '',
			otpToken: '',
			otp: '',
			isLogin: false,
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
		this.props.getOTP(params);
	};

	getLogin = (e) => {
		e.preventDefault();
		const params = {
			phoneNumber: this.state.phoneNumber,
			verificationCode: this.state.otp.toString(),
			token: this.state.otpToken.toString(),
		};
		this.props.getLogin(params);
	};

	componentDidUpdate(prevProps, prevState) {
		try {
			if (
				this.props.otpResponse.data &&
				this.props.otpResponse.data.results &&
				this.props.otpResponse.data !== prevProps.otpResponse.data
			) {
				this.setState({
					otpToken: this.props.otpResponse.data.results.token,
					otpMessage: this.props.otpResponse.data.message,
					otpSent: true,
					isLogin: this.props.otpResponse.data.results.isLogin,
				});
			}
			if (
				this.props.loginResponse.data &&
				this.props.loginResponse.data.results &&
				this.props.loginResponse.data !== prevProps.loginResponse.data
			) {
				this.setState({
					otpVerified: true,
					isLogin: this.props.loginResponse.data.results.isLogin,
				});
			}
		} catch (error) {
			alert('Something went wrong. It will lead to relogin. Sorry for inconvenience');
			errorRedirect();
		}
	}

	redirect = () => {
		if (localStorage.getItem('basis_token') && this.state.isLogin) {
			return <Redirect to="/dashboard" />;
		} else if (this.state.otpSent && this.state.otpVerified) {
			return (
				<Redirect
					to={{
						pathname: '/email/verification',
						state: {
							token: this.state.otpToken,
							phoneNumber: this.state.phoneNumber,
						},
					}}
				/>
			);
		}
	};

	resendOTP = () => {
		const params = {
			phoneNumber: this.state.phoneNumber,
			token: this.state.otpToken.toString(),
		};
		this.props.getResendOTP(params);
	};

	render() {
		return (
			<div className={styles.container}>
				{this.redirect()}
				{!this.state.hasError ? (
					<div className={styles.wrapper}>
						<div className={styles.header}>
							<h1 className={styles.header_text}>
								{this.state.otpMessage.length > 0 ? 'Verify OTP ' : 'Login'}
							</h1>
							<p className={styles.sub_text}>
								{this.state.otpMessage.length > 0 ? this.state.otpMessage : 'Enter your credentials'}
							</p>
						</div>
						<div className={styles.form_wrapper}>
							{!this.state.otpSent ? (
								<form onSubmit={this.getOtp} className={styles.form}>
									<section className={styles.input_wrapper}>
										<label className={styles.label}>Phone number</label>
										<input
											required
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
												this.state.phoneNumber.length >= 0 && this.state.phoneNumber.length < 10
													? styles.disabled
													: styles.valid,
											].join(' ')}
										>
											GET OTP
										</button>
									</section>
								</form>
							) : (
								<React.Fragment>
									<form onSubmit={this.getLogin} className={styles.form}>
										<section className={styles.input_wrapper}>
											<label className={styles.label}>OTP</label>
											<input
												required
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
									<section className={styles.btn_wrapper}>
										<button onClick={this.resendOTP} className={styles.btn}>
											Resend OTP
										</button>
									</section>
								</React.Fragment>
							)}
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		otpResponse: state.otpResponse,
		loginResponse: state.loginResponse,
		resendOTPResponse: state.resendOTPResponse,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getOTP: (params) => dispatch(getOTP(params)),
		getLogin: (params) => dispatch(getLogin(params)),
		getResendOTP: (params) => dispatch(getResendOTP(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
