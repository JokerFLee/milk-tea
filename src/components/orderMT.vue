<template>
	<!-- 加载动画 -->
	<loader class="loading" v-show="loading"></loader>
	<div class="notify" v-show="showit">
		<notifi>{{ msg }}</notifi>
	</div>
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

						<div class="inbox_mt" v-if="mk.soldout == 0" @click="showDetail(mk.guid, mk.name)">

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
											<span>现价:<b>{{ mk.price }}￥</b></span>
										</div>

									</div>

									<div class="v-c" v-else>
										<div class="mmb v2">
											<span> 原价:<del><b>{{ mk.price }}¥</b></del> </span>
											<span> 折扣:<b>{{ mk.discount }}</b></span>
											<span class="ns"> 现价:<b>{{ (mk.price * mk.discount).toFixed(2) }}¥</b></span>
										</div>
									</div>

								</div>
							</div>

						</div>

						<div class="inbox_mt inmt" v-else>
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
											<span>现价:<b>{{ mk.price }}￥</b></span>
										</div>

									</div>

									<div class="v-c" v-else>
										<div class="mmb v2">
											<span> 原价:<del><b>{{ mk.price }}¥</b></del> </span>
											<span> 折扣:<b>{{ mk.discount }}</b></span>
											<span class="ns"> 现价:<b>{{ (mk.price * mk.discount).toFixed(2) }}¥</b></span>
										</div>
									</div>

								</div>
							</div>
							<div class="msk_inbox">
								售罄
							</div>

						</div>

					</div>

				</div>
			</div>

		</div>

		<div class="price">
			<div class="tw">
				<div class="car" @click="showMilkTeaCarInfo"></div>
				<div class="cny">
					<div>总金额:<span class="span">{{ money }} </span>¥</div>
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
					<div class="head">{{ title }}</div>
					<div class="body">

						<div class="smell common_it" v-show="smell">
							<p>甜度</p>
							<div class="mbty">

								<template v-for="(item, index) in smell">
									<span v-if="milktea_option[0] == item" class="spanstyle" @click="changeMilkteaOption(0, item)">{{
										item
									}}</span>
									<span v-else @click="changeMilkteaOption(0, item)">{{ item }}</span>
								</template>

							</div>
						</div>

						<div class="temperatur common_it" v-show="temperature">
							<p>温度</p>
							<div class="mbty">

								<template v-for="(item, index) in temperature">
									<span v-if="milktea_option[1] == item" class="spanstyle" @click="changeMilkteaOption(1, item)">{{
										item
									}}</span>
									<span v-else @click="changeMilkteaOption(1, item)">{{ item }}</span>
								</template>

							</div>

						</div>

						<div class="content common_it" v-show="content">
							<p>加料</p>
							<div class="mbty">

								<template v-for="(item, index) in content">
									<span v-if="milktea_option[2] == item" class="spanstyle" @click="changeMilkteaOption(2, item)">{{
										item
									}}</span>
									<span v-else @click="changeMilkteaOption(2, item)">{{ item }}</span>
								</template>

							</div>

						</div>

						<div class="other common_it" v-show="other && other_name">
							<p> {{ other_name }}</p>
							<div class="mbty">
								<template v-for="(item, index) in other">
									<span v-if="milktea_option[3] == item" class="spanstyle" @click="changeMilkteaOption(3, item)">{{
										item
									}}</span>
									<span v-else @click="changeMilkteaOption(3, item)">{{ item }}</span>
								</template>
							</div>
						</div>

					</div>
					<div class="footer">
						<button @click="submitMilkteaDIY">
							<div class="icon"></div> 加购
						</button>
						<button @click="closeDetail">取消</button>
					</div>
				</div>
			</div>
		</div>

	</div>

	<!-- 结算弹出层 -->
	<div class="opt" v-show="carinfo">
		<div class="mainbox">
			<div class="medbox">

				<div class="close" @click="closeMilkTeaCarInfo"></div>

				<div class="xbox_head">
					购物车
				</div>

				<div class="minbox">

					<template v-if="milktea_order.length == 0">

						<div class="no_item">
							<div class="n">
								这里空空如也!
							</div>
						</div>

					</template>

					<template v-else>
						<div class="car-item" v-for=" (item, index) in milktea_order">

							<div class="pic">
								<img :src="item.picurl" alt="">
							</div>

							<div class="name">
								<div class="car_name">{{ item.name }}</div>
								<div class="car_content">
									<span v-for="it in item.content" v-show="it"> （{{ it }}）</span>
								</div>
							</div>

							<div class="price">{{ (item.price * item.discount).toFixed(2) }} </div>

							<div class="modify">
								<div class="mbk">
									<div class="add" @click="carAddNum(item)"></div>
									<div class="number">{{ item.num }}</div>
									<div class="reduce" @click="carReduceNum(item)"></div>
								</div>
							</div>

						</div>
					</template>

				</div>

				<template v-if="milktea_order.length != 0">

					<template v-if="codeShow == false">
						<div class="cheapcode">
							<span @click="codeShow = !codeShow">您有优惠码？</span>
						</div>
					</template>

					<template v-else>
						<div class="cheapcode">
							优惠码: <input type="text" v-model.trim="cheapcode">
						</div>
					</template>

				</template>


			</div>

		</div>
	</div>

