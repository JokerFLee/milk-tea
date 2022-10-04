<template>
	<div class="sidebox">
		<div class="box">
			<form class="edge" @submit.prevent="submitthis" autocomplete="on">
				<div class="col">
					<span>*名称:</span>
					<div class="mobo">
						<input type="text" v-model="name" name="milktea_name" autocomplete="on" placeholder="请输入新品奶茶名称"
							@focusout="checkName">
					</div>
				</div>

				<div class="col">
					<span>*价格:</span>
					<div class="mobo">
						<input type="number" v-model="price" placeholder="奶茶总要有个价格吧">
					</div>
				</div>

				<div class="col">
					<span>*文案:</span>
					<div class="mobo">
						<textarea cols="10" rows="10" v-model="intro" name="milktea_intro" autocomplete="on"
							placeholder="请输入让人眼前一新的文案吧"></textarea>
					</div>
				</div>

				<div class="col">
					<span>*分类:</span>
					<div class="mobo">
						<select v-model="mk_series" single>
							<option disabled>请选择</option>
							<option v-for=" item in seriesList">{{item.name}}</option>
						</select>
					</div>
				</div>

				<div class="col">
					<span>Tips:</span>
					<div class="mobo">
						<select v-model="mk_tips" single>
							<option disabled>请选择</option>
							<option v-for=" item in tipsList">{{item.name}}</option>
						</select>
					</div>
				</div>

				<div class="col">
					<span>*图片:</span>
					<div class="mobo">
						<input type="file" class="ipt"
							accept="image/jpg,image/JPG,image/jpeg,image/JPEG,image/png,image/PNG,image/gif" single
							@change="selectImg">
						<img :src="local_pic_url" v-show="local_pic_url">
					</div>
				</div>

			</form>
			<button type="submit" @click="submitthis">提交</button>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axmtpost from "../utils/milktee/axaddnewmilktea"
import uploadpic from "../utils/milktee/uploadpic"
import { getMilkteaByName } from "../utils/milktee/axgetamilktea"
import { getallseries } from "../utils/series/axgetseries"
import { getalltips } from "../utils/tips/axgettips"

let name = ref("")
let price = ref()
let mk_tips = ref()
let uri = ref('')
let intro = ref("")
let mk_series = ref("")
let local_pic_url = ref("")

let seriesList = ref("")
let tipsList = ref("")

function initPage() {
	getallseries().then((e) => {
		seriesList.value = e
	})
	getalltips().then((e) => {
		tipsList.value = e
	})
}

onMounted(() => {
	initPage()
})

function selectImg(args) {
	local_pic_url.value = window.URL.createObjectURL(args.target.files[0])
	let file = args.target.files[0]
	uploadpic(file).then((e) => {
		if (e.result != "error") {
			uri.value = e.url
		}
	})
}

function submitthis() {
	let data = new Map()
	data = { "name": name.value, "price": price.value, "mk_tips": mk_tips.value, "uri": uri.value, "intro": intro.value, "mk_series": mk_series.value }

	if (name.value != null && price.value != null &&  mk_series != null && intro != null && uri.value != null) {
		axmtpost(data).then((e) => {
			if (e == 1) {
				name.value = ""
				price.value = ""
				mk_tips.value = ""
				uri.value = ""
				intro.value = ""
				mk_series.value = ""
				local_pic_url.value = ""
			} else {
				alert("添加失败")
			}

		})
	} else {
		alert("标有*的项都是必须的")
	}
}

function checkName() {
	getMilkteaByName(name.value).then((e) => {
		if (e) {
			alert("当前奶茶名已被占用！建议更换以避免混淆")
		}
	})
}

</script>

<style lang="scss" scoped>
.sidebox {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	.box {
		width: 90%;
		max-width: 600px;
		height: 87%;
		background-color: #ebecf0;
		box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
		border-radius: 7px;
		padding: 20px 0 20px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.edge {
			width: 80%;
			height: 90%;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;

			.col {
				width: 80%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				margin: 3px 0 3px 0;

				span {
					width: 20%;
					height: 30px;
					display: inline-flex;
					justify-content: center;
					align-items: center;
				}

				.mobo {
					width: 80%;
					height: auto;
					display: flex;
					justify-content: center;
					align-items: center;

					textarea {
						width: 100%;
						min-width: 100%;
						height: 30px;
						min-height: 30px;
						max-height: 70px;
						padding: 0;
						border: none;
						border-radius: 7px;
						font-family: none;
						text-align: center;
					}

					textarea::placeholder {
						color: #8b8b8b9a;

					}

					img {
						width: auto;
						height: 100%;
						border-radius: 5px;
						max-height: 130px;
						object-fit: cover;
					}

					select {
						width: 100%;
						min-width: 90%;
						min-height: 30px;
						text-align: center;
						border-radius: 7px;
						border: none;
						overflow: auto;
						option{
							text-align: center;
						}
					}

					label {
						width: 50%;
						height: 30px;
						display: flex;
						align-items: center;
						justify-content: center;

						input {
							width: auto;
						}
					}

					input {
						width: 100%;
						height: 30px;
						border-radius: 7px;
						border: none;
						text-align: center;
						padding: 0;
					}

					input::placeholder {
						color: #8b8b8b9a;
					}

					.ipt {
						height: auto;
						border-radius: 0;
					}
				}
			}
		}

		button {
			margin-top: 10px;
			height: 50px;
			width: 120px;
			border-radius: 50px;
			background-color: #161111;
			color: #eee;
			cursor: pointer;
			font-size: medium;
			font-weight: bold;

		}
	}
}
</style>