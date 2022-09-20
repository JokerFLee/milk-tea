import axios from 'axios';
export default function axpost(url, method,data) {
	const ax = axios({
		url: url,
		method: method,
		data: data
	}).then(res => {
		return res.data
	})
	return ax
}