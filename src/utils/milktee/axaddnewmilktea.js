import axios from 'axios';
export default function axmtpost(data) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/addmilktea",
		method:"post",
		data: data
	}).then(res => {
		return res.data
	})
	return ax
}