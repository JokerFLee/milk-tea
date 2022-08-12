<template>
	<div class="oops">
		<div class="first">

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

			<div class="sidearea">
				<div class="sidebar" v-for="mt in mtinfo">
					<span class="det"> {{ mt }} </span>
				</div>
			</div>

			<div class="marea">
				<div class="detail">
					<div class="milktea" v-for="mk in allproducts">
						<div class="pic">
							<img :src="mk.picurl">
							<span class="sp1" v-show="mk.topic != 'null'">{{ mk.topic }}</span>
							<span class="sp2">{{ mk.price }}</span>
						</div>
						<div class="intro">
							<h3>{{ mk.name }}</h3>
							<span> {{ mk.intro }}</span>
						</div>
						<div class="option">
							<div class="oks plus" @click="add2car(mk)">+</div>
							<div class="oks num">{{ orderinfo.get(mk) }}</div>
							<div class="oks reduce" @click="changeinfo(mk)">-</div>
						</div>
					</div>
				</div>
			</div>

		</div>

		<div class="price">
			<div class="tw">
				<div class="car"></div>
				<div class="cny">结算总金额: <span>{{ cny }} </span>¥</div>
				<div class="submit">支付</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import axios from 'axios';
import { onBeforeMount, onMounted, reactive, ref } from 'vue';

let stgrp = ref(["mst first-one", "mst second", "mst third", "mst fouth"])

let mtinfo = ref([
	"套餐推荐",
	"最低折扣",
	"甜点美食",
	"mosaic下午茶",
	"Florentia milk coffee",
	"低热绿色饮品",
	"奶茶盲盒"
])

let masu = ref([
	{ "name": "手剥葡萄", "picurl": "http://192.168.31.100:8111/imgs/kwk/kwk1.png", "intro": "非常的好喝!QQ乜乜好喝到爆咩噗茶", "topic": "新品" },
	{ "name": "爽口雪梨", "picurl": "http://192.168.31.100:8111/imgs/kwk/kwk2.png", "intro": "非常的好喝!QQ乜乜好喝到爆咩噗茶", "topic": "新品" },
	{ "name": "冰雪荔枝", "picurl": "http://192.168.31.100:8111/imgs/kwk/kwk3.png", "intro": "非常的好喝!QQ乜乜好喝到爆咩噗茶", "topic": "新品" },
	{ "name": "菠萝吹雪", "picurl": "http://192.168.31.100:8111/imgs/kwk/kwk4.png", "intro": "非常的好喝!QQ乜乜好喝到爆咩噗茶", "topic": "最热" }
])

let allproducts = ref([])

let orderinfo = reactive(new Map())//名称,数量,温度,甜度,堂食?外带

let nowidth = ref("100%")

let noml = ref("25%")

let cny = ref(0)

function makemap() {
	for (let index = 0; index < allproducts.value.length; index++) {
		orderinfo.set(allproducts.value[index], 0)
	}
}

function req(url, method) {
	const ax = axios({
		url: url,
		method: method,
		params: {
			pk: "233",
			sk: "yc9cbxyo7cs9ca6"
		}
	}).then(res => {
		return res.data
	})
	return ax
}
function packreq() {
	let url = "src/assets/test.json";
	let method = "get"
	req(url, method).then((e) => {
		allproducts.value = e.jsp[4];
		makemap()
	})
}

onBeforeMount(() => {
	packreq()
})
onMounted(() => {

	window.addEventListener('resize', () => itwid())

	itwid()
})

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

function add2car(e) {
	orderinfo.set(e, orderinfo.get(e) + 1)
	cny.value = cny.value + e.price
}

function changeinfo(e) {
	if (orderinfo.get(e) > 0) {
		orderinfo.set(e, orderinfo.get(e) - 1)
		cny.value = cny.value - e.price
	}
}

