<template>
	<div class="diy">
		<div class="diy_outbox">

			<div class="card">
				<div class="card_box">
					<div class="card_item" v-for=" item in main_milktlist" :key="item.guid">
						<img :src="item.picurl">

						<div class="info">
							<span>{{ item.name }}</span>
							<span>{{ (item.price * item.discount).toFixed(2) }}</span>
						</div>

						<div class="butt">
							<button @click="modifythis(item.guid)">修改</button>
							<button>默认</button>
						</div>

					</div>
				</div>
			</div>

		</div>
	</div>

	<loader v-show.lazy="loading"></loader>

	<div class="mask" v-show="mask">

		<div class="flo">
			<notifi v-show="shownoti">{{ msg }}</notifi>
		</div>

		<div class="cor">
			<div class="mask_main">
				<div class="mask_card comm">

					<div class="mask_card_item">
						<div class="smell it-c">
							<h2>味道</h2>
							<input placeholder="例如：七分甜 五分甜" @focusout="updateDate(0)" @keyup="updateDate(0)" v-model="diyParams[0]">
						</div>
						<div class="temperature it-c">
							<h2>温度</h2>
							<input placeholder="例如：常温 冰镇 去冰" @focusout="updateDate(1)" @keyup="updateDate(1)" v-model="diyParams[1]">
						</div>
						<div class="content it-c">
							<h2>加料</h2>
							<input placeholder="例如：加芋泥 加葡萄" @focusout="updateDate(2)" @keyup="updateDate(2)" v-model="diyParams[2]">
						</div>

						<div class="other it-c">
							<h2>其他</h2>
							<input placeholder="例如：风味" v-model="diyParams[3]">
							<input placeholder="例如： Florence Москва" @focusout="updateDate(4)" @keyup="updateDate(4)"
								v-model="diyParams[4]">
						</div>

						<span class="note">备注：内容用空格隔开，为空就不显示</span>

					</div>

					<div class="mask_card_button">
						<button @click="setDefault">默认设置</button>
						<button @click="commitModify">提交</button>
						<button @click="cancel">取消</button>
					</div>

				</div>

				<div class="mask_preview comm">
					<div class="maskbox">
						<div class="head">
							<h2>Preview</h2>
						</div>
						<div class="body">
							<div class="container">

								<div class="comment" v-show="diyParams[0]">
									<div class="title">
										<h2>味道</h2>
									</div>
									<div class="content">
										<span v-for="it in diyParamsList[0]">{{ it }}</span>
									</div>
								</div>

								<div class="comment" v-show="diyParams[1]">
									<div class="title">
										<h2>温度</h2>
									</div>
									<div class="content">
										<span v-for="it in diyParamsList[1]">{{ it }} </span>
									</div>
								</div>

								<div class="comment" v-show="diyParams[2]">
									<div class="title">
										<h2>加料</h2>
									</div>
									<div class="content">
										<span v-for="it in diyParamsList[2]">{{ it }}</span>
									</div>
								</div>

								<div class="comment" v-show="diyParams[3] || diyParams[4]">
									<div class="title">
										<h2>{{ diyParams[3] }}</h2>
									</div>
									<div class="content">
										<span v-for="it in diyParamsList[3]">{{ it }}</span>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>

			</div>
		</div>

	</div>


</template>

<script setup>
import { onMounted, provide, ref } from "vue";
import { getDescMilkteaList } from "../utils/milktee/axgetamilktea"
import { modifymilkteadiy, getdiyinfobyguid } from "../utils/milktee/modifymilkteadiy";
import notifi from "../tools/notifi.vue";
import loader from "../tools/loader.vue"
import nstore from "../store/index"

const n_store = nstore();
let loading = ref (true)
let main_milktlist = ref([])
let mask = ref(false)
let guid = ""
let diyParams = ref([])
let diyParamsList = ref([[], [], [], []])


let shownoti = ref(false)
let msg = ref("")


