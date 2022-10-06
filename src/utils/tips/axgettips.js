import axios from 'axios';

function getalltips() {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/gettips",
		method: "get",
	}).then(res => {
		return res.data
	})
	return ax
}

function getatipbyname(tip) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/checktip",
		method: "get",
		params: {
			tip: tip
		}
	}).then(res => {
		return res.data
	})
	return ax
}

export {getatipbyname,getalltips}