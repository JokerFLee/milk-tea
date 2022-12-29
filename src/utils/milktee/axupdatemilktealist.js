import axios from 'axios';
import { getbaseurl } from "../baseurl";

export default function updateMilkteaByGuid(mt) {
	const ax = axios({
		url: getbaseurl()+"updatemilktea",
		method: "post",
		data:mt
	}).then(res => {
		return res.data
	})
	return ax
}

