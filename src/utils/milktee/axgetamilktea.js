import axios from 'axios';

export default function req(url, method) {
	const ax = axios({
		url: url,
		method: method,
		params: {
			pk: "233",
		}
	}).then(res => {
		return res.data
	})
	return ax
}