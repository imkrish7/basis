import React, { Component } from 'react';
import styles from '../../styles/signup.module.scss';

class TokenVerification extends Component {
	render() {
		return (
			<form className={styles.form}>
				<section className={styles.input_wrapper}>
					<label className={styles.label}>Token</label>
					<input placeholder="123DFG" className={styles.input} />
				</section>
				<section className={styles.input_wrapper}>
					<label className={styles.label}>Referral</label>
					<input placeholder="123DFG" className={styles.input} />
				</section>
				<section className={styles.btn_wrapper}>
					<button className={styles.btn}>Submit</button>
				</section>
			</form>
		);
	}
}

export default TokenVerification;
