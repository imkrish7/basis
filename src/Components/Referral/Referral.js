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
		try {
			if (
				prevProps.referralVerificationResponse &&
				this.props.referralVerificationResponse.data &&
				this.props.referralVerificationResponse.success &&
				prevProps.referralVerificationResponse.data != this.props.referralVerificationResponse.data
			) {
				this.setState({
					referrer: { ...this.props.referralVerificationResponse.data.results },
					isReferralValid: true,
				});
			}
		} catch (error) {
			alert('Something went wrong. It will lead to relogin. Sorry for inconvenience');
			errorRedirect();
		}
	}
	isValid = () => {
		return this.state.referralCode.length > 0 && this.state.referralCode.length < 7;
	};
	render() {
		return (
			<div className={[styles.container, styles.width_rn].join(' ')}>
				{!this.state.isReferralValid ? (
					<div className={styles.wrapper}>
						<div className={styles.header}>
							<h1 className={styles.header_text}>Welcome</h1>
							<p className={styles.sub_text}>Do you have Referral?</p>
						</div>
						<div className={styles.form_wrapper}>
							<div className={styles.col}>
								<section className={styles.input_wrapper}>
									<label className={styles.label}>Referral Code</label>
									<div className={styles.input_icon}>
										<input
											required
											onChange={this.handleChange}
											name="referralCode"
											value={this.state.referralCode}
											placeholder="12323"
											className={styles.input}
										/>
										<button disabled={this.isValid()} onClick={this.handleSubmit} className={styles.icon_wrapper}>
											<FontAwesomeIcon className={styles.icon} icon={'arrow-circle-right'} />
										</button>
									</div>
								</section>
							</div>
						</div>
					</div>
				) : (
					<div className={styles.referrer_info}>
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
