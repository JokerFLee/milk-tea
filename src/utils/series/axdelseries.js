import axios from 'axios';

export default function delseries(e) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/delseries",
		method: "get",
		params: {
			suid : e
		}
	}).then(res => {
		return res.data
	})
	return ax
}