import axios from 'axios';
import { getbaseurl } from "../baseurl";

function getalltips() {
	const ax = axios({
		url: getbaseurl()+"gettips",
		method: "get",
	}).then(res => {
		return res.data
	})
	return ax
}

function getatipbyname(tip) {
	const ax = axios({
		url: getbaseurl+"checktip",
		method: "get",
		params: {
			tip: tip
		}
	}).then(res => {
		return res.data
	})
	return ax
}

export {getatipbyname,getalltips}