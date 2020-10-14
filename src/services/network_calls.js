import axios from 'axios';

const apiRequest = (dispatch, reqObj,actionLoading, actionSuccess, actionError) => {


	if (actionLoading) {
		dispatch(actionLoading(true));
	}

	axios(reqObj)
		.then(res => {
			if (actionLoading) {
				dispatch(actionLoading(false));
			}

			if (res.data) {
				dispatch(actionSuccess(res.data));
			}
		})
		.catch(error => {
			console.log(error)
			if (actionError) {
				dispatch(actionError(error.response));
			}
		});
};

export default apiRequest;