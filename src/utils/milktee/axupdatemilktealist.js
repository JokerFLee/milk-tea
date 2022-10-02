import axios from 'axios';

export default function updateMilkteaByGyid(mt) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/updatemilktea",
		method: "post",
		data:mt
	}).then(res => {
		return res.data
	})
	return ax
}

