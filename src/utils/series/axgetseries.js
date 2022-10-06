import axios from 'axios';

function getallseries() {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/getallseries",
		method: "get",
	}).then(res => {
		return res.data
	})
	return ax
}

function getseriesbyname(e) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/checkseries",
		method: "get",
		params: {
			seriesname: e
		}
	}).then(res => {
		return res.data
	})
	return ax
}

export {getseriesbyname,getallseries}