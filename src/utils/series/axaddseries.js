import axios from 'axios';
import { getbaseurl } from "../baseurl";

export default function addseries(e) {
	const ax = axios({
		url: getbaseurl()+"addseries",
		method: "get",
		params: {
			series: e
		}
	}).then(res => {
		return res.data
	})
	return ax
}