import Api_Call from './network_calls'

export const request = {
	url: "https://hiring.getbasis.co/candidate",
	get: function(dispatch, url, params, loadingAction, successAction, errorAction){
		let headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + params.id +","+ localStorage.getItem('basis_token')
		}
		const path = this.url + url;

		const reqObj = {
			method: 'GET',
			url: path,
			headers,
			data: params,
		};

		Api_Call(dispatch,reqObj,loadingAction, successAction, errorAction)
	},
	post: function(dispatch, url, params, loadingAction, successAction, errorAction){
		let headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + params.id +","+ localStorage.getItem('basis_token')
		}
		const path = this.url + url;

		const reqObj = {
			method: 'POST',
			url: path,
			headers,
			data: params,
		};

		Api_Call(dispatch,reqObj,loadingAction, successAction, errorAction)
	},
	put: function(dispatch, url, params, loadingAction, successAction, errorAction){
		let headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + params.id +","+ localStorage.getItem('basis_token')
		}
		const path = this.url + url;

		const reqObj = {
			method: 'PUT',
			url: path,
			headers,
			data: params,
		};

		Api_Call(dispatch,reqObj,loadingAction, successAction, errorAction)
	},
	delete: function(dispatch, url, params, loadingAction, successAction, errorAction){
		let headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + params.id +","+ localStorage.getItem('basis_token')
		}
		const path = this.url + url;

		const reqObj = {
			method: 'DELETE',
			url: path,
			headers
		};

		Api_Call(dispatch,reqObj,loadingAction, successAction, errorAction)
	}
};
