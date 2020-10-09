import React, { Suspense, Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// Routes
import routes from '../../routes'
// Components
import DefaultHeader from './DefaultHeader'
// Styles 
import styles from '../../styles/default.module.scss'

class DefaultLayout extends Component{
	constructor(props){
		super(props)

	}

	render(){
		return(
			<div className={styles.container}>
				<DefaultHeader />
				<main className={styles.main}>
					<Suspense fallback={"...loading"}>
						<Switch>
							{ routes.map((route, index) => {
								return route.component ? <Route 
								key={index}
								path={route.path}
								name={route.name}
								render = {props => (
									<route.component { ...props }/>
								)}
								/> : null
							})}
							<Redirect from="/" to="/dashboard" />
						</Switch>
					</Suspense>
				</main>
			</div>
		)
	}
}

export default DefaultLayout;