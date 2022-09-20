export default function getalltips(url, method) {
	const ax = axios({
		url: url,
		method: method,
	}).then(res => {
		return res.data
	})
	return ax
}

export default function getatipinfobyname(url, method,tip) {
	const ax = axios({
		url: url,
		method: method,
		params: {
			tip: tip
		}
	}).then(res => {
		return res.data
	})
	return ax
}