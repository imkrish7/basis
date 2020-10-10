import { getActionStates } from '../Utils/reduxUtils';
import { errorState, loadingState, successState } from '../Utils/reduxDefaultState';
import { GET_LOGIN, GET_OTP, REFERRAL_VERIFICATION, GET_SIGNUP, EMAIL_VERIFICATION_REQUEST } from '../actions/actionTypes';
export function loginResponse(state = {}, action) {
	switch (action.type) {
		case getActionStates(GET_LOGIN).success:
			const { token } = action.data.results.user 
			localStorage.setItem('basis_token', token)
			return {
				...successState,
				data: action.data,
			};
		case getActionStates(GET_LOGIN).inProgress:
			return {
				...loadingState,
				loading: action.isLoading,
			};
		case getActionStates(GET_LOGIN).failure:
			return {
				...errorState,
				error: action.error,
			};

		default:
			return state;
	}
}

export function otpResponse(state = {}, action) {
	switch (action.type) {
		case getActionStates(GET_OTP).success:
			return {
				...successState,
				data: action.data,
			};
		case getActionStates(GET_OTP).inProgress:
			return {
				...loadingState,
				loading: action.isLoading,
			};
		case getActionStates(GET_OTP).failure:
			return {
				...errorState,
				error: action.error,
			};

		default:
			return state;
	}
}

export function referralVerificationResponse(state = {}, action) {
	switch (action.type) {
		case getActionStates(REFERRAL_VERIFICATION).success:
			return {
				...successState,
				data: action.data,
			};
		case getActionStates(REFERRAL_VERIFICATION).inProgress:
			return {
				...loadingState,
				loading: action.isLoading,
			};
		case getActionStates(REFERRAL_VERIFICATION).failure:
			return {
				...errorState,
				error: action.error,
			};

		default:
			return state;
	}
}

export function signupResponse(state = {}, action) {
	switch (action.type) {
		case getActionStates(GET_SIGNUP).success:
			return {
				...successState,
				data: action.data,
			};
		case getActionStates(GET_SIGNUP).inProgress:
			return {
				...loadingState,
				loading: action.isLoading,
			};
		case getActionStates(GET_SIGNUP).failure:
			return {
				...errorState,
				error: action.error,
			};

		default:
			return state;
	}
}


export function emailRequestVerificationResponse(state = {}, action) {
	switch (action.type) {
		case getActionStates(EMAIL_VERIFICATION_REQUEST).success:
			return {
				...successState,
				data: action.data,
			};
		case getActionStates(EMAIL_VERIFICATION_REQUEST).inProgress:
			return {
				...loadingState,
				loading: action.isLoading,
			};
		case getActionStates(EMAIL_VERIFICATION_REQUEST).failure:
			return {
				...errorState,
				error: action.error,
			};

		default:
			return state;
	}
}
