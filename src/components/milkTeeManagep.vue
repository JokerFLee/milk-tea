<template>
	<div class="sabox">
		<div class="op">
			<div class="kwk">

				<div class="h_common head">
					<div class="head_common">名称</div>
					<div class="head_common">原价</div>
					<div class="head_common">现价</div>
					<div class="head_common">折扣</div>
					<div class="head_common">售罄</div>
					<div class="head_common">图片</div>
					<div class="head_common">管理</div>
				</div>

				<div class="h_common body" v-for="item in sdata">
					<div class="item_son">
						<div class="b_common">{{ item.name }}</div>
						<div class="b_common">{{ item.price }}</div>
						<div class="b_common">{{ (item.price * item.discount).toFixed(2) }}</div>
						<div class="b_common">{{ item.discount }}</div>
						<div class="b_common">{{ item.soldout }}</div>
						<div class="b_common"><img :src="item.picurl"></div>
						<div class="b_common b_manage">
							<div class="option1" @click="teadit(item)">修改</div>
							<div class="option2">删除</div>
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
						<span>名称:</span> <label><input type="text"  :value.lazy="itemdt.name" ></label>
					</div>

					<div class="ssbox">
						<span>价格:</span> <label><input type="number" v-model.lazy="itemdt.price"></label>
					</div>

					<div class="ssbox">
						<span>折扣:</span> <label><input min="0" max="1" step="0.01" type="number" v-model.lazy="itemdt.discount"></label>
					</div>

					<div class="ssbox">
						<span>现价:</span> <label><input :value.lazy="now_price" disabled style="cursor: no-drop;"></label>
					</div>

					<div class="ssbox">
						<span>介绍:</span> <label><input :value.lazy="itemdt.intro" ></label>
					</div>

					<div class="ssbox">
						<span>售罄:</span>
						<label>
							<select v-model.lazy="itemdt.soldout" single>
								<option v-for="item in soldoutlist" :value.lazy="item.value" >{{ item.x }}</option>
							</select></label>
					</div>

					<div class="ssbox">
						<span>图片:</span>
						<div> <input type="file" accept="image/jpg,image/JPG,image/jpeg,image/JPEG,image/png,image/PNG,image/gif"
								single @change="changepic"> <img :src.lazy="itemdt.picurl"> </div>
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
import getmilktealist from "../utils/milktee/axgetamilktea"
import { computed, reactive, onBeforeMount, ref, watch } from 'vue';

let mask_state = ref(false)
let sdata = ref()
let blurSta = ref("0px")
let itemdt = ref("")
let item_tmp = null
let soldoutlist = ref([{x:"是",value:1},{x:"否",value:0}])

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

function changepic(args) {
	var myURL = window.URL.createObjectURL(args.target.files[0])
	itemdt.value.picurl = myURL
	// let real = upload pic option
	// itemdt.value.picurl = real

}

function teadit(e) {
	mask_state.value = true
	blurSta.value = "5px"

	item_tmp = e

	let stupid_vue = JSON.parse(JSON.stringify(e))

	itemdt.value = reactive(stupid_vue)
	console.log(itemdt,soldoutlist);

}

function disableMask(e) {
	mask_state.value = false
	blurSta.value = "0px"
	if (e) {
		console.log("提交咯", item_tmp.target, itemdt.value);
		item_tmp.discount = itemdt.value.discount
		item_tmp.price = itemdt.value.price
		item_tmp.picurl = itemdt.value.picurl
		item_tmp.soldout = itemdt.value.soldout
	}
}

//getmilktealist

function getallmilktea(){
	getmilktealist().then((e)=>{
		sdata.value = e
	})
}


onBeforeMount(() => {
	getallmilktea()
})


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
		overflow: hidden;
		z-index: 0;
		filter: blur(v-bind(blurSta));

		.kwk {
			width: 95%;
			height: 95%;

			.h_common {
				width: 100%;
				display: flex;
				flex-direction: row;
			}

			.head {
				background: #ededed;
				color: #333;
				height: 35px;
				margin: 0px;
				border-radius: 5px;
				box-shadow: -2px -2px 5px #e0e0e0, 2px 2px 5px #babebc;
				// outline: #eee solid 1px;

				.head_common {

					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;

				}
			}

			.body {
				height: 60px;
				margin: 10px 0 15px 0;
				background-color: #ededed;
				box-shadow: -2px -2px 5px #fcfcfc, 2px 2px 5px #babebc;
				border-radius: 5px;
				padding: 2px 0 2px 0;
				color: #333;

				.item_son {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					padding: 0 3px 0 3px;

					.b_common {
						width: 20%;
						display: flex;
						justify-content: center;
						align-items: center;

						img {
							width: 45px;
							height: 60px;
							object-fit: cover;
						}
					}

					.b_manage {
						justify-content: space-evenly;

						.option1 {
							width: 25px;
							height: 25px;
							padding: 5px;
							border-radius: 50%;
							display: flex;
							align-items: center;
							justify-content: center;
							white-space: nowrap;
							cursor: pointer;
							background-color: #711cd3;
							color: #eee;
						}

						.option2 {
							width: 25px;
							height: 25px;
							padding: 5px;
							border-radius: 50%;
							display: flex;
							align-items: center;
							justify-content: center;
							white-space: nowrap;
							cursor: pointer;
							background-color: #fd2252;
							color: #eee;
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