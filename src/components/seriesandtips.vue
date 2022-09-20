<template>
	<div class="moa">
		<div class="maino">
			<div class="mnd">新建</div>
			<div class="mma">
				<div class="setips">
					<div class="out"><span>Series:</span><input type="text" placeholder="请输入新建的Series名称"></div>
					<button type="submit">提交</button>
				</div>
				<div class="setips">
					<div class="out"><span>Tips:</span><input type="text" placeholder="请输入新建的tips名称"></div>
					<button type="submit">提交</button>
				</div>
			</div>
		</div>
		<div class="mana">
			<div class="mnd">删除</div>
			<div class="mma">

				<div class="setips">
					<div class="out">
						<span>Series:</span>
						<select title="选择元素以删除">
							<option></option>
							<option>1</option>
							<option>2</option>
						</select>
					</div>
					<button type="submit">删除</button>
				</div>


				<div class="setips">
					<div class="out">
						<span>Tips:</span>
						<select title="选择元素以删除">
							<option></option>
							<option>1</option>
							<option>2</option>
						</select>
					</div>
					<button type="submit">删除</button>
				</div>


			</div>
		</div>
	</div>


</template>

<script setup>
import { reactive } from 'vue';
import "axreq.js";

let new_series =  reactive("")
let new_tips =  reactive("")

let seriesGp = reactive([])
let tipsGp = reactive([])

function gettips(){
	ax
}

</script>

<style lang="scss" scoped>
.moa {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-family: kkt;

	.maino {
		width: 95%;
		height: 95%;
		position: relative;
	}

	.mana {
		width: 95%;
		height: 95%;
		position: relative;
	}

	.mnd {
		position: absolute;
		padding: 10px 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.mma {
		width: 100%;
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
			font-family: kkt;
		}

		button {
			width: 70px;
			height: 40px;
			border: none;
			background-color: #d5d5d5;
			color: #060606;
			border-radius: 5px;
		}

		button:hover {
			background-color: #000000;
			color: #fff;
			cursor: pointer;
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
					background-color: #ececec;
				}
			}
		}
	}
}
</style>