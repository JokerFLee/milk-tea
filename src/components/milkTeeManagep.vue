<template>
	<div class="sabox">
		<div class="op">
			<div class="kwk" @scroll="itscroll">

				<div class="jp">
					<div class="head">
						<div class="head_common">名称</div>
						<div class="head_common">原价</div>
						<div class="head_common">现价</div>
						<div class="head_common">折扣</div>
						<div class="head_common">售罄</div>
						<div class="head_common">图片</div>
						<div class="head_common">管理</div>
					</div>
				</div>

				<div class="tw">
					<div class="body" v-for="item in sdata" :value=insideKey>
						<div class="item_son">
							<div class="b_common"><span>{{ item.name }}</span></div>
							<div class="b_common">{{ item.price }}</div>
							<div class="b_common">{{ (item.price * item.discount).toFixed(2) }}</div>
							<div class="b_common">{{ item.discount }}</div>
							<div class="b_common" style="color: red;" v-if="item.soldout == 1">
								是
							</div>
							<div class="b_common" v-else>
								否
							</div>
							<div class="b_common"><img :src="item.picurl"></div>
							<div class="b_common b_manage">
								<div class="option1 opt_comm" @click="teadit(item)">修改</div>
								<div class="option2 opt_comm" @click="deleteMilkteaByGuid(item.guid)">删除</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mask" v-show="mask_state">
			<div class="real_mask">
			</div>

			<div class="mask_cont">

				<div class="main_input">

					<div class="ssbox">
						<span>名称:</span> <label><input type="text" :value="itemdt.name"></label>
					</div>

					<div class="ssbox">
						<span>价格:</span> <label><input type="number" v-model="itemdt.price"></label>
					</div>

					<div class="ssbox">
						<span>折扣:</span> <label><input min="0" max="1" step="0.01" type="number" v-model="itemdt.discount"></label>
					</div>

					<div class="ssbox">
						<span>现价:</span> <label><input :value="now_price" disabled style="cursor: no-drop;"></label>
					</div>

					<div class="ssbox">
						<span>介绍:</span> <label><input :value="itemdt.intro"></label>
					</div>

					<div class="ssbox">
						<span>售罄:</span>
						<label>
							<select v-model="itemdt.soldout" single>
								<option v-for="item in soldoutlist" :value="item.value">{{ item.x }}</option>
							</select></label>
					</div>

					<div class="ssbox">
						<span>图片:</span>
						<div> <input type="file" accept="image/jpg,image/JPG,image/jpeg,image/JPEG,image/png,image/PNG,image/gif"
								single @change="changepic"> <img :src="itemdt.picurl"> </div>
					</div>

				</div>

				<div class="btn">
					<button id="bt1" @click="disableMask(true)">提交</button>
					<button id="bt2" @click="disableMask(false)">取消</button>
				</div>
			</div>

		</div>

	</div>
</template>

<script setup>
import { getmilktealist, getMilkteaByGyid } from "../utils/milktee/axgetamilktea"
import updateMilkteaByGyid from "../utils/milktee/axupdatemilktealist.js"
import uploadpic from "../utils/milktee/uploadpic"
import delmilkteabyguid from "../utils/milktee/axdeletemilktea"
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue';

let mask_state = ref(false)
let blurSta = ref("0px")
let insideKey = ref(0)

let sdata = ref()//用来存储初始化的milktea list数据
let itemdt = ref("") //用来存储点击edit以后的数据

let soldoutlist = ref([{ x: "是", value: 1 }, { x: "否", value: 0 }])

let now_price = computed(() => (itemdt.value.price * itemdt.value.discount).toFixed(2))

watch(
	() => itemdt.value.discount,
	(now, pre) => {
		if (now > 1 || now < 0) {
			alert("数值只能在0-1之间取值")
		}
	},
	{ deep: true, immediate: false }
)
// 初始化sdata
function getallmilktea() {
	getmilktealist().then((e) => {
		sdata.value = e
	})
}

function itscroll(e) {
	// window.setTimeout(,3000)
}

onBeforeMount(() => {
	getallmilktea()
})

// 编辑执行的操作。
function teadit(e) {
	mask_state.value = true
	blurSta.value = "5px"
	getMilkteaByGyid(e.guid).then((result) => {
		itemdt.value = result
		console.log(result);
	})
}

//修改图片执行的操作。
function changepic(args) {
	let file = args.target.files[0]
	uploadpic(file).then((e) => {
		if (e.result != "error") {
			console.log(e);
			itemdt.value.picurl = e.url
		} else {
			alert("上传图片失败！请稍后重试。")
		}
	})

}

