<template>
	<div class="oops">
		<div class="sidearea">
			<div class="sidebar" v-for="mt in mtinfo">
				<span class="det"> {{ mt }} </span>
			</div>
		</div>

		<div class="marea">

		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

let mtinfo = ref([
	"套餐推荐",
	"最低折扣",
	"夏日特饮",
	"桃子夭夭",
	"橙心橙意",
	"菠萝吹雪",
	"爽口柠檬",
	"甜点美食",
	"mosaic下午茶",
	"Florentia milk coffee",
	"低热绿色饮品"
])
let orderinfo = ref([])//名称,数量,温度,甜度,堂食?外带

let itstyle = ref("sidebar")


function add2car(e) {

}

function changeinfo(e) {

}

function submit(e) {

}

</script>

<style lang="scss" scoped>
.oops {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	user-select: none;

	.sidearea {
		width: 25%;
		max-width: 200px;
		min-width: 125px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		overflow-y: auto;
		padding-top: 10px;
		background-color: #f3f3f3;


		.sidebar:hover {
			background: linear-gradient(to right, #ffe883, #ffc9b6);
			color: #444;
			cursor: pointer;
		}

		.sidebar {
			width: 90%;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			background: linear-gradient(to left, #e76258, #f1ab92);
			margin-top: 5px;
			border-radius: 7px;
			color: #eee;


			.det {
				width: 100%;
				height: auto;
				padding: 1px 3px 1px 3px;
				display: flex;
				justify-content: center;
				text-align: center;
			}
		}

		.bar_active {
			background: linear-gradient(to right, #ffe883, #ffc9b6);
			color: #444;
		}
	}

	.marea {
		width: 100%;

	}
}
</style>