</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

import { getallseries } from "../utils/series/axgetseries"
import { getMilkteaCount, getDescMilkteaList, getMilkteaPriceCount, getMilkteaPriceCountWithCheapCode } from "../utils/milktee/axgetamilktea"
import { getdiyinfobyguid } from "../utils/milktee/modifymilkteadiy";
import { uploadOrderInfo } from "../utils/orderinfo/generateOrder"
import loader from "../tools/loader.vue"
import notifi from "../tools/notifi.vue"

import nstore from "../store/index"

const n_store = nstore()

let cheapcode = ref("")

let codeShow = ref(false)

let tmpGuid = ""
let time = 100

let orderID = ""

let zindex_price = ref(200)


let SavedMilkteaDIYInfo = ref([])

let detailLayer = ref(false)
let carinfo = ref(false)

let smell = ref("")
let temperature = ref("")
let content = ref("")
let other_name = ref("")
let other = ref("")
let title = ref("")

let milktea_option = ref(["", "", "", ""])
let milktea_order = ref([])

let allproducts = ref([])

let pricemap = ref([])

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

let showit = ref(false)
let msg = ref("")

let money = ref(0)

// 监听SavedMilkteaDIYInfo，并动态生成 milktea_order的数据
watch(() => SavedMilkteaDIYInfo, () => {
	let tmp = []
	SavedMilkteaDIYInfo.value.forEach(element => {
		let y = {}
		const x = element.entries().next().value
		y.guid = x[0]
		y.content = x[1]
		allproducts.value.forEach(ele => {
			if (ele.guid == x[0]) {
				y.name = ele.name
				y.picurl = ele.picurl
				y.price = ele.price
				y.discount = ele.discount
			}
		})

		tmp.push(y)
	});
	for (let a = 0; a < tmp.length; a++) {
		let c = 0
		const element = tmp[a];
		for (let b = 0; b < milktea_order.value.length; b++) {
			const ele = milktea_order.value[b];
			if (element.guid == ele.guid) {
				c = b
				break
			}
		}
		if (c != 0) {
			tmp[a].num = milktea_order.value[c].num
		} else {
			tmp[a].num = 1
		}
	}
	milktea_order.value = tmp

}, { deep: true })

// 监听milktea_order，动态显示价格
watch(() => milktea_order, () => {
	calculatePrice()
}, { deep: true })

// 在加载了所有的奶茶数据后，初始化数据 
function initMap() {
	for (let index = 0; index < allproducts.value.length; index++) {
		let tmp = {}
		tmp.guid = allproducts.value[index].guid
		tmp.price = allproducts.value[index].price
		pricemap.value.push(tmp)
	}
}

// 更新侧边栏当前的奶茶滑动状态
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

// 初始化滑动距离列表，计算每个系列的高度
function initDistanceList() {
	let selist = []
	let tmp = 0
	for (const er of mtinfo.value) {
		tmp += seriesCount.value[er]
		selist.push(tmp)
	}
	distanceList.value = selist
}

// 跳转到 系列 下的第一个产品，并改变侧边栏颜色
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

// 监听滑动距离，并同时改变侧边栏颜色
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

// 初始化页面 获取所有的系列，然后更新状态栏颜色，调用另一个初始化函数：initDistanceList()、排序后所有的的奶茶列表，调用另一个初始化函数：initMap()，以及设置页面的加载动画。
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
		}, 100);
	})
	getDescMilkteaList().then((e) => {
		allproducts.value = e
		initMap()
		setTimeout(() => {
			loading.value = false
		}, time);
	})
}

// 请求series的数据
function countOfSeries() {
	getMilkteaCount().then((e) => {
		seriesCount.value = e
	})
}

