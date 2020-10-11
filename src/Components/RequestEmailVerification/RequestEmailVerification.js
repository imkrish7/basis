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

	handleSubmit = () => {
		const params = {
			token: this.state.token,
			phoneNumber: this.state.phoneNumber,
			email: this.state.email,
		};
		this.props.getEmailVerificationRequest(params);
	};

	componentDidUpdate(prevProps, prevState) {
		try {
			if (
				prevProps.emailRequestVerificationResponse &&
				this.props.emailRequestVerificationResponse.data &&
				this.props.emailRequestVerificationResponse.success &&
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
				prevProps.emailVerificationResponse.data != this.props.emailVerificationResponse.data
			) {
				this.setState({
					tokenVerified: true,
				});
			}
		} catch (error) {
			alert('Something went wrong. It will lead to relogin. Sorry for inconvenience');
			errorRedirect();
		}
	}

	emailVerification = () => {
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
		this.props.getResendToken(params);
	};

	render() {
		return (
			<div className={[styles.container, styles.width_rn].join(' ')}>
				{!this.state.tokenSent ? (
					<div className={styles.wrapper}>
						<div className={styles.header}>
							<h1 className={styles.header_text}>Welcome</h1>
							<p className={styles.sub_text}>Please enter your?</p>
						</div>
						<div className={styles.form_wrapper}>
							<div className={styles.col}>
								<section className={styles.input_wrapper}>
									<label className={styles.label}>Email</label>
									<div className={styles.input_icon}>
										<input
											onChange={this.handleChange}
											name="email"
											value={this.state.email}
											placeholder="example@gmail.com"
											className={styles.input}
										/>
										<span onClick={this.handleSubmit} className={styles.icon_wrapper}>
											<FontAwesomeIcon className={styles.icon} icon={'arrow-circle-right'} />
										</span>
									</div>
								</section>
							</div>
						</div>
					</div>
				) : (
					!this.state.tokenVerified && (
						<div className={styles.wrapper}>
							<div className={styles.header}>
								<h1 className={styles.header_text}>Email Verification</h1>
								<p className={styles.sub_text}>Please enter valid token?</p>
							</div>
							<div className={styles.form_wrapper}>
								<div className={styles.col}>
									<section className={styles.input_wrapper}>
										<label className={styles.label}>Email</label>
										<div className={styles.input_icon}>
											<input
												required
												onChange={this.handleChange}
												name="verificationCode"
												value={this.state.verificationCode}
												placeholder="124121"
												className={styles.input}
											/>
											<span onClick={this.emailVerification} className={styles.icon_wrapper}>
												<FontAwesomeIcon className={styles.icon} icon={'arrow-circle-right'} />
											</span>
										</div>
									</section>
								</div>
							</div>
							<section className={styles.btn_wrapper}>
								<button onClick={this.resendToken} className={styles.btn}>
									Resend Token
								</button>
							</section>
						</div>
					)
				)}
				{this.state.tokenVerified && (
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
