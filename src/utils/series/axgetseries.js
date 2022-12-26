import axios from 'axios';
import { getbaseurl } from "../baseurl";

function getallseries() {
	const ax = axios({
		url: getbaseurl()+"getallseries",
		method: "get",
	}).then(res => {
		return res.data
	})
	return ax
}

function getseriesbyname(e) {
	const ax = axios({
		url: getbaseurl()+"checkseries",
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