import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUpdateProfile } from '../../actions/userActions';
import styles from '../../styles/profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { errorRedirect } from '../../Utils/networkutils';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			firstName: 'Krishna',
			lastName: 'Singh',
			id: '',
			avatar: null,
		};
	}

	componentDidMount(prevProps) {
		try {
			const { firstName, lastName, _id, avatar } = this.props.loginResponse.data.results.user;
			this.setState({
				firstName,
				lastName,
				id: _id,
				avatar,
			});
		} catch (error) {
			alert('Something went wrong. It will lead to relogin. Sorry for inconvenience');
			errorRedirect();
		}
	}

	toggle = () => {
		this.setState({
			edit: !this.state.edit,
		});
	};
	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};
	componentDidUpdate(prevProps, prevState) {
		try {
			if (
				prevProps.updateProfileResponse &&
				this.props.updateProfileResponse &&
				this.props.updateProfileResponse.success &&
				this.props.updateProfileResponse.data &&
				this.props.updateProfileResponse.data != prevProps.updateProfileResponse.data
			) {
				this.setState({
					edit: false,
				});
			}
		} catch (error) {
			alert('Something went wrong. It will lead to relogin. Sorry for inconvenience');
			errorRedirect();
		}
	}
	handleSubmit = (event) => {
		event.preventDefault();
		if(this.state.firstName.length>0 && this.state.lastName.length >0){
		const params = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			id: this.state.id,
		};
		this.props.getUpdateProfile(params);
	}else{
		alert("Name should be valid")
	}
	};
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.card}>
					<div className={styles.avatar_wrapper}>
						<div className={styles.avatar}>
							{this.state.avatar && (
								<img src={this.state.avatar} alt="avatar" className={styles.avatar_image} />
							)}
						</div>
					</div>
					<div className={styles.hero}>
						<div className={styles.edit}>
							<span onClick={this.toggle} className={styles.icon_wrapper}>
								<FontAwesomeIcon className={styles.icon} icon={'pen'} />
							</span>
						</div>
						{this.state.edit ? (
							<form onSubmit={this.handleSubmit} className={styles.form}>
								<section className={styles.input_wrapper}>
									<label className={styles.label}>First Name</label>
									<input
										required
										onChange={this.handleChange}
										name="firstName"
										value={this.state.firstName}
										className={styles.input}
									/>
								</section>
								<section className={styles.input_wrapper}>
									<label className={styles.label}>Last Name</label>
									<input
										required
										onChange={this.handleChange}
										name="lastName"
										value={this.state.lastName}
										className={styles.input}
									/>
								</section>
								<div className={styles.btn_wrapper}>
									<button className={styles.btn}>Save</button>
								</div>
							</form>
						) : (
							<React.Fragment>
								<div className={styles.col}>
									<span className={styles.title}>First Name</span>
									<span className={styles.title_text}>{this.state.firstName || 'John'}</span>
								</div>
								<div className={styles.col}>
									<span className={styles.title}>Last Name</span>
									<span className={styles.title_text}>{this.state.lastName || 'Wick'}</span>
								</div>
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loginResponse: state.loginResponse,
		updateProfileResponse: state.updateProfileResponse,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUpdateProfile: (params) => dispatch(getUpdateProfile(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
