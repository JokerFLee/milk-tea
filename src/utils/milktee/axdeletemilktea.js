import axios from 'axios';
import { getbaseurl } from "../baseurl";

export default function deletemilkteabyguid(e) {
	const ax = axios({
		url: getbaseurl()+"delmilktea",
		method: "get",
		params: {
			guid: e,
		}
	}).then(res => {
		return res.data
	})
	return ax
}