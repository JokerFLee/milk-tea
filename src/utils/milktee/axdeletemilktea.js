import axios from 'axios';

export default function deletemilkteabyguid(e) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/delmilktea",
		method: "get",
		params: {
			guid: e,
		}
	}).then(res => {
		return res.data
	})
	return ax
}