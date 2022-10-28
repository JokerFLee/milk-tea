import axios from 'axios';

function modifymilkteadiy(params) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/modifymilkteadiyparams",
		method: "post",
		data:params,
	}).then(res => {
		return res.data
	})
	return ax
}

function getdiyinfobyguid(guid) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/getdiytea",
		method: "post",
		params:{
			guid:guid
		}
	}).then(res => {
		return res.data
	})
	return ax
}

export {modifymilkteadiy,getdiyinfobyguid}
