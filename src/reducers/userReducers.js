import { getActionStates } from '../Utils/reduxUtils';
import { errorState, loadingState, successState } from '../Utils/reduxDefaultState';
import { 
	GET_LOGIN, 
	GET_OTP, REFERRAL_VERIFICATION, 
	GET_SIGNUP, 
	EMAIL_VERIFICATION_REQUEST,
	EMAIL_VERIFICATION,
	RESEND_OTP,
	RESEND_TOKEN,
	GET_LOGOUT,
	UPDATE_PROFILE
} from '../actions/actionTypes';

export function loginResponse(state = {}, action) {
	switch (action.type) {
		case getActionStates(GET_LOGIN).success:
			
			if(action.data.results.user){
				const { token } = action.data.results.user
				localStorage.setItem('basis_token', token)
			}
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

export function emailVerificationResponse(state = {}, action) {
	switch (action.type) {
		case getActionStates(EMAIL_VERIFICATION).success:
			return {
				...successState,
				data: action.data,
			};
		case getActionStates(EMAIL_VERIFICATION).inProgress:
			return {
				...loadingState,
				loading: action.isLoading,
			};
		case getActionStates(EMAIL_VERIFICATION).failure:
			return {
				...errorState,
				error: action.error,
			};

		default:
			return state;
	}
}


export function resendOTPResponse(state = {}, action) {
	switch (action.type) {
		case getActionStates(RESEND_OTP).success:
			return {
				...successState,
				data: action.data,
			};
		case getActionStates(RESEND_OTP).inProgress:
			return {
				...loadingState,
				loading: action.isLoading,
			};
		case getActionStates(RESEND_OTP).failure:
			return {
				...errorState,
				error: action.error,
			};

		default:
			return state;
	}
}

export function resendTokenResponse(state = {}, action) {
	switch (action.type) {
		case getActionStates(RESEND_TOKEN).success:
			return {
				...successState,
				data: action.data,
			};
		case getActionStates(RESEND_TOKEN).inProgress:
			return {
				...loadingState,
				loading: action.isLoading,
			};
		case getActionStates(RESEND_TOKEN).failure:
			return {
				...errorState,
				error: action.error,
			};

		default:
			return state;
	}
}

export function logoutResponse(state = {}, action) {
	switch (action.type) {
		case getActionStates(GET_LOGOUT).success:
			return {
				...successState,
				data: action.data,
			};
		case getActionStates(GET_LOGOUT).inProgress:
			return {
				...loadingState,
				loading: action.isLoading,
			};
		case getActionStates(GET_LOGOUT).failure:
			return {
				...errorState,
				error: action.error,
			};

		default:
			return state;
	}
}

export function updateProfileResponse(state = {}, action) {
	switch (action.type) {
		case getActionStates(UPDATE_PROFILE).success:
			return {
				...successState,
				data: action.data,
			};
		case getActionStates(UPDATE_PROFILE).inProgress:
			return {
				...loadingState,
				loading: action.isLoading,
			};
		case getActionStates(UPDATE_PROFILE).failure:
			return {
				...errorState,
				error: action.error,
			};

		default:
			return state;
	}
}



