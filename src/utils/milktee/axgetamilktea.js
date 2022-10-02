import axios from 'axios';

function getmilktealist(token) {
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

function getMilkteaByName(name) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/checkmilkteaexist",
		method: "get",
		params: {
			name: name,
		}
	}).then(res => {
		return res.data
	})
	return ax
}


function getMilkteaByGyid(guid) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/getmilkteabyid",
		method: "get",
		params: {
			guid: guid,
		}
	}).then(res => {
		return res.data
	})
	return ax
}

export {getmilktealist,getMilkteaByGyid,getMilkteaByName}