// 判断点击的确定还是取消，然后执行相应的操作。
function disableMask(e) {
	mask_state.value = false
	blurSta.value = "0px"
	if (e) {
		updateMilkteaByGyid(itemdt.value).then((result) => {
			if (result != "error") {
				getallmilktea()
			} else {
				alert("修改失败！")
			}

		})
	}
	itemdt.value = ""
}

// 删除milktea
function deleteMilkteaByGuid(params) {
	delmilkteabyguid(params).then((e) => {
		console.log(e);
		getallmilktea()
	})


}




</script>

<style lang="scss" scoped>
.sabox {
	width: 100%;
	height: 100%;
	position: relative;

	.op {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;
		filter: blur(v-bind(blurSta));
		position: relative;

		::-webkit-scrollbar {
			display: block;
			width: 8px;
			background: #bbb;
		}
		::-webkit-scrollbar-thumb{
			background:  #808080;
			border-radius: 7px;
		}

		.kwk {
			// scrollbar-width: none; //firefox 不显示滚动块
			width: 100%;
			height: 100%;
			overflow: overlay;

			.jp {
				width: 100%;
				position: absolute;
				background: #d3d3d3ee;
				color: #333;
				height: 35px;
				margin: 0px;
				display: flex;
				align-items: center;
				justify-content: center;

				.head {
					width: 90%;
					height: calc(100% - 2px);
					display: flex;
					flex-direction: row;
					border-radius: 7px;
					


					.head_common {
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}

			}


			.tw {
				margin-top: 45px;
				width: 100%;
				height: 100%;

				.body:last-child {
					padding-bottom: 20px;
				}

				.body {
					height: 65px;
					margin: 10px 0 15px 0;
					border-radius: 5px;
					padding: 2px 0 2px 0;
					color: #333;
					display: flex;
					flex-direction: row;
					justify-content: center;


					.item_son {
						width: 90%;
						height: 100%;
						display: flex;
						flex-direction: row;
						justify-content: center;
						background-color: #ededed;
						box-shadow: -2px -2px 5px #fcfcfc, 2px 2px 5px #babebc;
						border-radius: 7px;

						span {
							padding: 0 3px 0 3px;
							align-items: center;
						}

						.b_common {
							width: 20%;
							display: flex;
							justify-content: center;
							align-items: center;
							text-align: center;
							padding: 3px 0;

							img {
								width: 45px;
								height: 65px;
								object-fit: cover;
							}
						}

						.b_manage {
							justify-content: space-evenly;

							.opt_comm {
								font-size: small;
								width: 25px;
								height: 25px;
								padding: 5px;
								border-radius: 50%;
								display: flex;
								align-items: center;
								justify-content: center;
								white-space: nowrap;
								cursor: pointer;
							}

							.option1 {
								background-color: #711cd3;
								color: #eee;
							}

							.option2 {
								background-color: #fd2252;
								color: #eee;
							}
						}
					}
				}
			}



		}
	}

	.mask {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
		position: absolute;
		top: 0;

		.real_mask {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background-color: rgba(99, 99, 99, 0.4);
			z-index: 10;
		}

		.mask_cont {
			z-index: 20;
			width: 85%;
			max-width: 470px;
			height: 80%;
			// max-height: 550px;
			background-color: #ffffff61;
			// box-shadow: -1px -1px 10px #fff, 1px 1px 10px #babebc;
			// border: dashed 1px #eee;
			border-radius: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			user-select: none;

			.btn {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				margin-top: 10px;

				button {
					width: 60px;
					height: 40px;
					border-radius: 1rem;
					border: none;
					background-color: #ffffff83;

				}

				#bt1:hover {
					background-color: #53c0ff;
				}

				#bt2:hover {
					background-color: #ff5e24;
				}
			}

			.main_input {
				width: 90%;
				height: 80%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.ssbox {
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					div {
						width: 70%;
						display: flex;
						align-items: center;
						justify-content: center;

						input {
							width: 90%;
							height: auto;
							text-align: center;
						}

						img {
							width: auto;
							// max-width: 200px;
							height: 100px;
							object-fit: cover;
							border-radius: 10px;
						}
					}

					span {
						width: 30%;
						display: flex;
						align-items: center;
						justify-content: space-evenly;

					}

					label {
						width: 70%;
						display: flex;
						align-items: center;
						justify-content: center;

						input {
							width: 90%;
							height: 30px;
							text-align: center;
							border: none;
							border-radius: 4px;
						}

						select {
							width: 90%;
							height: 30px;
							text-align: center;
							border: none;
							border-radius: 4px;
						}

						input:focus {
							outline: #0000007c solid 1px;
							box-shadow: -1px -1px 10px #fff, 1px 1px 10px #babebc;
						}
					}
				}
			}
		}
	}
}
</style>