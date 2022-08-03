<template>
	<div class="oops">
		<div class="first">

			<div class="topbar">
				<div class="left com" @click="toleft"></div>

				<div class="center">
					<template v-for="(ms, index) in masu" :index=index>

						<div class="managersuggest first-one" v-if="index == 0" v-show="index <= 2">
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

						<div class="managersuggest second toleft" v-else-if="index == 1" v-show="index <= 2">
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

						<div class="managersuggest third" v-else v-show="index <= 2">
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

				</div>
			</div>

		</div>

	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

let index = ref(0)
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
	{ "name": "手剥葡萄", "picurl": "http://192.168.31.100:8111/imgs/kwk/kwk7.png", "intro": "非常的牛逼!非常的好喝!QQ乜乜好喝到爆咩噗茶", "topic": "新品" },
	{ "name": "牛逼哄哄", "picurl": "http://192.168.31.100:8111/imgs/kwk/kwk9.png", "intro": "非常的牛逼!非常的好喝!QQ乜乜好喝到爆咩噗茶", "topic": "新品" },
	{ "name": "咄咄逼人", "picurl": "http://192.168.31.100:8111/imgs/kwk/kwk18.png", "intro": "非常的牛逼!非常的好喝!QQ乜乜好喝到爆咩噗茶", "topic": "新品" },
	{ "name": "马可菠萝", "picurl": "http://192.168.31.100:8111/imgs/kwk/kwk13.png", "intro": "非常的牛逼!非常的好喝!QQ乜乜好喝到爆咩噗茶", "topic": "最热" }
])

let orderinfo = ref([])//名称,数量,温度,甜度,堂食?外带

let itstyle = ref("sidebar")

onMounted(() => {

})

function toleft() {
	let tmp = []

	tmp[0] = masu.value[masu.value.length - 1]
	for (let index = 1; index < masu.value.length; index++) {
		tmp[index] = masu.value[index - 1]
		console.log(index, tmp, masu.value[index - 1]);
	}

	console.log(tmp);

	masu.value = tmp
}

function toright() {
	let tmp = []
	for (let index = 1; index <= masu.value.length; index++) {
		tmp[index - 1] = masu.value[index]
	}
	tmp[masu.value.length - 1] = masu.value[0]
	masu.value = tmp
}

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
	flex-direction: column;
	user-select: none;

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
				width: 10%;
				min-width: 30px;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				background-position: 50% 50%;
				background-repeat: no-repeat;
				background-size: contain;
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
				justify-content: center;
				position: relative;

				.first-one {
					z-index: 0;
					height: 80%;
					width: 30%;
					margin-right: -1%;
				}

				.second {
					z-index: 1;
					width: 40%;
					height: 100%;
				}

				.third {
					z-index: 0;
					height: 80%;
					width: 30%;
					margin-left: -1%;
				}

				.managersuggest {
					background-color: rgba(173, 173, 173, 0.95);
					border-radius: 7px;

					.box {
						width: 100%;
						height: 100%;
						overflow: hidden;
						display: flex;

						.pic {
							width: 40%;
							height: 100%;
							position: relative;

							img {
								width: 100%;
								height: 100%;
								min-width: 60px;
								min-height: 100px;
								object-fit: contain;
							}

							span {
								position: absolute;
								padding: 5px;
								top: 10px;
								left: 60%;
								writing-mode: vertical-lr;
								background-color: #fa5e2e;
								border-radius: 50%;
								font-size: smaller;
								font-family: kkt;
							}
						}

						.info {
							width: 60%;
							padding: 3px;

							.name {
								font-size: large;
								font-weight: 800;
							}

							.intro {}
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
			position: fixed;

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
			height: 100%;

			.detail {
				width: 100%;
			}
		}
	}
}

.toleft {
	animation-name: iphx;
	animation-duration: 2s;
	animation-iteration-count: infinite;
	animation-direction: alternate;
}

@keyframes iphx {
	from {
		z-index: 1;
		position: absolute;
		height: 100%;
		width: 35%;
		position: absolute;
		left: 30%;
	}

	50% {
		z-index: 0;
		position: absolute;
		height: 90%;
		width: 35%;
		position: absolute;
		left: 15%;
	}

	to {
		z-index: -1;
		position: absolute;
		left: 0;
		height: 80%;
		width: 30%;
	}
}
</style>