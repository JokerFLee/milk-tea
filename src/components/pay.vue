<template>
	<div class="pay_main">
		<div class="pay_box">
			<div class="pay_head">
				<h3>支付平台</h3>
			</div>
			<div class="pay_body">

				<div class="pay_body_title">
					{{orderinfo.ouid}}
				</div>

				<div class="pay_body_price">
					{{orderinfo.money}}
				</div>

				<div class="pay_body_qrcode">
					<div class="wechat"></div>
					<div class="alipay"></div>
				</div>

				<div class="pay_body_payfor">

				</div>

			</div>
			<div class="pay_footer">
				<button><s>模拟</s>支付成功</button>
				<button>取消支付</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { getOrderByOuid } from "../utils/orderinfo/getOrderByOuid"
import nstore from "../store/index"
import { onMounted, ref } from "vue";

const n_store = nstore()

let orderinfo = ref("")
let content = ref(JSON.parse(orderinfo.value.content))

onMounted(() => {
	getOrderByOuid(n_store.ouid).then((e) => {
		orderinfo.value = e
	})
})

</script>

<style lang="scss" scoped>
.pay_main {
	width: 100%;
	height: 100%;

	.pay_box {
		width: 80%;
		height: 80%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		.pay_head {
			height: 100px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			h3 {
				color: #333;
				font-weight: bold;
			}
		}

		.pay_body {
			height: 100%;
			width: 100%;
		}

		.pay_footer {
			width: 100%;
			height: 100px;
		}
	}
}
</style>