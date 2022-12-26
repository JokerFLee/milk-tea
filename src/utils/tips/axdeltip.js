import axios from 'axios';
import { getbaseurl } from "../baseurl";

function deltip(e) {
	const ax = axios({
		url: getbaseurl()+"deltips",
		method: "get",
		params: {
			tuid: e
		}
	}).then(res => {
		return res.data
	})
	return ax
}

export default deltip
