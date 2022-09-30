import axios from 'axios';

export default function getmilktealist(token) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/getmilktealist",
		method: "get",
		params: {
			token: token,
		}
	}).then(res => {
		return res.data
	})
	return ax
}