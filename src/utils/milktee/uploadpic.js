import axios from 'axios';

export default function uploadpic(e) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/uploadpic",
		method: "post",
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		data:{
			file:e
		}
	}).then(res => {
		return res.data
	})
	return ax
}