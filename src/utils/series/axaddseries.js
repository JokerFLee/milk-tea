import axios from 'axios';

export default function addseries(e) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/addseries",
		method: "get",
		params: {
			series: e
		}
	}).then(res => {
		return res.data
	})
	return ax
}