function modifythis(e) {
	guid = e
	mask.value = true
	getdiyinfobyguid(guid).then((e) => {
		if (e != null || e != NaN) {
			diyParams.value[0] = e.smell
			diyParams.value[1] = e.temperature
			diyParams.value[2] = e.content
			diyParams.value[3] = e.other_name
			diyParams.value[4] = e.other
			updateDate(0)
			updateDate(1)
			updateDate(2)
			updateDate(4)
		}

	})
}

function commitModify() {
	let tmp = { "guid": guid, "smell": diyParams.value[0], "temperature": diyParams.value[1], "content": diyParams.value[2] }
	if (diyParams.value[3] != null && diyParams.value[3] != "" && diyParams.value[4] != null && diyParams.value[4] != "") {
		tmp.other_name = diyParams.value[3]
		tmp.other = diyParams.value[4]
	} else {
		tmp.other_name = ""
		tmp.other = ""
	}
	modifymilkteadiy(tmp).then((e) => {
		if (e != "error") {
			n_store.type = "success"
			msg.value = "提交成功！"
			shownoti.value = true
			setTimeout(() => {
				shownoti.value = false
			},  n_store.showtime);
		} else {
			n_store.type = "error"
			msg.value = "提交失败！"
			shownoti.value = true
			setTimeout(() => {
				shownoti.value = false
			}, n_store.showtime);
		}
		
	})

}

function updateDate(e) {
	switch (e) {
		case 0:
			diyParamsList.value[0] = diyParams.value[0].split(' ')
			break;
		case 1:
			diyParamsList.value[1] = diyParams.value[1].split(' ')
			break
		case 2:
			diyParamsList.value[2] = diyParams.value[2].split(' ')
			break
		case 4:
			diyParamsList.value[3] = diyParams.value[4].split(' ')
			break
	}
}

function setDefault() {
	let smell = "七分甜 五分甜 三分甜 不甜"
	let temperature = "加热 常温 冰镇"
	let food = "椰果 珍珠 西柚 芋泥 米麻薯 冰粉 晶球"
	diyParams.value[0] = smell
	diyParams.value[1] = temperature
	diyParams.value[2] = food
	updateDate(0)
	updateDate(1)
	updateDate(2)
}

function cancel() {
	mask.value = false
}

onMounted(() => {
	getDescMilkteaList().then((e) => {
		if (e!="error") {
			main_milktlist.value = e
			setTimeout(() => {
				loading.value = false
			}, n_store.loader_show_time);
		}
		
	})
})
</script>

<style lang="scss" scoped>
.diy {
	width: 100%;
	height: 100%;
	color: #111;
	z-index: 0;

	.diy_outbox {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: auto;
		clear: both;

		.card {
			width: 90%;
			min-height: 95%;
			height: 95%;
			padding: 5px 0;


			.card_box {
				width: auto;
				height: auto;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				padding-bottom: 2.5%;


				.card_item {
					height: auto;
					min-height: 150px;
					width: 45%;
					background-color: #fff;
					margin: 4px 5px;
					border-radius: 8px;
					overflow: hidden;
					position: relative;
					box-shadow: 2px 2px 3px #ddd, -2px -2px 3px #eee;

					.info {
						width: 40%;
						min-width: 70px;
						height: 100%;
						display: flex;
						justify-content: space-evenly;
						align-items: center;
						flex-direction: column;
						backdrop-filter: blur(10px);
						-webkit-backdrop-filter: blur(10px);
						border-top-left-radius: 8px;
						border-bottom-left-radius: 8px;

						span {
							width: 80%;
						}

						span:last-child::after {
							content: "￥";
						}
					}

					img {
						position: absolute;
						left: 50%;
						top: 50%;
						margin-top: -65px;
						margin-left: -37.5px;
						height: 130px;
						width: 75px;
						object-fit: cover;

						z-index: 0;
					}

					.butt {
						width: 40%;
						height: 100%;
						position: absolute;
						top: 0;
						right: 0;
						display: flex;
						align-items: center;
						justify-content: space-evenly;
						flex-direction: column;

						button {
							width: 70px;
							height: 35px;
							border-radius: 15px;
							border: none;
							background-color: rgba(255, 255, 255, 0);
							backdrop-filter: blur(10px);
							-webkit-backdrop-filter: blur(10px);
							box-shadow: 2px 2px 3px #ccc, -2px -2px 3px #eee;
							color: #444;
							font-weight: bold;
							cursor: pointer;
							margin-right: 3px;

						}

						:hover {
							background: #582aee;
							color: #fff;
						}

					}
				}
			}
		}
	}
}

