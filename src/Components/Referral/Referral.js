import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../../styles/signup.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getReferralVerification } from '../../actions/userActions';
import { errorRedirect } from '../../Utils/networkutils';
class Referral extends Component {
	constructor(props) {
		super(props);
		this.state = {
			referralCode: '',
			token: '',
			referrer: {},
			isReferralValid: false,
			hasError: {
				isError: false,
				message: ""
			}
		};
	}
	componentDidMount() {
		try {
			const { token, phoneNumber, email } = this.props.location.state;
			const referralCode = this.props.match.params.token;

			this.setState({
				token,
				email,
				phoneNumber,
				referralCode,
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
		event.preventDefault()
		if(this.state.referralCode.length > 0){
		const params = {
			token: this.state.referralCode,
		};
		this.props.getReferralVerification(params);
	}else{
		alert("Please enter referral")
	}
	};

	componentDidUpdate(prevProps, prevState) {
			if (
				prevProps.referralVerificationResponse &&
				this.props.referralVerificationResponse.data &&
				this.props.referralVerificationResponse.data.success &&
				prevProps.referralVerificationResponse.data != this.props.referralVerificationResponse.data
			) {
				this.setState({
					referrer: { ...this.props.referralVerificationResponse.data.results },
					isReferralValid: true,
				});
			}

			if (
				prevProps.referralVerificationResponse &&
				this.props.referralVerificationResponse.data &&
				!this.props.referralVerificationResponse.data.success &&
				prevProps.referralVerificationResponse.data != this.props.referralVerificationResponse.data
			) {
				this.setState({
					hasError: {
						isError: true,
						message: this.props.referralVerificationResponse.data.message
					}
				});
			}
		
	}
	isValid = () => {
		const code = this.state.referralCode;
		return code.length > 0 && code.length ==6 && (/[a-z]/gi).test(code);
	};

	goBack = () => {
		this.setState({
			hasError: {
				isError: false,
				message: ''
			},
		});
	};


	render() {
		return (
			<div className={[styles.container, styles.width_rn].join(' ')}>
				{!this.state.isReferralValid && !this.state.hasError.isError? (
					<div className={styles.wrapper}>
						<div className={styles.header}>
							<h1 className={styles.header_text}>Welcome</h1>
							<p className={styles.sub_text}>Do you have Referral?</p>
						</div>
						<div className={styles.form_wrapper}>
							<form onSubmit={this.handleSubmit}>
							<div className={styles.col}>
								<section className={styles.input_wrapper}>
									<label className={styles.label}>Referral Code</label>
									<div className={[styles.input_icon, this.state.referralCode.length > 0 ? this.isValid() ? styles.success: styles.danger : null].join(' ')}>
										<input
											required
											onChange={this.handleChange}
											name="referralCode"
											value={this.state.referralCode}
											placeholder="12323"
											className={styles.input}
											maxLength={6}
										/>
										<button disabled={!this.isValid()}  className={styles.icon_wrapper}>
											<FontAwesomeIcon className={[styles.icon, this.isValid() ? styles.valid_icon: styles.disabled_icon].join(' ')} icon={'arrow-circle-right'} />
										</button>
									</div>
								</section>
							</div>
							</form>
						</div>
					</div>
				) : (
				!this.state.hasError.isError &&	<div className={styles.referrer_info}>
						<div className={styles.header}>
							<h1 className={styles.header_text}>Referrer</h1>
						</div>
						<ul className={styles.info}>
							<li className={styles.sub_text}>Referrer: {this.state.referrer.firstName}</li>
							<li className={styles.sub_text}>ReferralCode: {this.state.referralCode}</li>
						</ul>
						<div className={styles.linkwrapper}>
							<Link
								className={styles.link_btn}
								to={{
									pathname: '/signup',
									state: {
										token: this.state.token,
										email: this.state.email,
										phoneNumber: this.state.phoneNumber,
										referralCode: this.state.referralCode,
										referrer: { ...this.state.referrer },
									},
								}}
							>
								Signup Now
							</Link>
						</div>
					</div>
				)}
				{ this.state.hasError.isError && 
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
									</div>
						</div>
				</div> }
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		referralVerificationResponse: state.referralVerificationResponse,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getReferralVerification: (params) => dispatch(getReferralVerification(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Referral);
