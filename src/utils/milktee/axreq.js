export default function req(url, method) {
	const ax = axios({
		url: url,
		method: method,
		params: {
			pk: "233",
			sk: "yc9cbxyo7cs9ca6"
		}
	}).then(res => {
		return res.data
	})
	return ax
}