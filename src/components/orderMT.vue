<template>
	<div class="oops">

		<div class="first" v-show="masu[0]">

			<div class="topbar">
				<div class="left com" @click="toleft"></div>

				<div class="center">
					<template v-for="(ms, index) in masu" :index=index>

						<div :class="stgrp[0]" v-if="index == 0">
							<div class="box">
								<div class="pic">
									<img :src=ms.picurl>
									<span>{{ ms.topic }}</span>
								</div>
								<div class="info">
									<div class="name">{{ ms.name }}</div>
									<div class="intro">{{ ms.intro }}</div>
								</div>
							</div>
						</div>

						<div :class="stgrp[1]" v-else-if="index == 1">
							<div class="box">
								<div class="pic">
									<img :src=ms.picurl>
									<span>{{ ms.topic }}</span>
								</div>
								<div class="info">
									<div class="name">{{ ms.name }}</div>
									<div class="intro">{{ ms.intro }}</div>
								</div>
							</div>
						</div>

						<div :class="stgrp[2]" v-else-if="index == 2">
							<div class="box">
								<div class="pic">
									<img :src=ms.picurl>
									<span>{{ ms.topic }}</span>
								</div>
								<div class="info">
									<div class="name">{{ ms.name }}</div>
									<div class="intro">{{ ms.intro }}</div>
								</div>
							</div>
						</div>

						<div :class="stgrp[3]" v-else>
							<div class="box">
								<div class="pic">
									<img :src=ms.picurl>
									<span>{{ ms.topic }}</span>
								</div>
								<div class="info">
									<div class="name">{{ ms.name }}</div>
									<div class="intro">{{ ms.intro }}</div>
								</div>
							</div>
						</div>

					</template>
				</div>
				<div class="right com" @click="toright"></div>
			</div>

		</div>

		<div class="last">
			<div class="sidearea" @resize="itwid()">
				<template v-for="(mt, index) in mtinfo">
					<div :class="barColorStyle[index]" @click="gotodetail(index)">
						<span class="det"> {{ mt }} </span>
					</div>
				</template>
			</div>

			<div class="marea">
				<div class="detail" @scroll.native="scrollFun" ref="scrollInstance" >
					<div class="milktea" v-for="mk in allproducts" ref="scrollHeights" >

						<div class="pic">
							<img :src="mk.picurl">
							<span class="sp1" v-show="mk.tips != ''&& mk.tips != 'null'">{{ mk.tips }}</span>
							<span class="sp2">{{ mk.price }}</span>
						</div>

						<div class="intro">
							<h3>{{ mk.name }}</h3>
							<span> {{ mk.intro }}</span>
						</div>

						<div class="option" v-if="!mk.soldout">
							<div class="oks plus" @click="add2car(mk.guid)">+</div>
							<div class="oks num">{{ orderinfo.get(mk.guid) }}</div>
							<div class="oks reduce" @click="removeFromCar(mk.guid)">-</div>
						</div>
						<div class="option" v-else>
							<div class="oks" style="color: #f88;">售罄</div>
						</div>

					</div>
				</div>
			</div>

		</div>

		<div class="price">
			<div class="tw">
				<div class="car"></div>
				<div class="cny">
					<div>结算总金额: <span class="span">{{ cny }} </span>¥</div>
				</div>
				<div class="submit" @click="submit">结算</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

import { getallseries } from "../utils/series/axgetseries"
import { getmilktealist, getMilkteaCount, getDescMilkteaList } from "../utils/milktee/axgetamilktea"

let orderMap = new Map()
let priceMap = new Map()

let allproducts = ref([])
let orderinfo = ref(orderMap)
let pricemap = ref(priceMap)
let nowidth = ref("100%")
let noml = ref("25%")
let cny = ref(0)
let barColorStyle = ref([])
let scrollHeights = ref(0)
let stgrp = ref(["mst first-one", "mst second", "mst third", "mst fouth"])
let mtinfo = ref([])
let seriesCount = ref([])
let distanceList = ref([])
let scrollInstance = ref(0)

let masu = ref([])

function initMap() {
	for (let index = 0; index < allproducts.value.length; index++) {
		orderinfo.value.set(allproducts.value[index].guid, 0)
		pricemap.value.set(allproducts.value[index].guid, allproducts.value[index].price)
	}
}

function updateBarStyle(e) {
	barColorStyle.value = []
	if (e != null) {
		for (let index = 0; index < mtinfo.value.length; index++) {
			if (index == e) {
				barColorStyle.value.push("sidebar bar_active")
			} else {
				barColorStyle.value.push("sidebar")
			}
		}
	} else {
		for (let index = 0; index < mtinfo.value.length; index++) {
			barColorStyle.value.push("sidebar")
		}
	}
}

