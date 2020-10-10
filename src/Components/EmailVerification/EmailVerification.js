import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/signup.module.scss';
import { getEmailVerificationRequest } from "../../actions/userActions"
class EmailVerification extends Component {

	constructor(props){
		super(props)
		this.state = {
			phoneNumber: "",
			email: "",
			token: null
		}
	}
	componentDidMount(){
		const { phoneNumber, email, token } = this.props.location.state
		this.setState({
			phoneNumber,
			email,
			token
		})
	}
	handleRequest = ()=>{
		const params = {
			phoneNumber: this.state.phoneNumber,
			email: this.state.email,
			token: this.state.token
		}
		this.props.getEmailVerificationRequest(params)
	}

	componentDidUpdate(prevProps, prevState){
		console.log(this.props)
	}
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<div className={styles.header}>
						<h1 className={styles.header_text}>Email verification</h1>
						<p className={styles.sub_text}>Request for email verification?</p>
					</div>
					{/* <div className={styles.linkwrapper}>
						<button onClick={this.handleRequest} className={styles.btn}>Request Email Verification</button>
					</div> */}
					<div className={styles.linkwrapper}>
						<button onClick={this.handleRequest} className={styles.btn}>Verify Email</button>
					</div>
				</div>
				</div>
		);
	}
}

const mapStateToProps = state =>{
	return {
		emailVerificationResponse: state.emailRequestVerificationResponse
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getEmailVerificationRequest: params => dispatch(getEmailVerificationRequest(params))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);
