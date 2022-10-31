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

					<div class="milktea" v-for="mk in allproducts" ref="scrollHeights" @click="showDetail(mk.guid)">

						<div class="pic">
							<img :src="mk.picurl">
							<span class="sp1" v-show="mk.tips != '' && mk.tips != 'null'">{{ mk.tips }}</span>
							<span class="sp2">{{ (mk.price * mk.discount).toFixed(2) }}</span>

						</div>

						<div class="intro">
							<div class="realintro">
								<h3>{{ mk.name }}</h3>
							</div>

							<div class="value">
								<div class="intro_min">
									<span> {{ mk.intro }}</span>
								</div>
								<div class="v-c" v-if="mk.discount == 1">
									<div class="mmb v1 ">
										<span>现价:<b>{{ mk.price }}</b></span>
									</div>

								</div>

								<div class="v-c" v-else>
									<div class="mmb v2">
										<span> 原价:<del><b>{{ mk.price }}¥</b></del> </span>
										<span> 折扣:<b>{{ mk.discount }}</b></span>
										<span> 现价:<b style="color: green">{{ (mk.price * mk.discount).toFixed(2) }}¥</b></span>
									</div>
								</div>

							</div>
						</div>

						<div class="option" v-if="!mk.soldout">
							<div class="oks plus" @click.stop="add2car(mk.guid)"></div>
							<div class="oks num">{{ orderinfo.get(mk.guid) }}</div>
							<div class="oks reduce" @click.stop="removeFromCar(mk.guid)"></div>
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
				<div class="car" @click=""></div>
				<div class="cny">
					<div>结算总金额: <span class="span">{{ cny }} </span>¥</div>
				</div>
				<div class="submit" @click="submit">结算</div>
			</div>
		</div>
	</div>

	<!-- 详情页 -->
	<div class="detail_fixed" v-show="detailLayer">
		<div class="outbox">
			<div class="container">
				<div class="mbox">
					<div class="head"></div>
					<div class="body"></div>
				</div>
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
import { getdiyinfobyguid } from "../utils/milktee/modifymilkteadiy";
import loader from "../tools/loader.vue"

let orderMap = new Map()
let priceMap = new Map()

let detailLayer = ref(false)

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
		if (wd <= 70 * 4) {
			nowidth.value = (wd - 70) + "px"
			noml.value = "70px"
		} else if (wd > 200 * 4) {
			nowidth.value = (wd - 200) + "px"
			noml.value = "200px"
		} else {
			nowidth.value = wd * 0.75 + "px"
			noml.value = (wd * 0.25) + "px"
		}
	}
}

function showDetail(params) {
	detailLayer.value = true
	console.log(params);
}

function getDiYByGuid(guid) {
	getdiyinfobyguid(guid).then((ele) => {
		console.log(ele);
	})

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
	background-color: #e6e6e6;
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
			min-width: 70px;
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
						width: 90px;
						min-width: 70px;
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
							-webkit-backdrop-filter: blur(15px) hue-rotate(10deg);
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

						.realintro {
							width: 100%;
							height: auto;
							display: flex;
							align-items: center;
							justify-content: space-around;
							flex-direction: column;
							border-bottom: #f4a460 solid 1px;

							h3 {
								margin: 3px 0 3px 0;
								font-family: kkt;
							}


						}

						.value {
							width: 100%;
							height: 100%;
							display: flex;
							justify-content: space-evenly;

							.intro_min {
								width: 45%;
								display: flex;
								align-items: center;
								justify-content: center;

								span {
									display: -webkit-box;
									-webkit-line-clamp: 4;
									-webkit-box-orient: vertical;
									overflow: hidden;
									font-size: smaller;
									font-weight: lighter;
								}
							}

							.v-c {
								width: 50%;
								height: 100%;
								display: flex;
								align-items: center;
								justify-content: center;

								.mmb {
									width: 100%;
									height: 100%;
									font-size: 13px;
									display: flex;
									flex-direction: column;
									align-items: center;
								}

							}

							.v1 {
								justify-content: center;
							}

							.v2 {
								justify-content: space-evenly;
							}
						}
					}

					.option {
						width: 90px;
						height: 100%;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-evenly;
						margin-right: 5px;

						.oks {
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: larger;
							font-weight: bolder;
							height: 30px;
						}

						.plus {
							width: 25px;
							height: 25px;
							cursor: pointer;
							border-radius: 50%;
							box-shadow: -2px -2px 3px #fff, 2px 2px 3px #ccc;
							background-image: url(../assets/plus.svg);
							background-position: center;
							background-size: contain;
							background-repeat: no-repeat;
							
						}

						.num {
							margin: 0px 1px;
							height: auto;
							
						}

						.reduce {
							width: 25px;
							height: 25px;
							cursor: pointer;
							border-radius: 50%;
							box-shadow: -2px -2px 3px #fff, 2px 2px 3px #ccc;
							background-image: url(../assets/minus.svg);
							background-position: center;
							background-size: contain;
							background-repeat: no-repeat;
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

.detail_fixed {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #00000090;
	backdrop-filter: blur(15px);
	-webkit-backdrop-filter: blur(15px);

	.outbox {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.container {
			width: 80%;
			height: 90%;

			border-radius: 15px;
			overflow: hidden;

			.mbox {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				flex-wrap: nowrap;
				background: #fff;

				.head {
					height: 100px;
					width: 100%;

				}

				.body {
					height: 100%;
					width: 100%;
					background: #ccc;
					border-top-left-radius: 20px;
					border-top-right-radius: 20px;
				}
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