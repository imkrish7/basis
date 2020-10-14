import React, { Component } from 'react';
import styles from '../../styles/signup.module.scss';
import { errorRedirect } from '../../Utils/networkutils';
class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			email: '',
			privacy: false,
		};
	}

	componentDidMount() {
		try {
			const { phoneNumber, email } = this.props;
			this.setState({
				email,
				phoneNumber,
			});
		} catch (error) {
			alert('Something went wrong. It will lead to relogin. Sorry for inconvenience');
			errorRedirect();
		}
	}

	handleChange = (event) => {
		let { name, value } = event.target;
		const checkbox = event.target.type === 'checkbox' ? event.target.checked : event.value;
		if (event.target.type === 'checkbox') {
			value = checkbox;
		}
		this.setState({
			[name]: value,
		});
	};

	isNumber = () => {
		const phoneNumber = this.state.phoneNumber;
		if (phoneNumber.length > 0) {
			return /[a-z]/g.test(phoneNumber);
		}
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const params = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			phoneNumber: this.state.phoneNumber,
			agreeToPrivacyPolicy: this.state.privacy,
			source: 'WEB_APP',
		};
		this.props.signup(params);
	};

	isValidPhoneNumber = () => {
		const phoneNumber = this.state.phoneNumber;
		return phoneNumber.length > 0 && phoneNumber.length == 10 && !this.isNumber();
	};

	isEmailValid = () => {
		const email = this.state.email;
		const emailValid = /[a-z0-9]*[@]+[a-z]*[\.]+[a-z]*/g.test(email);
		return email.length > 0 && emailValid;
	};

	disabledToggle = () =>{
		const { firstName, lastName, privacy} = this.state;

		return this.isEmailValid() && privacy && this.isValidPhoneNumber() && firstName.length > 0 && lastName.length > 0
	}

	render() {
		return (
			<div className={styles.wrapper}>
				<div className={styles.form_wrapper}>
					<div className={styles.header}>
						<h1 className={styles.header_text}>Signup</h1>
						<p className={styles.sub_text}>Enter your credentials</p>
					</div>
					<form onSubmit={this.handleSubmit} className={styles.form}>
						<div className={styles.col}>
							<section className={styles.input_wrapper}>
								<label className={styles.label}>First Name</label>
								<input
								required
									name="firstName"
									onChange={this.handleChange}
									value={this.state.firstName}
									placeholder="Harry"
									className={[styles.input, styles.input_bg].join(' ')}
								/>
							</section>
							<section className={styles.input_wrapper}>
								<label className={styles.label}>Last Name</label>
								<input
								required
									name="lastName"
									onChange={this.handleChange}
									value={this.state.lastName}
									placeholder="Potter"
									className={[styles.input, styles.input_bg].join(' ')}
								/>
							</section>
						</div>
						<div className={styles.col}>
							<section className={styles.input_wrapper}>
								<label className={styles.label}>Phone Number</label>
								<input
								required
									name="phoneNumber"
									onChange={this.handleChange}
									value={this.state.phoneNumber}
									placeholder="111-111-1111"
									className={[
										styles.input, styles.input_bg, this.state.phoneNumber.length > 0
										? this.isValidPhoneNumber()
											? styles.success
											: styles.danger
										: null].join(' ')}
									maxLength={10}
								/>
								{this.isNumber() && (
												<label className={styles.label}>Otp should be Number.</label>
											)}
							</section>
							<section className={styles.input_wrapper}>
								<label className={styles.label}>Email</label>
								<input
									required
									name="email"
									onChange={this.handleChange}
									value={this.state.email}
									placeholder="Enter you email"
									className={[styles.input, styles.input_bg, this.state.email.length > 0
										? this.isEmailValid()
											? styles.success
											: styles.danger
										: null,].join(' ')}
								/>
								{this.state.email.length > 0 && !this.isEmailValid() && (
													<p className={styles.sub_text}>Please enter valid email?</p>
												)}
							</section>
						</div>
						<div className={styles.col}>
							<section className={styles.input_wrapper}>
								<label className={styles.label}>Privacy</label>
								<input
								required
									name="privacy"
									onChange={this.handleChange}
									checked={this.state.privacy}
									type="checkbox"
									placeholder="Enter you email"
									className={styles.input}
								/>
							</section>
						</div>
						<div className={styles.col}>
							<section className={styles.btn_wrapper}>
								<button disabled={ !this.disabledToggle() } className={[styles.btn,
								 this.disabledToggle() ? styles.valid
									: styles.disabled,].join(' ')}>Submit</button>
							</section>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SignupForm;
