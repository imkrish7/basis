import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/login.module.scss';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			otpSent: false,
		};
	}
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<div className={styles.header}>
						<h1 className={styles.header_text}>Login</h1>
						<p className={styles.sub_text}>Enter your credentials</p>
					</div>
					<div className={styles.form_wrapper}>
						{this.state.otpSent ? (
							<form className={styles.form}>
								<section className={styles.input_wrapper}>
									<label className={styles.label}>Phone number</label>
									<input placeholder="111-222-3333" className={styles.input} />
								</section>
								<section className={styles.btn_wrapper}>
									<button className={styles.btn}>Submit</button>
								</section>
							</form>
						) : (
							<form className={styles.form}>
								<section className={styles.input_wrapper}>
									<label className={styles.label}>OTP</label>
									<input placeholder="123" className={styles.input} />
								</section>
								<section className={styles.btn_wrapper}>
									<button className={styles.btn}>Submit</button>
								</section>
							</form>
						)}
					</div>
				</div>
				<div className={styles.hero}>
					<div className={styles.hero_card}>
						<h1 className={styles.hero_text}>Simple App</h1>
						<div className={styles.linkwrapper}>
							<Link className={styles.link_btn} to="/signup">
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