function initDistanceList() {
	let selist = []
	let tmp = 0
	for (const er of mtinfo.value) {
		tmp += seriesCount.value[er]
		selist.push(tmp)
	}
	distanceList.value = selist
}

function gotodetail(e) {
	// 
	let ele_height = scrollHeights.value[0].offsetHeight
	// console.log(scrollInstance.value.scrollTop,e);
	let height = 0
	if (e!=0) {
		height =(distanceList.value[e-1] * (ele_height+11))
	}
	
	scrollInstance.value.scrollTo({
		top:height,
		behavior: 'smooth'

	})
	updateBarStyle(e)
}

function scrollFun(e) {
	let moveDistance = e.srcElement.scrollTop//滑动距离
	let ele_height = scrollHeights.value[0].offsetHeight

	let tmp = moveDistance / (ele_height + 15)
	let x = 0
	for (let index = 0; index < distanceList.value.length; index++) {
		if (index == 0) {
			if (tmp < distanceList.value[index]) {
				x = index
			}
		} else {
			if (tmp > distanceList.value[index - 1] && tmp < distanceList.value[index]) {
				x = index
			}
		}
	}
	updateBarStyle(x)

}


function initPage() {
	getallseries().then((e) => {
		let tmp = []
		e.forEach(x => {
			tmp.push(x.name)
		});
		mtinfo.value = tmp
		updateBarStyle(0)
		initDistanceList()
	})
	getDescMilkteaList().then((e) => {
		allproducts.value = e
		initMap()
	})
}

function add2car(e) {
	orderinfo.value.set(e, orderinfo.value.get(e) + 1)
	cny.value += pricemap.value.get(e)
}

function removeFromCar(e) {
	if (orderinfo.value.get(e) > 0) {
		orderinfo.value.set(e, orderinfo.value.get(e) - 1)
		cny.value -= pricemap.value.get(e)
	}
}

function countOfSeries() {
	getMilkteaCount().then((e) => {
		seriesCount.value = e
	})
}

// 提交订单
function submit() {
	let list = []
	const tmp = orderinfo.value.keys()
	for (const i of tmp) {
		if (orderinfo.value.get(i) != 0) {
			list.push(new Map().set(i, orderinfo.value.get(i)))
		}
	}
	console.log(list);
	initMap()
	cny.value = 0
}

// 监听侧边栏宽度。

const delay = (n) => new Promise(r => setTimeout(r, n * 1000));

async function toleft() {
	stgrp.value = ["mst first-one l2n", "mst second c2l", "mst third r2c", "mst fouth n2r"]
	await delay(1);
	let tmp = []
	for (let index = 1; index <= masu.value.length; index++) {
		tmp[index - 1] = masu.value[index]
	}
	tmp[masu.value.length - 1] = masu.value[0]
	masu.value = tmp

	stgrp.value = ["mst first-one", "mst second", "mst third", "mst fouth"]
}

async function toright() {
	stgrp.value = ["mst first-one l2c", "mst second c2r", "mst third r2n", "mst fouth n2l"]
	await delay(1);
	let tmp = []
	tmp[0] = masu.value[masu.value.length - 1]
	for (let index = 1; index < masu.value.length; index++) {
		tmp[index] = masu.value[index - 1]
	}
	masu.value = tmp
	stgrp.value = ["mst first-one", "mst second", "mst third", "mst fouth"]
}

function itwid() {
	{
		let wd = document.body.clientWidth
		if (wd <= 125 * 4) {
			nowidth.value = (wd - 125) + "px"
			noml.value = "125px"
		} else if (wd > 200 * 4) {
			nowidth.value = (wd - 200) + "px"
			noml.value = "200px"
		} else {
			nowidth.value = wd * 0.75 + "px"
			noml.value = (wd * 0.25) + "px"
		}
	}
}

onMounted(() => {
	window.addEventListener('resize', () => itwid())
	countOfSeries()
	itwid()
	initPage()
})

onUnmounted(() => {
	window.removeEventListener('resize', () => itwid())
})



</script>

