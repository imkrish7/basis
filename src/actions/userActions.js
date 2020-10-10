import { getActionStates } from '../Utils/reduxUtils'
import { GET_LOGIN, GET_OTP, REFERRAL_VERIFICATION, GET_SIGNUP, EMAIL_VERIFICATION, EMAIL_VERIFICATION_REQUEST } from './actionTypes'
import { request } from '../services/prepare_request'

export const otpLoading = (isLoading) => {

	return {
		type: getActionStates(GET_OTP).inProgress,
		isLoading
	}
}
export const otpError = (error) => {
	return {
		type: getActionStates(GET_OTP).failure,
		error 
	}
}

export const otpSuccess = (data) => {
	return {
		type: getActionStates(GET_OTP).success,
		data
	}
}

export const getOTP = (params) => {
	const url = '/users/phone'
	return dispatch => request.post(dispatch, url, params, otpLoading, otpSuccess, otpError)
}


export const loginLoading = (isLoading) => {

	return {
		type: getActionStates(GET_LOGIN).inProgress,
		isLoading
	}
}
export const loginError = (error) => {
	return {
		type: getActionStates(GET_LOGIN).failure,
		error 
	}
}

export const loginSuccess = (data) => {
	return {
		type: getActionStates(GET_LOGIN).success,
		data
	}
}

export const getLogin = (params) => {
	const url = '/users/phone/verify'
	return dispatch => request.post(dispatch, url, params, loginLoading, loginSuccess, loginError)
}


export const referralVerificationLoading = (isLoading) => {

	return {
		type: getActionStates(REFERRAL_VERIFICATION).inProgress,
		isLoading
	}
}
export const referralVerificationError = (error) => {
	return {
		type: getActionStates(REFERRAL_VERIFICATION).failure,
		error 
	}
}

export const referralVerificationSuccess = (data) => {
	return {
		type: getActionStates(REFERRAL_VERIFICATION).success,
		data
	}
}

export const getReferralVerification = (params) => {
	const url = '/users/referral/' + params.token
	return dispatch => request.put(dispatch, url, params, referralVerificationLoading, referralVerificationSuccess, referralVerificationError)
}

export const signupLoading = (isLoading) => {

	return {
		type: getActionStates(GET_SIGNUP).inProgress,
		isLoading
	}
}
export const signupError = (error) => {
	return {
		type: getActionStates(GET_SIGNUP).failure,
		error 
	}
}

export const signupSuccess = (data) => {
	return {
		type: getActionStates(GET_SIGNUP).success,
		data
	}
}

export const getSignup = (params) => {
	const url = '/users'
	return dispatch => request.post(dispatch, url, params, signupLoading, signupSuccess, signupError)
}

export const emailVerificationRequestLoading = (isLoading) => {

	return {
		type: getActionStates(EMAIL_VERIFICATION_REQUEST).inProgress,
		isLoading
	}
}
export const emailVerificationRequestError = (error) => {
	return {
		type: getActionStates(EMAIL_VERIFICATION_REQUEST).failure,
		error 
	}
}

export const emailVerificationRequestSuccess = (data) => {
	return {
		type: getActionStates(EMAIL_VERIFICATION_REQUEST).success,
		data
	}
}

export const getEmailVerificationRequest = (params) => {
	const url = '/users/email'
	return dispatch => request.post(dispatch, url, params, emailVerificationRequestLoading, emailVerificationRequestSuccess, emailVerificationRequestError)
}

export const emailVerificationLoading = (isLoading) => {

	return {
		type: getActionStates(EMAIL_VERIFICATION_REQUEST).inProgress,
		isLoading
	}
}
export const emailVerificationError = (error) => {
	return {
		type: getActionStates(EMAIL_VERIFICATION_REQUEST).failure,
		error 
	}
}

export const emailVerificationSuccess = (data) => {
	return {
		type: getActionStates(EMAIL_VERIFICATION_REQUEST).success,
		data
	}
}

export const getEmailVerification = (params) => {
	const url = '/users/email/verify'
	return dispatch => request.post(dispatch, url, params, emailVerificationLoading, emailVerificationSuccess, emailVerificationError)
}