function submit(e) {

}

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
		border-bottom: #444 solid 1px;
		padding: 10px 0 10px 0;

		.topbar {
			width: 100%;
			height: 100%;
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
				overflow: hidden;

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
					background: #2aaaffe8;
					border-radius: 7px;
					color: #fff;

					.box {
						width: 100%;
						height: 100%;
						overflow: hidden;
						display: flex;

						.pic {
							width: 30%;
							height: 100%;
							position: relative;

							img {
								width: 100%;
								height: 100%;
								min-width: 50px;
								object-fit: contain;
							}

							span {
								position: absolute;
								padding: 5px;
								top: 10px;
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

							.name {
								font-size: large;
								font-weight: 800;
							}

							.intro {
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								overflow: hidden;
								text-overflow: ellipsis;
							}
						}
					}
				}
			}
		}
	}

	.last {
		width: 100%;
		height: 85%;
		position: relative;
		display: flex;

		.sidearea {
			height: 100%;
			width: 25%;
			max-width: 200px;
			min-width: 125px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
			overflow-y: auto;
			padding-top: 10px;
			position: absolute;

			.sidebar:hover {
				background: linear-gradient(to right, #fff1b8, #ffb6b6);
				color: #444;
				cursor: pointer;
			}

			.sidebar {
				width: 90%;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: linear-gradient(to left, #5896e7, #0ecfff);
				margin-top: 5px;
				border-radius: 7px;
				color: #ececec;

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
			height: 100%;
			width: v-bind(nowidth);
			margin-left: v-bind(noml);
			display: flex;
			justify-content: center;
			padding-top: 10px;
			padding-bottom: 200px;

			::-webkit-scrollbar {
				display: none;
				//chrome edge 不显示滚动块
			}

			.detail {
				width: 95%;
				height: 90%;
				scrollbar-width: none; //firefox 不显示滚动块
				overflow: auto;


				.milktea {
					width: 100%;
					height: 100%;
					max-height: 100px;
					margin-top: 5px;
					margin-bottom: 10px;
					display: flex;
					background: #fff;
					border-radius: 7px;

					.pic {
						width: 110px;
						height: 100%;
						display: flex;
						flex-direction: column;
						flex-wrap: wrap;
						position: relative;

						img {
							width: 100%;
							height: 100%;
							object-fit: contain;
						}

						.sp1 {
							position: absolute;
							padding: 5px;
							top: 10px;
							left: 60%;
							writing-mode: vertical-lr;
							white-space: nowrap;
							background-color: #8400ff;
							border-radius: 100%;
							font-size: smaller;
							font-family: kkt;
							color: white;
						}

						.sp2 {
							width: 25px;
							height: 25px;
							text-align: center;
							position: absolute;
							top: 10px;
							left: 3%;
							background-color: #000;
							border-radius: 50%;
							font-weight: bold;
							font-family: kkt;
							color: #fff;
							display: flex;
							justify-content: center;
							align-items: center;
						}

						.sp2::after {
							content: "$"
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
						}

						span {
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							overflow: hidden;
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
			display: flex;
			justify-content: center;
			position: relative;
			background-color: #111;
			border-radius: 22px;
			z-index: 0;
			


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
				display: flex;
				justify-content: center;
				align-items: center;
				color: #eee;

				span {
					color: rgb(255, 166, 0);
					font-weight: bolder;
					font-size: larger;
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
				border-bottom-right-radius: 20px;
				border-top-right-radius: 20px;
				background-color: #fff;
				color: #000;
				font-weight: bolder;
				font-size: large;
				border: #fff solid 1px;
				z-index: 10;
			}
		}

	}
}

.c2l {
	animation-name: c2l;
	animation-duration: 0.8s;
	animation-fill-mode: forwards;
}

.c2r {
	animation-name: c2r;
	animation-duration: 0.8s;
	animation-fill-mode: forwards;
}

.l2c {
	animation-name: l2c;
	animation-duration: 0.8s;
	animation-fill-mode: forwards;
}

.r2c {
	animation-name: r2c;
	animation-duration: 0.8s;
	animation-fill-mode: forwards;
}

.l2n {
	animation-name: l2n;
	animation-duration: 0.8s;
	animation-fill-mode: forwards;
}

.n2r {
	animation-name: n2r;
	animation-duration: 0.8s;
	animation-fill-mode: forwards;
}

.r2n {
	animation-name: r2n;
	animation-duration: 0.8s;
	animation-fill-mode: forwards;
}

.n2l {
	animation-name: n2l;
	animation-duration: 0.8s;
	animation-fill-mode: forwards;
}

@keyframes l2n {

	50% {
		height: 40%;
		width: 15%;
		left: -7.5%;
		opacity: 0.5;
		margin-left: 0;
	}

	to {
		width: 0;
		height: 0;
		left: 0;
		opacity: 0;
		margin-left: 0;
	}
}

@keyframes l2c {
	50% {
		z-index: -1;
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
		z-index: -1;
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
		z-index: -1;
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
		z-index: -1;
		height: 0%;
		width: 0%;
		left: 100%;
		margin-left: 0;
		opacity: 0;
	}
}

//left center right null
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
		z-index: -1;
	}

	to {
		height: 80%;
		width: 30%;
		z-index: -1;
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
		left: -15%;
		z-index: -1;
		opacity: 0;
	}


	to {
		height: 80%;
		width: 30%;
		z-index: -1;
		left: 0%;
		margin-left: 1%;
		opacity: 1;
	}
}
</style>