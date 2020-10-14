import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../../styles/signup.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { errorRedirect } from '../../Utils/networkutils';
import { getEmailVerificationRequest, getEmailVerification, getResendToken } from '../../actions/userActions';
class RequestEmailVerification extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			token: '',
			phoneNumber: '',
			tokenSent: false,
			verificationCode: '',
			tokenVerified: false,
			resendTokenSent: false,
			hasError: {
				isError: false,
				message: '',
			},
		};
	}
	componentDidMount() {
		try {
			const { token, phoneNumber } = this.props.location.state;
			this.setState({
				token,
				phoneNumber,
			});
		} catch (error) {
			alert('Something went wrong. It will lead to relogin. Sorry for inconvenience');
			errorRedirect();
		}
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const params = {
			token: this.state.token,
			phoneNumber: this.state.phoneNumber,
			email: this.state.email,
		};
		this.props.getEmailVerificationRequest(params);
	};

	isEmailValid = () => {
		const email = this.state.email;
		const emailValid = /[a-z0-9]*[@]+[a-z]*[\.]+[a-z]*/g.test(email);
		return email.length > 0 && emailValid;
	};

	isValidToken = () => {
		const verificationCode = this.state.verificationCode;
		return verificationCode.length > 0 && verificationCode.length == 6 && !this.isNumber();
	};

	isNumber = () => {
		const verificationCode = this.state.verificationCode;
		return /[a-z]/g.test(verificationCode);
	};

	componentDidUpdate(prevProps, prevState) {
		try {
			if (
				prevProps.emailRequestVerificationResponse &&
				this.props.emailRequestVerificationResponse.data &&
				this.props.emailRequestVerificationResponse.success &&
				this.props.emailRequestVerificationResponse.data.success &&
				prevProps.emailRequestVerificationResponse.data != this.props.emailRequestVerificationResponse.data
			) {
				this.setState({
					tokenSent: true,
				});
			}
			if (
				prevProps.emailVerificationResponse &&
				this.props.emailVerificationResponse.data &&
				this.props.emailVerificationResponse.success &&
				this.props.emailVerificationResponse.data.success &&
				prevProps.emailVerificationResponse.data != this.props.emailVerificationResponse.data
			) {
				this.setState({
					tokenVerified: true,
				});
			}

			if (
				prevProps.emailRequestVerificationResponse &&
				this.props.emailRequestVerificationResponse.data &&
				!this.props.emailRequestVerificationResponse.data.success &&
				prevProps.emailRequestVerificationResponse.data != this.props.emailRequestVerificationResponse.data
			) {
				this.setState({
					hasError: {
						isError: true,
						message: this.props.emailRequestVerificationResponse.data.message,
					},
				});
			}

			if (
				prevProps.emailVerificationResponse &&
				this.props.emailVerificationResponse.data &&
				!this.props.emailVerificationResponse.data.success &&
				prevProps.emailVerificationResponse.data != this.props.emailVerificationResponse.data
			) {
				this.setState({
					hasError: {
						isError: true,
						message: this.props.emailVerificationResponse.data.message,
					},
				});
			}
		} catch (error) {
			alert('Something went wrong. It will lead to relogin. Sorry for inconvenience');
			errorRedirect();
		}
	}

	emailVerification = (event) => {
		event.preventDefault();
		const params = {
			email: this.state.email,
			token: this.state.token.toString(),
			verificationToken: this.state.verificationCode.toString(),
		};
		this.props.getEmailVerification(params);
	};

	resendToken = () => {
		const params = {
			token: this.state.token.toString(),
			email: this.state.email,
		};
		this.setState({
			resendTokenSent: true,
		});
		this.props.getResendToken(params);
	};

	goBack = () => {
		this.setState({
			hasError: {
				isError: false,
				message: '',
				resendTokenSent: false,
			},
		});
	};
	render() {
		return (
			<div className={[styles.container, styles.width_rn].join(' ')}>
				{!this.state.tokenSent
					? !this.state.hasError.isError && (
							<div className={styles.wrapper}>
								<div className={styles.header}>
									<h1 className={styles.header_text}>Welcome</h1>
									<p className={styles.sub_text}>Please enter your?</p>
								</div>
								<div className={styles.form_wrapper}>
									<form onSubmit={this.handleSubmit}>
										<div className={styles.col}>
											<section className={styles.input_wrapper}>
												<label className={styles.label}>Email</label>
												<div
													className={[
														styles.input_icon,
														this.state.email.length > 0
															? this.isEmailValid()
																? styles.success
																: styles.danger
															: null,
													].join(' ')}
												>
													<input
														required
														type="email"
														onChange={this.handleChange}
														name="email"
														value={this.state.email}
														placeholder="example@gmail.com"
														className={styles.input}
													/>

													<button
														disabled={!this.isEmailValid()}
														className={[styles.icon_wrapper].join(' ')}
													>
														<FontAwesomeIcon
															className={[
																styles.icon,
																this.isEmailValid()
																	? styles.valid_icon
																	: styles.disabled_icon,
															].join(' ')}
															icon={'arrow-circle-right'}
														/>
													</button>
												</div>
												{this.state.email.length > 0 && !this.isEmailValid() && (
													<p className={styles.sub_text}>Please enter valid email?</p>
												)}
											</section>
										</div>
									</form>
								</div>
							</div>
					  )
					: !this.state.tokenVerified &&
					  !this.state.hasError.isError && (
							<div className={styles.wrapper}>
								<div className={styles.header}>
									<h1 className={styles.header_text}>Email Verification</h1>
									<p className={styles.sub_text}>Please enter valid token?</p>
								</div>
								<div className={styles.form_wrapper}>
									<form onSubmit={this.emailVerification}>
										<div className={[styles.col].join(' ')}>
											<section className={styles.input_wrapper}>
												<label className={styles.label}>Token</label>
												<div
													className={[
														styles.input_icon,
														this.state.verificationCode.length > 0
															? this.isValidToken()
																? styles.success
																: styles.danger
															: null,
													].join(' ')}
												>
													<input
														required
														onChange={this.handleChange}
														name="verificationCode"
														value={this.state.verificationCode}
														placeholder="124121"
														className={styles.input}
														maxLength={6}
													/>
													<button className={styles.icon_wrapper}>
														<FontAwesomeIcon
															className={[
																styles.icon,
																this.isValidToken()
																	? styles.valid_icon
																	: styles.disabled_icon,
															].join(' ')}
															icon={'arrow-circle-right'}
														/>
													</button>
												</div>
											</section>
											{this.isNumber() && (
												<p className={styles.sub_text}>Token should be number.</p>
											)}
										</div>
									</form>
								</div>
							</div>
					  )}
				{this.state.hasError.isError && (
					<div className={styles.error_wrapper}>
						<div className={styles.error}>
							{!this.state.resendTokenSent && (
								<div className={[styles.header, styles.width_full].join(' ')}>
									<h1 className={styles.header_text}>Error</h1>
									<p className={styles.sub_text}>{this.state.hasError.message}</p>
								</div>
							)}
							{this.state.resendTokenSent && (
								<React.Fragment>
									<div className={[styles.header, styles.width_full].join(' ')}>
										<h1 className={styles.header_text}>Token was resent</h1>
									</div>
									<div className={[styles.gobtn, styles.width_full].join(' ')}>
										<button onClick={this.goBack} className={styles.gobackbtn}>
											Go Back
										</button>
									</div>
								</React.Fragment>
							)}

							{!this.state.resendTokenSent && (
								<section className={styles.btn_wrapper}>
									<button onClick={this.resendToken} className={styles.btn}>
										Resend Token
									</button>
								</section>
							)}
						</div>
					</div>
				)}
				{!this.state.hasError.isError && this.state.tokenVerified && (
					<div className={styles.wrapper}>
						<div className={styles.options}>
							<div className={styles.header}>
								<h1 className={styles.header_text}>Your call</h1>
								<p className={styles.sub_text}>
									Please select one. If you choose referral it will apply your referral code or a
									default one.
								</p>
							</div>
							<div className={styles.linkwrapper}>
								<Link
									className={styles.link_btn}
									to={{
										pathname: '/signup',
										state: {
											token: this.state.token,
											phoneNumber: this.state.phoneNumber,
											email: this.state.email,
										},
									}}
								>
									Signup
								</Link>
								<Link
									className={styles.link_btn}
									to={{
										pathname: '/referral/S9JR4M',
										state: {
											token: this.state.token,
											phoneNumber: this.state.phoneNumber,
											email: this.state.email,
										},
									}}
								>
									If you had Refferall
								</Link>
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
		emailRequestVerificationResponse: state.emailRequestVerificationResponse,
		emailVerificationResponse: state.emailVerificationResponse,
		resendTokenResponse: state.resendTokenResponse,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getEmailVerificationRequest: (params) => dispatch(getEmailVerificationRequest(params)),
		getEmailVerification: (params) => dispatch(getEmailVerification(params)),
		getResendToken: (params) => dispatch(getResendToken(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestEmailVerification);
