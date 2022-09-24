import axios from 'axios';

function deltip(e) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/deltips",
		method: "get",
		params: {
			tuid: e
		}
	}).then(res => {
		return res.data
	})
	return ax
}

export default deltip
