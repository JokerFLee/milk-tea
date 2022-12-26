import axios from 'axios';
import { getbaseurl } from "../baseurl";

function getmilktealist(token) {
	const ax = axios({
		url: getbaseurl()+"getmilktealist",
		method: "get",
		params: {
			token: token,
		}
	}).then(res => {
		return res.data
	})
	return ax
}

function getMilkteaByName(name) {
	const ax = axios({
		url: getbaseurl()+"checkmilkteaexist",
		method: "get",
		params: {
			name: name,
		}
	}).then(res => {
		return res.data
	})
	return ax
}


function getMilkteaByGuid(guid) {
	const ax = axios({
		url: getbaseurl()+"getmilkteabyid",
		method: "get",
		params: {
			guid: guid,
		}
	}).then(res => {
		return res.data
	})
	return ax
}


function getMilkteaCount() {
	const ax = axios({
		url: getbaseurl()+"getmilkteacount",
		method: "get",
	}).then(res => {
		return res.data
	})
	return ax
}

function getDescMilkteaList() {
	const ax = axios({
		url: getbaseurl()+"getdescmilktealist",
		method: "get",
	}).then(res => {
		return res.data
	})
	return ax
}

function getMilkteaPriceCount(data) {
	const ax = axios({
		url: getbaseurl()+"getMilkteaPriceCount",
		method: "post",
		data:data
	}).then(res => {
		return res.data
	})
	return ax
}


export {getmilktealist,getMilkteaByGuid,getMilkteaByName,getDescMilkteaList,getMilkteaCount,getMilkteaPriceCount}