.mask {
	z-index: 100;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	backdrop-filter: blur(15px);
	-webkit-backdrop-filter: blur(15px);
	background: #4444446f;


	.flo {
		position: absolute;
		top: 20px;
		right: 0;
		width: 40%;
		min-width: 150px;
		max-width: 400px;
		height: 80px;


	}

	.cor {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.mask_main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-evenly;
		overflow: auto;

		.comm {
			height: 90%;
			min-width: 350px;
			margin: 5px 15px;
			display: flex;
			flex-direction: column;
			border-radius: 17px;

		}

		.mask_card {
			background-color: #eee;
			width: 60%;

			.mask_card_item {
				width: 100%;
				height: 80%;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				flex-direction: column;

				.it-c {
					width: 80%;
					height: 30%;
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					flex-direction: column;
				}

				// .smell {}
				// .content {}
				// .temperature {}
				.other {
					display: flex;
					flex-direction: column;

					input {
						margin-top: 2px;
					}
				}

				.note {
					margin-top: 10px;
					font-size: small;
					color: rgb(186, 186, 186);
				}

				h2 {
					margin: 0;
				}

				::placeholder {
					color: #bbb;
				}

				input {
					// width: 200px;
					width: 80%;
					height: 25px;
					line-height: 25px;
					border-color: #dbdbdb;
					border-radius: 9px;
					padding-left: 15px;
					border-color: rgba(0, 0, 0, 0);
					// font-weight: bold;
				}

				input:focus {
					border-color: #582aee;
					outline: none;
				}

				input:focus::placeholder {
					color: #777;
				}
			}


			.mask_card_button {
				width: 100%;
				height: 20%;
				display: flex;
				align-items: center;
				justify-content: space-evenly;

				button {
					height: 40px;
					width: 30%;
					border-radius: 8px;
					border: none;
					background: #ddd;
					color: #111;
					font-size: 15px;
				}

				button:hover:hover {
					background: #582aee;
					color: #fff;
				}
			}
		}

		.mask_preview {
			background-color: #eee;
			user-select: none;
			width: 30%;

			.maskbox {
				width: 100%;
				height: 100%;
				user-select: none;
				display: flex;
				flex-direction: column;
				align-items: center;


				h2 {
					margin: 0;
				}

				.head {
					width: 100%;
					height: 5%;
					margin: 10px 0;

					h2 {
						text-align: center;
					}
				}

				.body {
					width: 90%;
					height: 90%;
					border-radius: 8px;
					box-shadow: 2px 2px 3px #ccc, -2px -2px 3px #fff;


					.container {
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-evenly;

						.comment {
							width: 80%;
							height: 20%;
							display: flex;
							flex-direction: column;

							.title {
								h2 {
									text-align: center;
								}
							}

							.content {
								width: 100%;
								height: 100%;
								display: flex;
								justify-content: space-evenly;
								margin-top: 5px;

								span {
									width: 80px;
									height: 40px;
									margin: 0 2px;
									display: inline-flex;
									border-radius: 7px;
									color: #222;
									align-items: center;
									justify-content: center;
									padding: 2px;
									cursor: pointer;
									box-shadow: 2px 2px 3px #bbb, -2px -2px 3px #fff;
								}

								span:hover {
									background: #582aee;
									color: #fff;
								}
							}
						}
					}
				}
			}
		}
	}

}
</style>