<style lang="scss" scoped>
.oops {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	user-select: none;
	position: relative;
	background-color: #ededed;
	
	.first {
		width: 100%;
		height: 15%;
		min-height: 80px;
		padding: 5px 0 5px 0;

		.topbar {
			width: 100%;
			height: 100%;
			min-height: 80px;
			display: inline-flex;
			align-items: center;
			justify-content: center;

			.com {
				width: auto;
				min-width: 30px;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				background-position: 50% 50%;
				background-repeat: no-repeat;
				background-size: contain;
				cursor: pointer;
			}

			.left {
				background-image: url("../assets/left.svg");
			}

			.right {
				background-image: url("../assets/right.svg");
			}

			.center {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				position: relative;

				.first-one {
					z-index: 0;
					height: 80%;
					width: 30%;
					margin-left: 1%;
					position: absolute;
					left: 0;
				}

				.second {
					z-index: 1;
					width: 40%;
					height: 100%;
					position: absolute;
					left: 30%;
				}

				.third {
					z-index: 0;
					height: 80%;
					width: 30%;
					margin-left: -1%;
					position: absolute;
					left: 70%;
				}

				.fouth {
					z-index: 0;
					height: 0;
					width: 0;
					position: absolute;
					left: 100%;
				}

				.mst {
					// background: #2aaaffe8;
					background-color: rgba(237, 237, 237, 0.8);
					border-radius: 7px;
					color: rgb(0, 0, 0);
					// box-sizing: border-box;
					// border: 1px solid #000;
					box-shadow: -2px -2px 5px #ccc, 2px 2px 5px #ccc;

					.box {
						width: 100%;
						height: 100%;
						overflow: hidden;
						display: flex;

						.pic {
							width: 30%;
							height: 100%;
							position: relative;
							max-width: 55px;

							img {
								width: 100%;
								height: 100%;
								object-fit: contain;
							}

							span {
								position: absolute;
								padding: 5px;
								top: 5px;
								left: 60%;
								writing-mode: vertical-lr;
								white-space: nowrap;
								background-color: #fa5e2e;
								border-radius: 50%;
								font-size: smaller;
								font-family: kkt;
							}
						}

						.info {
							width: 70%;
							padding: 3px;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: space-evenly;

							.name {
								font-size: large;
								font-weight: 600;
								font-family: kkt;
								text-align: center;
							}

							.intro {
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
								overflow: hidden;
								text-overflow: ellipsis;
								font-size: small;
								font-weight: 300;
							}
						}
					}
				}
			}
		}
	}

	.last {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;

		.sidearea {
			height: 100%;
			overflow: hidden;
			width: 25%;
			max-width: 200px;
			min-width: 125px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
			overflow-y: auto;
			position: absolute;

			.sidebar {
				width: 90%;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: linear-gradient(to right, #eee, #e8e8e8);
				margin-top: 5px;
				margin-bottom: 5px;
				border-radius: 7px;
				color: #444;
				box-shadow: -2px -2px 5px #fff, 2px 2px 5px #cfcfcf;
				cursor: pointer;

				.det {
					width: 100%;
					height: auto;
					padding: 1px 3px 1px 3px;
					display: flex;
					justify-content: center;
					text-align: center;
				}
			}

			.sidebar:hover {
				background: linear-gradient(to right, #a88f7f, #67969e);
				color: #fff;
			}

			.bar_active {
				// background: linear-gradient(to right, #363d46, #374244);
				background: #363d46;
				color: #fff;
				// font-weight: bold;
			}
		}

		.marea {
			height: 100%;
			width: v-bind(nowidth);
			margin-left: v-bind(noml);
			display: flex;
			justify-content: center;

			::-webkit-scrollbar {
				display: block;
				// opacity: 1;
			}

			.detail {
				width: 95%;
				height: 100%;
				// scrollbar-width: none; //firefox 不显示滚动块
				overflow: auto;
				padding: 0 5px 0 5px;
				scroll-behavior: smooth;

				.milktea:last-child {
					margin-bottom: 160px;
				}

				.milktea {
					width: 100%;
					height: 100%;
					max-height: 120px;
					margin-top: 10px;
					margin-bottom: 10px;
					display: flex;
					box-shadow: -2px -2px 5px #ffffff, 2px 2px 5px #b4b4b4;
					border-radius: 7px;
					overflow: hidden;
					

					.pic {
						width: auto;
						min-width: 90px;
						height: 100%;
						display: flex;
						flex-direction: column;
						flex-wrap: wrap;
						position: relative;
						border-right: #d3d3d3 solid 1px;
						overflow: hidden;

						img {
							width: 100%;
							height: 100%;
							object-fit: cover;
						}

						.sp1 {
							position: absolute;
							padding: 2px;
							top: 2px;
							left: 2px;
							writing-mode: vertical-lr;
							white-space: nowrap;
							background-color: #8400ff;
							border-radius: 7px;
							font-size: smaller;
							font-family: kkt;
							color: white;
						}

						.sp2 {
							width: 100%;
							height: 35px;
							text-align: center;
							position: absolute;
							bottom: 0px;
							font-family: kkt;
							display: flex;
							justify-content: center;
							align-items: center;
							backdrop-filter: blur(15px) hue-rotate(10deg);
						}

						.sp2::after {
							content: "￥"
						}
					}

					.intro {
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: space-around;
						padding-left: 10px;
						flex-direction: column;

						h3 {
							margin: 3px 0 3px 0;
							font-family: kkt;
						}

						span {
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							overflow: hidden;
							font-size: small;
							font-weight: 200;
						}
					}

					.option {
						width: 100px;
						height: 100%;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;

						.oks {
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: larger;
							font-weight: bolder;
						}

						.plus {
							width: 40%;
							height: 100%
						}

						.num {
							width: 20%;
							height: 100%;
						}

						.reduce {
							width: 40%;
							height: 100%
						}
					}


				}
			}
		}
	}

	.price {
		position: absolute;
		bottom: 5px;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: center;

		.tw {
			width: 90%;
			height: 100%;
			display: flex;
			justify-content: center;
			position: relative;
			box-shadow: -2px -2px 5px #fff, 2px 2px 5px #888;
			border-radius: 20px;
			overflow: hidden;



			.car {
				position: absolute;
				left: 0;
				width: 120px;
				height: 100%;
				background: url("../assets/shoppingcar.svg");
				background-size: contain;
				background-repeat: no-repeat;
				background-position: 50% 50%;

			}

			.cny {
				width: 100%;
				height: 100%;

				div {
					width: 100%;
					height: 100%;
					background-color: #ededed;
					display: flex;
					justify-content: center;
					align-items: center;

					.span {
						color: rgb(202, 115, 43);
						font-weight: bolder;
						font-size: larger;
						margin: 0 5px 0 5px;

					}
				}



			}

			.submit {
				width: 120px;
				height: 100%;
				position: absolute;
				right: 0px;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				font-weight: bolder;
				font-size: large;
				background-color: #000;
			}
		}

	}

	.c2l {
		animation-name: c2l;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}

	.c2r {
		animation-name: c2r;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}

	.l2c {
		animation-name: l2c;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}

	.r2c {
		animation-name: r2c;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}

	.l2n {
		animation-name: l2n;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}

	.n2r {
		animation-name: n2r;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}

	.r2n {
		animation-name: r2n;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}

	.n2l {
		animation-name: n2l;
		animation-duration: 1s;
		animation-fill-mode: forwards;
	}

	@keyframes l2n {

		50% {
			height: 40%;
			width: 15%;
			left: 0%;
			opacity: 0.5;
			margin-left: 0;
		}

		to {
			width: 0;
			height: 0;
			left: 0%;
			opacity: 0;
			margin-left: 0;
		}
	}

	@keyframes l2c {
		50% {
			z-index: 0;
			height: 90%;
			width: 35%;
			left: 15%;
		}

		to {
			z-index: 1;
			height: 100%;
			width: 40%;
			left: 30%;
			margin-left: 0;
		}
	}

	@keyframes c2l {
		from {
			z-index: 1;
			left: 30%;
		}

		50% {
			z-index: 0;
			height: 90%;
			width: 35%;
			left: 15%;
		}

		to {
			z-index: 0;
			left: 0;
			height: 80%;
			width: 30%;
			margin-left: 1%;
		}
	}

	@keyframes c2r {

		50% {
			z-index: 0;
			height: 90%;
			width: 35%;
			left: 55%;
		}

		to {
			z-index: 0;
			left: 70%;
			height: 80%;
			width: 30%;
			margin-left: -1%;
		}
	}

	@keyframes r2c {
		50% {
			z-index: 0;
			height: 90%;
			width: 35%;
			left: 55%;
		}

		to {
			z-index: 1;
			height: 100%;
			width: 40%;
			left: 30%;
			margin-left: 0;
		}
	}

	@keyframes r2n {
		50% {
			z-index: 0;
			height: 40%;
			width: 15%;
			left: 85%;
			opacity: 0.5;
		}

		to {
			z-index: 0;
			height: 0%;
			width: 0%;
			left: 100%;
			margin-left: 0;
			opacity: 0;
		}
	}

	@keyframes n2r {
		from {
			opacity: 0;
		}

		50% {
			height: 40%;
			width: 15%;
			left: 85%;
			opacity: 0.5;
			margin-left: 0;
			z-index: 0;
		}

		to {
			height: 80%;
			width: 30%;
			z-index: 0;
			left: 70%;
			margin-left: -1%;
			opacity: 1;
		}


	}

	@keyframes n2l {
		from {
			opacity: 0;
		}

		25% {
			height: 0;
			width: 0;
			left: 0%;
			opacity: 0;
		}

		50% {
			height: 40%;
			width: 15%;
			left: 0%;
			z-index: 0;
			opacity: 0.5;
		}


		to {
			height: 80%;
			width: 30%;
			z-index: 0;
			left: 0%;
			margin-left: 1%;
			opacity: 1;
		}
	}
}
</style>