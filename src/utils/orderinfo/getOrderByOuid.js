import axios from 'axios';
import { getbaseurl } from "../baseurl";

function getOrderByOuid(ouid) {
	const ax = axios({
		url: getbaseurl()+"getorderinfobyouid",
		method: "get",
		params:{
			ouid:ouid
		}
	}).then(res => {
		return res.data
	})
	return ax
}

export {getOrderByOuid}