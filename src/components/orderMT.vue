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
				<template v-for="(mt, index) in mtinfo">
					<div :class="barColorStyle[index]" @click="gotodetail(index)">
						<span class="det"> {{ mt }} </span>
					</div>
				</template>
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
				<div class="cny">
					<div>结算总金额: <span class="span">{{ cny }} </span>¥</div>
				</div>
				<div class="submit" @click="submit">结算</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import axios from 'axios';
import { onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue';

let stgrp = ref(["mst first-one", "mst second", "mst third", "mst fouth"])

let mtinfo = ref([
	"套餐推荐",
	"最低折扣",
	"甜点美食",
	"mosaic下午茶",
	"Florentia milk coffee",
	"奶茶盲盒"
])

let masu = ref([
	{ "name": "手剥葡萄", "picurl": "http://192.168.1.7:8111/imgs/kwk/kwk1.png", "intro": "非常的好喝!QQ乜乜好喝到爆咩噗茶", "topic": "新品" },
	{ "name": "爽口雪梨", "picurl": "http://192.168.1.7:8111/imgs/kwk/kwk2.png", "intro": "非常的好喝!QQ乜乜好喝到爆咩噗茶", "topic": "新品" },
	{ "name": "冰雪荔枝", "picurl": "http://192.168.1.7:8111/imgs/kwk/kwk3.png", "intro": "非常的好喝!QQ乜乜好喝到爆咩噗茶", "topic": "新品" },
	{ "name": "菠萝吹雪", "picurl": "http://192.168.1.7:8111/imgs/kwk/kwk4.png", "intro": "非常的好喝!QQ乜乜好喝到爆咩噗茶", "topic": "最热" }
])

let allproducts = ref([])

let orderinfo = reactive(new Map())

let nowidth = ref("100%")

let noml = ref("25%")

let cny = ref(0)

let barColorStyle = ref([])

function makemap() {
	for (let index = 0; index < allproducts.value.length; index++) {
		orderinfo.set(allproducts.value[index], 0)
	}
}

function gotodetail(e) {
	for (let index = 0; index < barColorStyle.value.length; index++) {
		barColorStyle.value[index] = "sidebar"
	}
	barColorStyle.value[e] = "sidebar bar_active"
	// 跳转到指定地方,目前的打算是,在json里面添加type int类型,然后判断每个类型有多少个,因为每个item的高度固定,只需要用 {滑动固定长度 * 数量} 就可以实现滚动了
	barColorStyle.forEach(ele => {
		console.log(ele.toString());
	});
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
	for (let index = 0; index < mtinfo.value.length; index++) {
		barColorStyle.value.push("sidebar")
	}
})

onMounted(() => {
	window.addEventListener('resize', () => itwid())
	itwid()
})

onUnmounted(() => {
	window.removeEventListener('resize', () => itwid())
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
	alert("支付成功")
	console.log(orderinfo);
	cny.value = 0
	makemap()
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
		// border-bottom: #444 solid 1px;
		padding: 10px 0 10px 0;

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
		height: 85%;
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
			padding-top: 10px;
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

			// .sidebar:hover {
			// 	// background: linear-gradient(to right, #e6e0ff, #ffd9cf);
			// 	background: linear-gradient(to right, #363d46, #374244);
			// 	color: #fff;
			// }

			.bar_active {
				// background: linear-gradient(to right, #363d46, #374244);
				background: #363d46;
				color: #fff;
				font-family: kkt;
				font-weight: bold;
			}
		}

		.marea {
			height: 100%;
			width: v-bind(nowidth);
			margin-left: v-bind(noml);
			display: flex;
			justify-content: center;
			padding-top: 10px;
			

			::-webkit-scrollbar {
				display: none;
				// opacity: 1;
			}

			.detail {
				width: 95%;
				height: 100%;
				scrollbar-width: none; //firefox 不显示滚动块
				overflow: auto;
				padding: 0 5px 0 5px;
				

				div.milktea:last-child {
					margin-bottom: 80px;
				}

				.milktea {
					width: 100%;
					height: 100%;
					max-height: 120px;
					margin-top: 5px;
					margin-bottom: 15px;
					display: flex;
					box-shadow: -2px -2px 5px #ffffff, 2px 2px 5px #b4b4b4;
					border-radius: 7px;
					overflow: hidden;

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
							object-fit: cover;
						}

						.sp1 {
							position: absolute;
							padding: 5px;
							top: 10px;
							left: 70%;
							writing-mode: vertical-lr;
							white-space: nowrap;
							background-color: #8400ff;
							border-radius: 100%;
							font-size: smaller;
							font-family: kkt;
							color: white;
						}

						.sp2 {
							width: 30px;
							height: 30px;
							text-align: center;
							position: absolute;
							top: 10px;
							left: 0%;
							background-color: #000;
							border-radius: 50%;
							font-size: large;
							font-family: kkt;
							color: #eee;
							display: flex;
							justify-content: center;
							align-items: center;
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