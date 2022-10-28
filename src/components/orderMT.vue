<template>
	<!-- 加载动画 -->
	<loader class="loading" v-show="loading"></loader>

	<!-- 页面主体部分 -->
	<div class="oops">

		<div class="last">
			<div class="sidearea" @resize="itwid()">
				<template v-for="(mt, index) in mtinfo">
					<div :class="barColorStyle[index]" @click="gotodetail(index)">
						<span class="det"> {{ mt }} </span>
					</div>
				</template>
			</div>

			<div class="marea">
				<div class="detail" @scroll.native="scrollFun" ref="scrollInstance">

					<div class="milktea" v-for="mk in allproducts" ref="scrollHeights">

						<div class="pic">
							<img :src="mk.picurl">
							<span class="sp1" v-show="mk.tips != '' && mk.tips != 'null'">{{ mk.tips }}</span>
							<span class="sp2">{{ (mk.price * mk.discount).toFixed(2) }}</span>

						</div>

						<div class="intro">
							<div class="realintro">
								<h3>{{ mk.name }}</h3>
								<span> {{ mk.intro }}</span>
							</div>
							<div class="value">
								<div class="v1 v-c" v-if="mk.discount == 1">
									<span>现价：<b>{{ mk.price }}</b></span>
								</div>

								<div class="v2 v-c" v-else>
									<span> 原价：<del><b>{{ mk.price }}¥</b></del> </span>
									<span> 折扣：<b>{{ mk.discount }}</b></span>
									<span> 现价；<b style="color: green">{{ (mk.price * mk.discount).toFixed(2) }}¥</b></span>
								</div>

							</div>
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

	<!-- 弹出层 -->
	<div class="opt">

	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

import { getallseries } from "../utils/series/axgetseries"
import { getMilkteaCount, getDescMilkteaList } from "../utils/milktee/axgetamilktea"
import loader from "../tools/loader.vue"

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

let mtinfo = ref([])
let seriesCount = ref([])
let distanceList = ref([])
let scrollInstance = ref(0)

let loading = ref(true)

function initMap() {
	for (let index = 0; index < allproducts.value.length; index++) {
		orderinfo.value.set(allproducts.value[index].guid, 0)
		pricemap.value.set(allproducts.value[index].guid, (allproducts.value[index].price * allproducts.value[index].discount).toFixed(2))
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
	let ele_height = scrollHeights.value[0].offsetHeight
	let height = 0
	if (e != 0) {
		height = (distanceList.value[e - 1] * (ele_height + 10))
	} else {
		height = 0
	}
	height += 10
	scrollInstance.value.scrollTo({
		top: height,
		behavior: 'smooth'
	})

	setTimeout(() => {
		updateBarStyle(e)
	}, 400)
}

function scrollFun(e) {
	let moveDistance = e.srcElement.scrollTop//滑动距离
	let ele_height = scrollHeights.value[0].offsetHeight
	let x_tmp = []
	for (let index = 0; index < distanceList.value.length; index++) {
		x_tmp.push(distanceList.value[index] * (ele_height + 10))
	}
	function compareNumbers(a, b) {
		return a - b;
	}
	x_tmp.push(moveDistance)
	x_tmp.sort(compareNumbers)
	updateBarStyle(x_tmp.indexOf(moveDistance))
}

function initPage() {
	getallseries().then((e) => {
		let tmp = []
		e.forEach(x => {
			tmp.push(x.name)
		});
		mtinfo.value = tmp
		updateBarStyle(0)
		setTimeout(() => {
			initDistanceList()
		}, 1);
	})
	getDescMilkteaList().then((e) => {
		allproducts.value = e
		initMap()
		setTimeout(() => {
			loading.value = false
		}, 700);
	})
}

function add2car(e) {
	orderinfo.value.set(e, orderinfo.value.get(e) + 1)
	cny.value += pricemap.value.get(e) / 1
	cny.value = cny.value.toFixed(2) / 1
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
				display: none; //chrome不显示滚动块
			}

			.detail {
				width: 95%;
				height: 100%;
				// scrollbar-width: none; //firefox 不显示滚动块
				overflow: auto;
				overflow-x: hidden;
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
					border-radius: 10px;


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
							border-radius: 10px 0 0 10px;
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
						flex-direction: row;

						.realintro {
							width: 85%;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
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
								font-size: smaller;
								font-weight: lighter;
							}
						}

						.value {
							width: 15%;
							height: 100%;

							.v-c {
								width: 100%;
								height: 100%;
								display: flex;
								flex-direction: column;
								flex-wrap: nowrap;
								font-size: smaller;
							}

							.v1 {
								display: flex;
								align-items: flex-start;
								justify-content: center;
							}

							.v2 {
								display: flex;
								align-items: flex-start;
								justify-content: space-evenly;

							}
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
}

.loading {
	right: 0;
	top: 0;
	bottom: 0;
	left: 0;
	overflow: hidden;
	position: fixed;
	z-index: 99999;
}

// .opt{
// 	width: 100%;
// 	height: 100%;
// 	position: fixed;
// 	backdrop-filter: blur(8px);
// 	top: 0;
// 	bottom: 0;
// 	z-index: 100

// }
</style>