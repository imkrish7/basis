import { combineReducers } from 'redux'
import { 
	loginResponse,
	otpResponse,
	signupResponse,
	emailRequestVerificationResponse,
	referralVerificationResponse,
	emailVerificationResponse,
	resendOTPResponse,
	resendTokenResponse,
	logoutResponse,
	updateProfileResponse
} from './userReducers'

const rootReducers = combineReducers({
	loginResponse,
	otpResponse,
	referralVerificationResponse,
	signupResponse,
	emailRequestVerificationResponse,
	emailVerificationResponse,
	resendOTPResponse,
	resendTokenResponse,
	logoutResponse,
	updateProfileResponse
})

export default rootReducers;