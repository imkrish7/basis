import Api_Call from './network_calls'

export const request = {
	url: "https://hiring.getbasis.co/candidate",
	get: function(dispatch, url, params, loadingAction, successAction, errorAction){
		let headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer' + localStorage.getItem('basis_token')
		}
		const path = this.url + url;

		const reqObj = {
			method: 'GET',
			url: path,
			header: Headers,
			data: params,
		};

		Api_Call(dispatch,reqObj,loadingAction, successAction, errorAction)
	},
	post: function(dispatch, url, params, loadingAction, successAction, errorAction){
		let headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer' + localStorage.getItem('basis_token')
		}
		const path = this.url + url;

		const reqObj = {
			method: 'POST',
			url: path,
			header: Headers,
			data: params,
		};

		Api_Call(dispatch,reqObj,loadingAction, successAction, errorAction)
	},
	put: function(dispatch, url, params, loadingAction, successAction, errorAction){
		let headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer' + localStorage.getItem('basis_token')
		}
		const path = this.url + url;

		const reqObj = {
			method: 'PUT',
			url: path,
			header: Headers,
			data: params,
		};

		Api_Call(dispatch,reqObj,loadingAction, successAction, errorAction)
	}
};
