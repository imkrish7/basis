import { combineReducers } from 'redux'
import { loginResponse, otpResponse, signupResponse, emailRequestVerificationResponse ,referralVerificationResponse } from './userReducers'

const rootReducers = combineReducers({
	loginResponse,
	otpResponse,
	referralVerificationResponse,
	signupResponse,
	emailRequestVerificationResponse
})

export default rootReducers;