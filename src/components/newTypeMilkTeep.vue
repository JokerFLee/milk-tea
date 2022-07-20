<template>
	<div class="sidebox">
		<div class="box">
			<div class="top">
				新品上架
			</div>
			<div class="edge">
				<div class="col">
					<span>名称:</span>
					<input type="text" v-model="name" placeholder="请输入新品奶茶名称">
				</div>

				<div class="col">
					<span>价格:</span>
					<input type="number" v-model="price" placeholder="奶茶总要有个价格吧">
				</div>

				<div class="col">
					<span title="勾选是以后,会在名称后面自动追加「套餐」二字">套餐:</span>
					<div>
						<label for="no"><input type="radio" id="no" value="no" v-model="combo">否 </label>
						<label for="yes"><input type="radio" id="yes" value="yes" v-model="combo">是</label>
					</div>
				</div>

				<div class="col" v-show="combo === 'yes'">
					<span title="多选时同时按住ctrl键即可">包含:</span>
					<div>
						<select v-model="select" multiple>
							<option>香草啵啵</option>
							<option>鲜榨橙汁</option>
							<option>心动草莓</option>
							<option>基尼太美</option>
							<option>你干嘛</option>
							<option>手倒榴莲</option>
						</select>
					</div>
				</div>
				<div class="col">
					<span>图片:</span>
					<div>
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
import { ref, toRaw } from 'vue';

let name = ref("")
let price = ref()
let combo = ref("no")
let select = ref([])
let uri = ref('')

function selectImg(args) {
	var myURL = window.URL.createObjectURL(args.target.files[0])
	uri.value = myURL
}

function submitthis() {
	console.log(name.value, price.value, combo.value, toRaw(select.value) , uri.value);
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
		height: 80%;
		background-color: #ebecf0;
		box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
		border-radius: 7px;
		padding: 20px 0 20px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.top {
			font-family: kkt;
			font-weight: bold;
			font-size: larger;
		}

		.edge {
			width: 80%;
			height: 80%;
			display: flex;
			flex-direction: column;
			justify-content: center;
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

				div {
					width: 80%;
					height: auto;
					display: flex;
					justify-content: center;
					align-items: center;

					.ipt {
						height: auto;
					}

					img {
						width: 100%;
						height: 100%;
						border-radius: 5px;
						max-width: 180px;
						max-height: 100px;
						object-fit: cover;
					}
					select{
						width: 100%;
						border: #333 dashed 1px;
						text-align: center;
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
				}

				input {
					width: 80%;
					height: 30px;
					border-radius: 7px;
					margin-left: 3px;
					padding: 1px 5px 1px 5px;
					text-align: center;
					font-family: "nailao";
					font-size: medium;
				}

				input::placeholder {
					color: #8b8b8b9a;
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
			font-family: kkt;
			font-size: medium;
			font-weight: bold;

		}
	}
}
</style>