import axios from 'axios';

function uploadOrderInfo(data) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/generateorder",
		method: "post",
		data:data
	}).then(res => {
		return res.data
	})
	return ax
}

export {uploadOrderInfo}