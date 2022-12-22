import axios from 'axios';

function getOrderByOuid(ouid) {
	const ax = axios({
		url: "http://mt.ip.jokeme.top:6280/getorderinfobyouid",
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