// 提交订单
function submit() {
	uploadOrderInfo(milktea_order.value).then((ouid) => {
		n_store.ouid = ouid
		setCookie("ouid",ouid)
		console.log(getCookie("ouid"));
		removeCookie("ouid")
		console.log(getCookie("ouid"));
		n_store.show_router = false

		setTimeout(()=>{
			n_store.show_router = true
		},1000)
	})

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

// 请求接口获取该奶茶可选的口味，同时显示奶茶DIY口味的界面，查询用户是否有已选择的口味
function showDetail(params, name) {
	zindex_price.value = 0
	milktea_option.value = ["", "", "", ""]

	SavedMilkteaDIYInfo.value.forEach(element => {
		if (element.has(params)) {
			milktea_option.value = element.get(params)
		}
	});

	smell.value = ""
	temperature.value = ""
	content.value = ""
	other_name.value = ""
	other.value = ""

	getdiyinfobyguid(params).then((ele) => {
		if (ele.smell != NaN && ele.smell != null && ele.smell != "") {
			smell.value = ele.smell.split(" ")
		}
		if (ele.temperature != NaN && ele.temperature != null && ele.temperature != "") {
			temperature.value = ele.temperature.split(" ")
		}
		if (ele.content != NaN && ele.content != null && ele.content != "") {
			content.value = ele.content.split(" ")
		}
		if (ele.other_name != NaN && ele.other_name != null && ele.other_name != "") {
			other_name.value = ele.other_name
		}
		if (ele.other != NaN && ele.other != null && ele.other != "") {
			other.value = ele.other.split(" ")
		}
	})
	tmpGuid = params

	title.value = name
	detailLayer.value = true
}

// 点击奶茶后，选择口味后保存用户的DIY选择
function changeMilkteaOption(index, p) {
	if (milktea_option.value[index] != "") {
		if (milktea_option.value[index] == p) {
			milktea_option.value[index] = ""
		} else {
			milktea_option.value[index] = p
		}
	} else {
		milktea_option.value[index] = p
	}
}

// 关闭奶茶DIY口味的界面
function closeDetail() {
	zindex_price.value = 200
	detailLayer.value = false
}

// 临时保存用户选择的奶茶DIY口味
function submitMilkteaDIY() {
	zindex_price.value = 200
	if (milktea_option.value[0] == "" && milktea_option.value[1] == "" && milktea_option.value[2] == "" && milktea_option.value[3] == "") {
		showit.value = true
		msg.value = "请选择以后再加入购物车"
		n_store.type = "info"
		setTimeout(() => {
			showit.value = false
		}, n_store.showtime);
		return 0
	}

	let ma = new Map();
	ma.set(tmpGuid, milktea_option.value)
	let zstatus = -1
	for (let index = 0; index < SavedMilkteaDIYInfo.value.length; index++) {
		const element = SavedMilkteaDIYInfo.value[index];
		if (element.has(tmpGuid)) {
			zstatus = index;
			break
		}
	}
	if (zstatus == -1) {
		SavedMilkteaDIYInfo.value.push(ma)
	} else {
		SavedMilkteaDIYInfo.value[zstatus] = ma
	}
	detailLayer.value = false
}

// 显示购物车中的内容
function showMilkTeaCarInfo() {
	if (cheapcode.value == "" || cheapcode.value == null) {
		codeShow.value = false
	}
	if (carinfo.value == true) {
		carinfo.value = false
	} else {
		carinfo.value = true
	}
}

// 计算价格
function calculatePrice() {
	let tmp = []
	milktea_order.value.forEach((e) => {
		let x = {}
		x.guid = e.guid
		x.number = e.num
		tmp.push(x)
	})
	
	if (cheapcode.value != "" ) {
		getMilkteaPriceCountWithCheapCode(tmp, cheapcode.value).then((e) => {
			if (e.data !== "-1") {
				money.value = e.data
			}
		})
	} else {
		getMilkteaPriceCount(tmp).then((e) => {
			if (e.data !== "-1") {
				money.value = e.data
			}
		})
	}

}

// 关闭购物车显示页面
function closeMilkTeaCarInfo() {
	carinfo.value = false
}

// 增加购物车中的奶茶数量
function carAddNum(params) {
	params.num += 1
}

// 减少购物车中奶茶数量
function carReduceNum(params) {
	if (params.num == 1) {
		let gp = []
		SavedMilkteaDIYInfo.value.forEach((e) => {
			let mp = new Map()
			const x = e.entries().next().value
			if (x[0] != params.guid) {
				mp.set(x[0], x[1])
				gp.push(mp)
			}
		})
		SavedMilkteaDIYInfo.value = gp
	} else {
		params.num -= 1
	}

}

// 设置/修改 cookies 
function setCookie(key, value) {
	document.cookie = key + "=" + value + ";"
}

// 读取cookies
function getCookie(key) {
	const cookies = document.cookie.split(";")
	for (let a = 0; a < cookies.length; a++) {
		const ele = cookies[a];
		for (let b = 0; b < ele.length; b++) {
			const elem = ele[b].split("=");
			if (elem[0] == key) {
				return elem[1]
			}
		}
	}

}

// 删除cookies
function removeCookie(key) {
	document.cookie = key + "=;max-age=0"
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
* {
	user-select: none;
}

.notify {
	position: fixed;
	top: 20px;
	right: 10px;
	width: 40%;
	min-width: 250px;
	max-width: 250px;
	height: 80px;
	z-index: 1000;

}

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
					box-shadow: -2px -2px 5px #ffffff, 2px 2px 5px #b4b4b4;
					border-radius: 10px;
					overflow: hidden;

					.inbox_mt {
						width: 100%;
						height: 100%;
						display: flex;

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
								background-color: #86b4ff;
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
								border-radius: 0 0 0 10px;
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
								min-height: 35px;
								height: auto;
								display: flex;
								align-items: center;
								justify-content: space-around;
								flex-direction: column;
								border-bottom: #c5c5c5 solid 1px;

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
										font-size: 14px;
										font-weight: lighter;
										font-family: kkt;
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
										font-size: 15px;
										display: flex;
										flex-direction: column;
										align-items: center;
										font-family: kkt;

										.ns {
											// color: #7c9feb;
											font-size: 16px;
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
						}
					}

					.inmt {
						position: relative;

						.msk_inbox {
							position: absolute;
							top: 0;
							bottom: 0;
							right: 0;
							left: 0;
							background-color: rgba(0, 0, 0, 0.25);
							backdrop-filter: blur(3px);
							-webkit-backdrop-filter: blur(3px);
							display: flex;
							align-items: center;
							justify-content: center;
							color: #fff;
							font-size: 20px;
							font-weight: bolder;
							border-radius: 10px;
						}
					}

				}
			}
		}
	}

	.price {
		z-index: v-bind(zindex_price);
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
				width: 80px;
				height: 100%;
				background: url("../assets/shoppingcar.svg");
				background-size: contain;
				background-repeat: no-repeat;
				background-position: 50% 50%;
				cursor: pointer;
				border-right: #ccc solid 1px;
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
				width: 80px;
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

			.submit:hover {
				cursor: pointer;
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
			width: 85%;
			max-width: 670px;
			height: 95%;
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
					height: 35px;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: bold;
					font-size: 19px;
				}

				.body {
					height: 100%;
					width: 100%;
					background: #eee;
					border-top-left-radius: 20px;
					border-top-right-radius: 20px;
					overflow: auto;
					flex-wrap: wrap;
					display: flex;
					flex-direction: row;

					.common_it {
						width: 100%;
						height: max-content;
						padding: 10px 0px;
						display: flex;
						flex-direction: column;
						min-width: 290px;

						p {
							margin: 5px 0 0 0;
							font-size: 16px;
							font-weight: bold;
							text-align: center;
						}

						.mbty {
							width: auto;
							height: 50px;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-evenly;
							flex-wrap: wrap;



							span {
								flex: 0 0 60px;
								height: 30px;
								display: flex;
								align-items: center;
								justify-content: center;
								padding: 3px;
								box-shadow: -2px -2px 3px #fff, 2px 2px 3px #ccc;
								border-radius: 9px;
								margin: 3px 2px;
								overflow: hidden;
								cursor: pointer;

							}

							.spanstyle {
								background-color: #111;
								color: #fff;
							}
						}
					}
				}

				.footer {
					height: 45px;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-evenly;


					button {
						width: 50%;
						height: 100%;
						font-size: 16px;
						color: #000;
						border: none;
						background-color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;

						.icon {
							display: inline-block;
							width: 45px;
							height: 45px;
							background-image: url(../assets/shoppingcar.svg);
							background-position: 50% 50%;
							background-size: cover;
							background-repeat: no-repeat;
						}
					}

					button:hover {
						background-color: #000000;
						color: #eee;
					}

					button:last-child:hover {
						background-color: #ff0000;
						color: #eee;
					}

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

.opt {
	height: 100%;
	width: 100%;
	position: fixed;
	background-color: rgba(0, 0, 0, 0.2);
	top: 0;
	z-index: 100;

	.mainbox {
		width: 100%;
		height: 100%;
		position: relative;

		.medbox {
			width: 90%;
			height: calc(100% - 85px);
			position: relative;
			top: 20px;
			margin: 0 auto;
			backdrop-filter: blur(8px);
			-webkit-backdrop-filter: blur(8px);
			background-color: #44444474;
			border-radius: 18px;


			.close {
				width: 25px;
				height: 25px;
				border-radius: 50%;
				box-shadow: 1px 1px 1px #bbb, -1px -1px 1px #fff;
				position: absolute;
				top: -5px;
				right: -5px;
				background-color: #ffffffaa;
				background-image: url(../assets/close.svg);
				background-position: 50% 50%;
				background-size: cover;
				background-repeat: no-repeat;
				cursor: pointer;
				z-index: 102;
			}

			.xbox_head {
				width: 100%;
				height: 8%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: large;
				font-weight: bold;
				color: #fff;
			}

			.minbox {
				z-index: 101;
				width: 100%;
				height: calc(92% - 50px);
				overflow: auto;
				border-radius: 18px;
				border-top: rgb(100, 100, 100) solid 2px;
				position: relative;

				.no_item {
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-image: url(../assets/noContentHere.svg);
					background-repeat: no-repeat;
					background-position: 50% 50%;
					background-size: contain;
					background-attachment: fixed;
					color: #eee;
					font-size: 25px;
					font-family: kkt;
					font-weight: bolder;
					position: relative;

					.n {
						position: absolute;
						bottom: 0px;

					}
				}

				.car-item {
					width: 98%;
					height: 100px;
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					flex-direction: row;
					justify-content: space-evenly;
					color: #fff;
					border-bottom: solid 1px wheat;
					margin: 0 auto;



					.pic {
						width: auto;
						height: 100%;
						overflow: hidden;

						img {
							height: 100%;
							max-width: 60px;
							object-fit: cover;

						}
					}

					.name {
						width: 45%;
						height: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-evenly;

						.car_name {
							width: 100%;
							height: auto;
							font-size: 17px;
							font-weight: bold;
						}

						.car_content {
							width: 100%;
							height: auto;
							font-size: 14px;
							font-weight: lighter;
							color: #ddd;
						}

					}

					.price {
						width: 10%;
						height: auto;
						display: flex;
						align-items: center;
						justify-content: center;
						font-weight: bold;
						font-size: 18px;
					}

					.price::after {
						content: "￥";
					}

					.modify {
						width: 40%;
						max-width: 300px;
						height: auto;

						.mbk {
							width: 100%;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: space-evenly;

							.add {
								width: 30px;
								height: 30px;
								background-image: url(../assets/plus.svg);
								background-size: cover;
								border-radius: 50%;
								background-color: #aaa;
								background-position: 50% 50%;
								cursor: pointer;
							}

							.add:hover {
								outline: rgb(253, 253, 253) solid 2px;
							}

							.reduce:hover {
								outline: rgb(253, 253, 253) solid 2px;
							}

							.number {
								font-weight: bold;
							}


							.reduce {
								width: 30px;
								height: 30px;
								background-image: url(../assets/minus.svg);
								background-size: cover;
								border-radius: 50%;
								background-color: #aaa;
								background-position: 50% 50%;
								cursor: pointer;
							}
						}
					}
				}

				.car-item:last-child {
					border-bottom: none;
				}
			}

			.cheapcode {
				position: absolute;
				width: 100%;
				height: 50px;
				border-bottom-left-radius: 18px;
				border-bottom-right-radius: 18px;
				bottom: 0px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #eee;
				font-weight: bold;

				span {
					color: #fff;
					font-weight: normal;
					cursor: pointer;
					text-decoration: underline #444;
				}

				input {
					text-align: center;
					height: 30px;
					width: auto;
					margin-left: 3px;
					border: none;
					border-radius: 7px;
					padding: 0;
					padding: 0 5px;
					font-weight: bold;
					font-size: 15px;
					color: goldenrod;
					backdrop-filter: blur(1px);
					-webkit-backdrop-filter: blur(1px);
					background-color: rgba(255, 255, 255, 0.07);
				}

				input:focus {
					box-shadow: 1px 1px 2px #aaa, -1px -1px 2px #aaa;
					outline-width: 0px;
				}
			}
		}
	}

}
</style>