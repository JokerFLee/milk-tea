<template>
	<div class="sabox">
		<div class="op">
			<div class="kwk">
				<div class="h_common head">
					<div class="name head_common">名称</div>
					<div class="original_price head_common">原价</div>
					<div class="current_price head_common">现价</div>
					<div class="discount head_common">折扣</div>
					<div class="pic head_common">图片</div>
					<div class="manage head_common">管理</div>
				</div>
				<div class="h_common body" v-for="item in sdata">
					<div class="item_son">
						<div class="b_common">{{ item.name }}</div>
						<div class="b_common">{{ item.price }}</div>
						<div class="b_common">{{ (item.price * item.discount).toFixed(2) }}</div>
						<div class="b_common">{{ item.discount }}</div>
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
				
				<button @click="disableMask">submit</button>
			</div>

		</div>
	</div>
</template>

<script setup>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

let mask_state = ref(false)
let sdata = ref()
let blurSta = ref("0px")


function teadit(e) {
	mask_state.value = true
	console.log(e);
	blurSta.value = "6px"
}

function disableMask (){
	mask_state.value = false
	blurSta.value = "0px"
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
		sdata.value = e.jsp[3]
	})
}

onBeforeMount(() => {
	packreq()
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
		filter: blur( v-bind(blurSta) );

		.kwk {
			width: 95%;
			height: 95%;

			.h_common {
				width: 100%;
				display: flex;
				flex-direction: row;
			}

			.head {
				// background-color: #3fbe77;
				height: 35px;
				margin: 0px;
				// border-radius: 5px;

				.head_common {
					background-color: #005d5e;
					color: #fff;
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					border-left: #111 solid 1px;
					border-right: #111 solid 1px;
					border-radius: 5px;
				}

				.name {
					border-left: none;
				}

				// .original_price {}
				// .current_price {}
				// .discount {}
				// .pic {}
				.manage {
					border-right: none;
				}
			}

			.body {
				height: 80px;
				margin: 3px 0 3px 0;
				background-color: #50bcbb;
				padding: 2px 0 2px 0;

				.item_son {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					.b_common {
						width: 20%;
						display: flex;
						justify-content: center;
						align-items: center;

						img {
							width: 50px;
							height: 75px;
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
							background-color: #31e446;
							font-family: nailao;
						}

						.option1:hover {
							background-color: #05a718;
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
							background-color: #ff6f00;
							font-family: nailao;
						}

						.option2:hover {
							background-color: #ff0000
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
			position: absolute;
			top: 0;
			width: 80%;
			max-width: 600px;
			height: 90%;
			max-height: 700px;
			background-color: #ff9900;
			border-radius: 30px;
		}
	}
}
</style>