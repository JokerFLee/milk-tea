<template>
	<div class="sidebox">
		<div class="box">
			<div class="edge">
				<div class="col">
					<span>名称:</span>
					<div class="mobo">
						<input type="text" v-model="name" placeholder="请输入新品奶茶名称">
					</div>
				</div>

				<div class="col">
					<span>价格:</span>
					<div class="mobo">
						<input type="number" v-model="price" placeholder="奶茶总要有个价格吧">
					</div>
				</div>

				<div class="col">
					<span title="勾选是以后,会在名称后面自动追加「套餐」二字">套餐:</span>
					<div class="mobo">
						<label for="no"><input type="radio" id="no" value="no" v-model="combo">否 </label>
						<label for="yes"><input type="radio" id="yes" value="yes" v-model="combo">是</label>
					</div>
				</div>

				<div class="col" v-show="combo === 'yes'">
					<span title="多选时同时按住ctrl键即可">包含:</span>
					<div class="mobo">
						<select v-model="whichcombo" multiple>
							<option>香草啵啵</option>
							<option>鲜榨橙汁</option>
							<option>心动草莓</option>
						</select>
					</div>
				</div>

				<div class="col">
					<span>文案:</span>
					<div class="mobo">
						<textarea cols="10" rows="10" v-model="intro" placeholder="请输入让人眼前一新的文案吧"></textarea>
					</div>
				</div>

				<div class="col">
					<span>分类:</span>
					<div class="mobo">
						<select v-model="mk_series" single placeholder="请输入奶茶Tips">
							<option>鸡坤</option>
							<option>Ikun</option>
							<option>你干嘛~</option>
						</select>
					</div>
				</div>

				<div class="col">
					<span>Tips:</span>
					<div class="mobo">
						<select v-model="mk_tips" single>
							<option>坤坤</option>
							<option>守护最好的Ikun</option>
							<option>鸡哥</option>
							<option>菜鸡坤</option>
						</select>
					</div>
				</div>

				<div class="col">
					<span>图片:</span>
					<div class="mobo">
						<input type="file" class="ipt"
							accept="image/jpg,image/JPG,image/jpeg,image/JPEG,image/png,image/PNG,image/gif" single
							@change="selectImg">
						<img :src="uri" v-show="uri">
					</div>
				</div>

			</div>
			<button @click="submitthis">submit</button>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import axpost from "../utils/axpost"


let name = ref("")
let price = ref()
let combo = ref("no")
let whichcombo = ref([])
let mk_tips = ref([])
let uri = ref('')
let intro = ref("")
let mk_series = ref("")

function selectImg(args) {
	var myURL = window.URL.createObjectURL(args.target.files[0])
	uri.value = myURL
}

function submitthis() {
	let data = new Map()
	data = {"name":name.value,"price":price.value,"combo":combo.value,"whichcombo":whichcombo.value,"mk_tips":mk_tips.value,"uri":uri.value,"intro":intro.value,"mk_series":mk_series.value}
	// console.log(data);
	axpost("http://localhost:8080/addnewtee","post",data).then((e)=>{
		console.log(e);
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
		height:87%;
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
					textarea::placeholder{
						color: #8b8b8b9a;

					}

					img {
						width: 100%;
						height: 100%;
						border-radius: 5px;
						max-width: 180px;
						max-height: 100px;
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