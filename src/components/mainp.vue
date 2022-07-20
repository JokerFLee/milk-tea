<template>
	<div class="mainp">

		<div class="food">
			<div class="itema">
				<div class="item title">水果库存</div>
				<div class="item" v-for="item in foods">
					<span>{{ item.name }}</span> <span> : </span> <span> {{ item.number }}</span>
				</div>
			</div>

			<div class="itemb">
				<p>本月奶茶销售占比</p>
				<!-- <DoughnutChart :chartData="testData" /> -->
				<pie-chart
					:data="[['Blueberry', 44], ['Strawberry', 23], ['Instgram', 10], ['Facboot', 10], ['Youtuae', 60], ['Tiktok', 210]]">
				</pie-chart>
			</div>
		</div><!-- 食物总览 -->

		<div class="thing">
			<div class="itema">
				<div class="item title">日耗库存</div>
				<div class="item" v-for="item in thing">
					<span>{{ item.name }}</span> <span> : </span> <span> {{ item.number }}</span>
				</div>
			</div>
		</div><!-- 物品总览 -->

		<div class="staff">
			<div class="itema">
				<div class="item title">今日奶茶畅销榜</div>
				<div class="item" v-for="item in staff">
					<span>{{ item.name }}</span> <span> : </span> <span> {{ item.number }}</span>
				</div>
			</div>

			<div class="itemb">
				<p>营业额</p>
				<line-chart
					:data="{ '2017-05-13': 32, '2017-05-14': 15, '2017-05-15': 97, '2017-05-16': 102, '2017-05-17': 68, '2017-05-18': 58, '2017-05-19': 33 }">
				</line-chart>
			</div>
		</div><!-- 员工总览 -->

	</div>
</template>

<script>
import { ref } from 'vue'
import axios from "axios"

export default {
	name: "mainp",
	setup() {

		let foods = ref([]);
		let thing = ref([]);
		let staff = ref([]);

		function adds() {
			this.foods = [111, 222, 333, 4456, 444]
			console.log(foods);
		};

		function axget(e) {
			return axios({
				method: "GET",
				url: e,
				params: {
					fp: "20180908111",
					sp: "s34c5ui8s4h5t8x0"
				}
			}).then((pa) => {
				return (pa.data)
			})
		}

		return {
			foods,
			thing,
			staff,
			axget,
			adds
		}
	},
	mounted() {
		this.axget("src/assets/test.json").then((e) => {
			console.log(e.jsp);
			this.foods = e.jsp[0]
			this.thing = e.jsp[1]
			this.staff = e.jsp[2]
		})
	}
}
</script>

<style lang="scss" scoped>
.mainp {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-evenly;
	padding-top: 10px;
	flex-direction: row;
	user-select: none;

	.food {
		width: 30%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;


		.itema {
			background-color: salmon;
		}

		.itemb {
			background-color: cornflowerblue;
		}
	}


	.thing {
		width: 30%;
		height: 100%;

		.itema {
			background-color: sandybrown;
		}
	}

	.staff {
		width: 30%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		.itema {
			background-color: slateblue;
		}

		.itemb {
			background-color: deepskyblue;
			margin-left: -50%;
		}
	}
}

.itema {
	width: 100%;
	height: 40%;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;

	.title {
		font-size: large;
		font-weight: bold;
		color: #ffffff;
	}

	.item {
		width: 80%;
		height: 20%;
		display: flex;
		align-items: center;
		justify-content: center;

		span {
			width: 33.3%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}

.itemb {
	width: 150%;
	height: 50%;
	border-radius: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	p {
		padding: 0;
		margin: 0;
		font-size: large;
		font-weight: bold;
	}
}
</style>