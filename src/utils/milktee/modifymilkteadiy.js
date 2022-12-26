import axios from 'axios';
import { getbaseurl } from "../baseurl";

function modifymilkteadiy(params) {
	const ax = axios({
		url: getbaseurl()+"modifymilkteadiyparams",
		method: "post",
		data:params,
	}).then(res => {
		return res.data
	})
	return ax
}

function getdiyinfobyguid(guid) {
	const ax = axios({
		url: getbaseurl()+"getdiytea",
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
