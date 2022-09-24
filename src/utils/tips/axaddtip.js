import axios from 'axios';

export default function addtip(e) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/addtips",
		method: "get",
		params: {
			tip: e
		}
	}).then(res => {
		return res.data
	})
	return ax
}