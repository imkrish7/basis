import React, { Component } from 'react';
import styles from '../../styles/signup.module.scss';
class SignupForm extends Component {

	constructor(props){
		super(props)
		this.state = {
			firstName: "",
			lastName: "",
			phoneNumber: "",
			email: "",
			privacy: false
		}
	}

	handleChange = (event) =>{
		const { name, value } = event.target
		console.log(value)
		this.setState({
			[name]: value
		})
	}

	handleSubmit = (event)=>{
		event.preventDefault();
		const params = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			phoneNumber: this.state.phoneNumber,
			agreeToPrivacyPolicy: this.state.privacy == "on" ? true : false,
			source: "WEB_APP",
		}
		this.props.signup(params)
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
								<input name="firstName" onChange={this.handleChange} value={this.state.firstName}placeholder="Harry" className={[styles.input, styles.input_bg].join(" ")} />
							</section>
							<section className={styles.input_wrapper}>
								<label className={styles.label}>Last Name</label>
								<input name="lastName" onChange={this.handleChange} value={this.state.lastName}placeholder="Potter" className={[styles.input, styles.input_bg].join(" ")} />
							</section>
						</div>
						<div className={styles.col}>
							<section className={styles.input_wrapper}>
								<label className={styles.label}>Phone Number</label>
								<input name="phoneNumber" onChange={this.handleChange} value={this.state.phoneNumber}placeholder="111-111-1111" className={[styles.input, styles.input_bg].join(" ")} maxLength={10} />
							</section>
							<section className={styles.input_wrapper}>
								<label className={styles.label}>Email</label>
								<input name="email" onChange={this.handleChange} value={this.state.email}placeholder="Enter you email" className={[styles.input, styles.input_bg].join(" ")} />
							</section>
						</div>
						<div className={styles.col}>
							<section className={styles.input_wrapper}>
								<label className={styles.label}>Privacy</label>
								<input name="privacy" onChange={this.handleChange} checked={this.state.privacy}type="checkbox" placeholder="Enter you email" className={styles.input} />
							</section>
						</div>
						<div className={styles.col}>
							<section className={styles.btn_wrapper}>
								<button className={styles.btn}>Submit</button>
							</section>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SignupForm;