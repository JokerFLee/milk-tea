<template>
	<div class="moa">

		<div class="maino">
			<div class="mnd">新建</div>
			<div class="mma">
				<div class="setips">
					<div class="out"><span>Series:</span><input type="text" placeholder="请输入新建的Series名称" v-model.trim="new_series"
							@keydown.enter="submitseries"></div>
					<button type="submit" @click="submitseries">提交</button>
				</div>
				<div class="setips">
					<div class="out"><span>Tips:</span><input type="text" placeholder="请输入新建的tips名称" v-model.trim="new_tips"
							@keydown.enter="submittips"></div>
					<button type="submit" @click="submittips">提交</button>
				</div>
			</div>
		</div>

		<div class="mana">
			<div class="mnd">删除</div>
			<div class="mma">

				<div class="setips">
					<div class="out">
						<span>Series:</span>
						<select title="选择元素以删除" v-model="selectSeries" >
							<option disabled value="">请选择</option>
							<option v-for="item in seriesGp" :value="item.suid">{{ item.name }}</option>
						</select>
					</div>
					<button @click="deloneseries">删除</button>
				</div>


				<div class="setips">
					<div class="out">
						<span>Tips:</span>
						<select title="选择元素以删除" v-model="selectTip" >
							<option disabled value="">请选择</option>
							<option v-for="item in tipsGp" :value="item.tuid">{{ item.name }}</option>
						</select>
					</div>
					<button @click="deltips">删除</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import getalltips from "../utils/tips/axgettips";
import addtip from "../utils/tips/axaddtip";
import deltip from "../utils/tips/axdeltip";

import getallseries from "../utils/series/axgetseries";
import addseries from "../utils/series/axaddseries";
import delseries from "../utils/series/axdelseries";

let new_series = ref("")
let new_tips = ref("")

let seriesGp = ref([])
let tipsGp = ref([])

let selectTip=ref("")
let selectSeries=ref("")

onMounted(() => {
	settips();
	setseries()
})

function settips() {
	getalltips().then((e) => {
		tipsGp.value = e
	});
}

function setseries() {
	getallseries().then((e)=>{
		seriesGp.value = e
	})
}

function submitseries() {
	let tmp = new_series.value
	if (tmp == "") {
		alert("内容不能为空")
		return 0
	}
	addseries(tmp).then((e)=>{
		if(e == "error"){
			alert("提交失败！")
		}else{
			setseries()
		}
	})
	new_series.value = ""
}

function submittips() {
	let tmp = new_tips.value
	if (tmp == "") {
		alert("内容不能为空")
		return 0
	}
	addtip(tmp).then((result) => {
		if (result == "error") {
			alert("提交失败！")
		} else {
			settips()
		}
	})
	new_tips.value = ""
}


function deltips() {
	deltip(selectTip.value).then((e)=>{
		if (e == "error") {
			alert("删除失败！")
		} else {
			settips()
		}
	})
}

function deloneseries() {
	delseries(selectSeries.value).then((e)=>{
		if (e == "error") {
			alert("删除失败！")
		} else {
			setseries()
		}
	})
}

</script>

<style lang="scss" scoped>
.moa {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: column;
	// font-family: kkt;
	user-select: none;


	.maino {
		width: 80%;
		height: 45%;
		position: relative;
		background-color: #eeeeee;
		padding: 0 10px;
		border-radius: 7px;
		box-shadow: -5px -5px 10px #fff, 5px 5px 10px #bbb;
		display: flex;
		justify-content: space-around;

		.mnd {
			color: #000000b5;
			font-weight: bold;
			font-size: larger;
			font-family: kkt;
		}

		button:hover {
			background-color: #27b63d;
			color: #fff;
			cursor: pointer;
		}
	}

	.mana {
		width: 80%;
		height: 45%;
		position: relative;
		background-color: #eeeeee;
		padding: 0 10px;
		border-radius: 7px;
		box-shadow: -5px -5px 10px #fff, 5px 5px 10px #bbb;
		display: flex;
		justify-content: space-around;
		

		.mnd {
			color: #5431b3ae;
			font-weight: bold;
			font-size: larger;
			font-family: kkt;
		}

		button:hover {
			background-color: #ff0000;
			color: #fff;
			cursor: pointer;
		}
	}

	.mnd {
		position: absolute;
		padding: 5px 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.mma {
		width: 95%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;


		input {
			width: 100%;
			height: 30px;
			border-radius: 7px;
			border: none;
			text-align: center;
			padding: 0;
			margin-left: 10px;
			// font-family: kkt;
		}

		button {
			width: 70px;
			height: 40px;
			border: none;
			background-color: #d5d5d5;
			color: #060606;
			border-radius: 5px;
		}



		.setips {
			width: 49%;
			height: 80%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: #ebecf0;
			box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
			border-radius: 7px;
		}

		.out {
			width: 80%;
			height: 60px;
			display: flex;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;

			select {
				width: 50%;
				height: 30px;
				border: none;
				border-radius: 7px;

				option {
					text-align: center;
				}
			}
		}
	}
}
</style>