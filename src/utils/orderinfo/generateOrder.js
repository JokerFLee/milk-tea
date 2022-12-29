import axios from 'axios';
import { getbaseurl } from "../baseurl";

function uploadOrderInfo(data) {
	const ax = axios({
		url: getbaseurl()+"generateorder",
		method: "post",
		data:data
	}).then(res => {
		return res.data
	})
	return ax
}

export {uploadOrderInfo}