import axios from 'axios';
import { getbaseurl } from "../baseurl";

export default function delseries(e) {
	const ax = axios({
		url: getbaseurl()+"delseries",
		method: "get",
		params: {
			suid : e
		}
	}).then(res => {
		return res.data
	})
	return ax
}