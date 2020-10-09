import React, { Component } from 'react'
import styles from '../../styles/header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
class Header extends Component{

	constructor(props){
		super(props)
		this.state = {
			show: false
		}
	}

	toggle = ()=>{
		this.setState({
			show: !this.state.show
		})
	}

	render(){
		return(
			<header className={styles.header}>
				<div className={styles.logo}>
					<h1 className={styles.logo_text}>Sample App</h1>
				</div>
				<nav className={styles.navbar}>
					<div onClick={this.toggle} className={styles.icon}>
						<FontAwesomeIcon icon={"user-minus"}/>
					</div>
					{ this.state.show && <div className={styles.options}>
						<Link to="/profile" className={styles.option}>Profile</Link>
						<div className={[styles.option, styles.no_border].join(" ")}>Logout</div>
					</div>}
				</nav>
			</header>
		)
	}
}

export default Header