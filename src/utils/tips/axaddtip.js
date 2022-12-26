import axios from 'axios';
import { getbaseurl } from "../baseurl";

export default function addtip(e) {
	const ax = axios({
		url: getbaseurl()+"addtips",
		method: "get",
		params: {
			tip: e
		}
	}).then(res => {
		return res.data
	})
	return ax
}