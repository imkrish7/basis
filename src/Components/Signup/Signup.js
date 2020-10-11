import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/signup.module.scss';
import SignupForm from '../SignupForm/SignupForm';
import { getSignup } from '../../actions/userActions';
import { errorRedirect } from '../../Utils/networkutils';
class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tokenSent: true,
			referralCode: null,
			token: null,
			signupSuccess: false,
			phoneNumber: '',
			email: '',
		};
	}

	componentDidMount() {
		try {
			const { token, phoneNumber, email} = this.props.location.state
			this.setState({
				token,
				phoneNumber,
				email,
				referralcode: this.props.location.state.referralCode ? this.props.location.state.referralCode : null,
			});
		} catch (error) {
			alert('Something went wrong. It will lead to relogin. Sorry for inconvenience');
			errorRedirect();
		}
	}
	signup = (params) => {
		params['token'] = this.state.token;
		params['referralCode'] = this.state.referralCode ? this.state.referralCode : null;
		this.setState(
			{
				phoneNumber: params.phoneNumber,
				email: params.email,
			},
			() => {
				this.props.getSignup(params);
			}
		);
	};
	componentDidUpdate(prevProps, prevState) {
		try {
			if (
				prevProps.signupResponse &&
				this.props.signupResponse.success &&
				this.props.signupResponse.data &&
				this.props.signupResponse.data != prevProps.signupResponse.data
			) {
				this.setState({
					signupSuccess: true,
				});
			}
		} catch (error) {
			alert('Something went wrong. It will lead to relogin. Sorry for inconvenience');
			errorRedirect();
		}
	}
	render() {
		return (
			<div
				className={[styles.container, !this.state.signupSuccess ? styles.width_sn : styles.width_rn].join(' ')}
			>
				{this.state.email.length > 0 && this.state.phoneNumber.length > 0 && (
					<SignupForm signup={this.signup} email={this.state.email} phoneNumber={this.state.phoneNumber} />
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		signupResponse: state.signupResponse,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSignup: (params) => dispatch(getSignup(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
