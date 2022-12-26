import axios from 'axios';
import { getbaseurl } from "../baseurl";

export default function axmtpost(data) {
	const ax = axios({
		url: getbaseurl()+"addmilktea",
		method:"post",
		data: data
	}).then(res => {
		return res.data
	})
	return ax
}