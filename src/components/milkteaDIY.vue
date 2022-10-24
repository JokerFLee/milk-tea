<template>
	<div class="diy">
		<div class="diy_outbox">

			<div class="card">
				<div class="card_box">
					<div class="card_item" v-for=" item in main_milktlist" :key="item.guid">
						<img :src="item.picurl">

						<div class="info">
							<span>{{item.name}}</span>
							<span>{{(item.price * item.discount).toFixed(2)}}</span>
						</div>

						<div class="butt">
							<button>修改</button>
							<button>查看</button>
						</div>

					</div>
				</div>
			</div>

		</div>
	</div>


	<div class="mask">
		<div class="mask_main">
			<div class="mask_card comm">

				<div class="mask_card_item">
					dlfhgkdfug
				</div>

				<div class="mask_card_button">
					hosidkfhksduufgh
				</div>

			</div>

			<div class="massk_preview comm">

			</div>

		</div>
	</div>


</template>

<script setup>
import { onMounted, ref } from "vue";
import { getDescMilkteaList } from "../utils/milktee/axgetamilktea"

let main_milktlist = ref([])

onMounted(() => {
	getDescMilkteaList().then((e) => {
		main_milktlist.value = e
		console.log(e);
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
				justify-content: center;
				flex-wrap: wrap;
				padding-bottom: 2.5%;

				.card_item {
					height: auto;
					min-height: 150px;
					width: 45%;
					background-color: #ddd;
					margin: 2px 5px;
					border-radius: 7px;
					overflow: hidden;
					position: relative;

					.info {
						width: 40%;
						min-width: 70px;
						height: 100%;
						display: flex;
						justify-content: space-evenly;
						align-items: center;
						flex-direction: column;
						backdrop-filter: blur(10px);
						-webkit-backdrop-filter:blur(10px);
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
							background-color: #ffffffbf;
							color: #444;
							font-weight: bold;
							cursor: pointer;

						}

						:hover {
							background: #444444bf;
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
	display: flex;
	align-items: center;
	justify-content: center;


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
			min-width: 350px;
			width: 90%;
			height: 90%;
			margin: 5px 15px;
			flex: 1;
		}

		.mask_card {
			background-color: bisque;

			.mask_card_item {}


			.mask_card_button {}

		}

		.massk_preview {
			background-color: seagreen;

		}
	}

}
</style>