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
			hasError: {
				isError: false,
				message: '',
				responseType: '',
				wrongOtpCount: false
			},
		};
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	isPhoneNumber = () => {
		return this.state.phoneNumber.length > 0 && this.state.phoneNumber.length == 10 && !this.isNumber();
	};
	isOTP = () => {
		const otp = this.state.otp;
		return this.state.otp.length > 0 && this.state.otp.length == 4 && !this.isValidNumber();
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
		if (
			this.props.otpResponse.data &&
			this.props.otpResponse.data.success &&
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
			this.props.resendOTPResponse.data &&
			this.props.resendOTPResponse.data.success &&
			this.props.resendOTPResponse.data.results &&
			this.props.resendOTPResponse.data !== prevProps.resendOTPResponse.data
		) {
			this.setState({
				otpMessage: this.props.resendOTPResponse.data.message,
				hasError: {
					isError: false,
					message: '',
					responseType: ''
				},
			});
		}
		if (
			this.props.loginResponse.data &&
			this.props.loginResponse.data.success &&
			this.props.loginResponse.data.results &&
			this.props.loginResponse.data !== prevProps.loginResponse.data
		) {
			this.setState({
				otpVerified: true,
				isLogin: this.props.loginResponse.data.results.isLogin,
			});
		}

		if (
			this.props.otpResponse.data &&
			prevProps.otpResponse &&
			!this.props.otpResponse.data.success &&
			this.props.otpResponse.data !== prevProps.otpResponse.data
		) {
			this.setState({
				hasError: {
					isError: true,
					resendType: "login",
					message: this.props.otpResponse.data.message,
				},
			});
		}

		if (
			this.props.loginResponse.data &&
			prevProps.loginResponse &&
			!this.props.loginResponse.data.success &&
			this.props.loginResponse.data !== prevProps.loginResponse.data
		) {
			this.setState({
				hasError: {
					isError: true,
					responseType: "otp",
					message: this.props.loginResponse.data.message,
					wrongOtpCount: this.props.loginResponse.data.messageObj && this.props.loginResponse.data.messageObj.wrongOtpCount == 5
				},
			});
		}

		if (
			this.props.resendOTPResponse.data &&
			prevProps.resendOTPResponse &&
			!this.props.resendOTPResponse.data.success &&
			this.props.resendOTPResponse.data !== prevProps.resendOTPResponse.data
		) {
			this.setState({
				hasError: {
					isError: true,
					responseType: "resend",
					message: this.props.resendOTPResponse.data.message,
				},
			});
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

	isNumber = () => {
		const phoneNumber = this.state.phoneNumber;
		if (phoneNumber.length > 0) {
			return /[a-z]/g.test(phoneNumber);
		}
	};

	isValidNumber = () => {
		const otp = this.state.otp;
		if (otp.length > 0) {
			return /[a-z]/g.test(otp);
		}
	};

	resendOTP = () => {
		const params = {
			phoneNumber: this.state.phoneNumber,
			token: this.state.otpToken.toString(),
		};
		this.setState( {
			hasError: {
				isError: false,
				message: "",
				resendType: ""
			}
		}, ()=>{
			this.props.getResendOTP(params);
		})
		
	};

	goBack = () => {
		this.setState({
			hasError: {
				isError: false,
				message: '',
				resendType: ''
			},
		});
	};

	render() {
		return (
			<div className={styles.container}>
				{this.redirect()}
				{!this.state.hasError.isError ? (
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
											type="tel"
											pattern="[1-9]{1}[0-9]{9}"
											value={this.state.phoneNumber}
											maxLength={10}
											placeholder="1112223333"
											className={[
												styles.input,
												this.state.phoneNumber.length > 0
													? this.isPhoneNumber()
														? styles.success
														: styles.danger
													: null,
											].join(' ')}
										/>
										{this.isNumber() && (
											<label className={styles.label}>Phone number should be number.</label>
										)}
									</section>
									<section className={styles.btn_wrapper}>
										<button
											disabled={!this.isPhoneNumber()}
											className={[
												styles.btn,
												!this.isPhoneNumber() ? styles.disabled : styles.valid,
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
												className={[
													styles.input,
													this.state.otp.length > 0
														? this.isOTP()
															? styles.success
															: styles.danger
														: null,
												].join(' ')}
											/>
											{this.isValidNumber() && (
												<label className={styles.label}>Otp should be Number.</label>
											)}
										</section>
										<section className={styles.btn_wrapper}>
											<button
												disabled={!this.isOTP()}
												className={[
													styles.btn,
													!this.isOTP() ? styles.disabled : styles.valid,
												].join(' ')}
											>
												Submit
											</button>
										</section>
									</form>
								</React.Fragment>
							)}
						</div>
					</div>
				) : (
					<div className={styles.error_wrapper}>
						<div className={styles.error}>
							<div className={[styles.header, styles.width_full].join(' ')}>
								<h1 className={styles.header_text}>Error</h1>
								<p className={styles.sub_text}>{this.state.hasError.message}</p>
							</div>
							<div className={[styles.gobtn, styles.width_full].join(' ')}>
								<button onClick={this.goBack} className={styles.gobackbtn}>
									Go Back
								</button>
									<button onClick={this.resendOTP} className={styles.btn}>
										Resend OTP
									</button>
							</div>
						</div>
					</div>
				)}
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
