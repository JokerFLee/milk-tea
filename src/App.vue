<template>
	<div class="np ">

		<div class="outbox">

			<!-- <div class="out1div" @click="kfc"> -->
			<div class="out1div" @click="sideshow = !sideshow">
				<div class="icon"></div>
				<div class="name" title="点击可显示/隐藏菜单栏">侧边栏</div>
			</div>

			<div class="navga">
				<div class="banner">xxx奶茶管理系统</div>
				<div class="user">
					<div class="container">
						<div class="user_name" :title="xxx">
							<div class="img"></div>
						</div>
						<div class="exit" title="退出当前用户">
							<div class="img"></div>
						</div>
					</div>
				</div>
			</div>

		</div>

		<div class="opbox">

			<div class="op1div" v-show="sideshow">

				<div class="op1div-common">
					<div class="op1div-title" @click="willshow(0)">
						<div class="image-common b20"></div> <span>奶&茶</span>
					</div>
					<ul v-show="statement[0]" @click="ismobile">
						<router-link to="/newTypeMilkTee">
							<li>新品上架</li>
						</router-link>
						<router-link to="/milkTeeManage">
							<li>在售管理</li>
						</router-link>
						<router-link to="/orderMT">
							<li>奶茶点单</li>
						</router-link>
					</ul>
				</div>

				<div class="op1div-common">
					<div class="op1div-title" @click="willshow(1)">
						<div class="image-common b21"></div> <span>水果原料</span>
					</div>
					<ul v-show="statement[1]" @click="ismobile">
						<router-link to="/">
							<li>数据总览</li>
						</router-link>
						<router-link to="blog">
							<li>消耗记录</li>
						</router-link>
						<router-link to="/login">
							<li>临期提醒</li>
						</router-link>
						<router-link to="/">
							<li>申请供货</li>
						</router-link>

						<!--管理员:申请直接过 ===> 普通员工:申请,需要得到管理员同意-->
					</ul>
				</div>

				<div class="op1div-common">
					<div class="op1div-title" @click="willshow(2)">
						<div class="image-common b22"></div> <span>日耗品</span>
					</div>
					<ul v-show="statement[2]" @click="ismobile">
						<router-link to="/">
							<li>库存总览</li>
						</router-link>
						<router-link to="/">
							<li>申请供货</li>
						</router-link>

						<!--管理员:申请直接过 ===> 普通员工:申请,需要得到管理员同意-->
					</ul>
				</div>

				<div class="op1div-common">
					<div class="op1div-title" @click="willshow(3)">
						<div class="image-common b23"></div> <span>工作人员</span>
					</div>
					<ul v-show="statement[3]" @click="ismobile">
						<router-link to="/">
							<li>员工申请</li> <!-- 管理员:用于处理员工的注册请求 ===> 普通员工:无权限访问 -->
						</router-link>
						<router-link to="/">
							<li>用户管理</li> <!-- 管理员:岗位调动,离职,删 改 查 ===> 普通员工:无权限访问-->
						</router-link>
						<router-link to="/">
							<li>薪资管理</li> <!-- 管理员:调整普通员工薪资以及派发 奶茶券/奖金/津贴 | 普通员工:只可以发起涨薪申请-->
						</router-link>
					</ul>
				</div>

				<div class="op1div-common">
					<div class="op1div-title" @click="willshow(4)">
						<div class="image-common b24"></div> <span>其他杂项</span>
					</div>
					<ul v-show="statement[4]" @click="ismobile">
						<router-link to="/">
							<li>申请调休</li>
						</router-link>
						<router-link to="/">
							<li>活动日历</li>
						</router-link>
						<router-link to="/">
							<li>匿名吐槽</li>
						</router-link>
					</ul>
				</div>
			</div>


			<div class="op2div">
				<router-view></router-view>
			</div>
		</div>


	</div>
</template>

<script setup>
import { onMounted, ref, } from 'vue';


let statement = ref([false, true, false, false, false])
let sideshow = ref(true);
let xxx = ref("李明");


function reque(url, method) {

	const kx = axios({
		url: url,
		method: method,
		params: {
			fi: "ok",
			sec: "23"
		}
	}).then(res => {
		let sv = res.data
		return sv
	})
	return kx
}

function kfc(url, method) {
	reque("src/assets/test.json", "get").then(//因为axios是异步加载的,所以在返回值后面再套一个then,
		//表示执行完前异步操作以后再执行本次异步操作,就可以获取到正确的值了,而非 **Promise {<pending>}**
		(e) => {
			// console.log(e);
		}
	);
}

function ismobile() {
	if (screen.availWidth <= 1440) {
		sideshow.value = false
	}
}

function willshow(e) {
	const tp = !statement.value[e]
	statement.value = [false]
	statement.value[e] = tp
}




onMounted(() => {
	ismobile()
})

</script>

<style lang="scss" scoped>
@font-face {
	font-family: "kkt";
	src: url("./assets/font/kkt.woff");
	font-weight: normal;
	font-style: normal;
}

.np {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;


	.outbox {
		width: 100%;
		height: 5%;
		user-select: none;
		display: flex;
		user-select: none;
		background-color: #ececec;

		.out1div {
			width: 10%;
			height: 100%;
			min-width: 120px;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			align-items: center;
			padding-left:20px;

			.icon {
				min-width: 20px;
				height: 20px;
				background-image: url("./assets/quick_menu.svg");
				background-repeat: no-repeat;
				background-size: contain;
			}

			.name {
				height: 100%;
				width: 100%;
				color: #333;
				display: flex;
				align-items: center;
				padding-left: 10px;
				font-family: kkt;
			}
		}

		.navga {
			width: 100%;
			height: 100%;
			color: #333;
			display: flex;
			box-sizing: border-box;
			padding: 1px;
			user-select: none;

			.banner {
				width: 100%;
				height: 100%;
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				justify-content: center;
				overflow: hidden;
				white-space: nowrap;
			}

			.user {
				width: 100px;
				height: 100%;

				.container {
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					.user_name {
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 3px;

						.img {
							width: 30px;
							height: 30px;
							background-image: url("./assets/strong_dog.jpg");
							background-position: 50% 50%;
							background-size: contain;
							background-repeat: no-repeat;
							border-radius: 50%;

						}

					}

					.user_name :hover {
						outline: #000 1px dashed;
						border-radius: 50%;
					}
				}
			}

			.exit {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
			}

			.exit :hover {
				outline: #000 1px dashed;
				border-radius: 50%;
			}

			.exit .img {
				width: 30px;
				height: 30px;
				background-position: 50% 50%;
				background-repeat: no-repeat;
				background-size: contain;
				background-image: url("./assets/exit.svg");
			}
		}

	}

	.opbox {
		width: 100%;
		height: 95%;
		display: flex;
		flex-direction: row;

		.op1div {
			width: 15%;
			min-width: 165px;
			height: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
			color: #000;
			background: linear-gradient(to bottom, #f0e9e9, #588dff);
			user-select: none;


			.op1div-common {
				width: 100%;
				height: auto;
				margin-top: 20px;
				margin-bottom: 10px;

				.op1div-title {
					width: 90%;
					height: auto;
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					align-items: center;
					margin-left: 5%;
					padding: 5px 0 5px 0;
					font-family: kkt;

					span {
						height: 30px;
						width: 100%;
						display: inline-block;
						font-size: larger;
						text-align: justify;
						text-align-last: justify;
						text-justify: inter-ideograph;
						line-height: 30px;
					}

					.image-common {
						height: 30px;
						width: 30px;
						border-radius: 50%;
						background-repeat: no-repeat;
						background-position: 50% 50%;
						background-size: contain;
						padding-left: 20px;
					}

					.b20 {
						background-image: url(./assets/mkt.svg);
					}

					.b21 {
						background-image: url(./assets/orange.svg);
					}

					.b22 {
						background-image: url(./assets/wash.svg);
					}

					.b23 {
						background-image: url(./assets/staff.svg);
					}

					.b24 {
						background-image: url(./assets/other.svg);
					}



				}

				ul {
					width: 100%;
					padding: 0;
					margin: 5px 0 0 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-evenly;
					margin-left: auto;
					margin-right: auto;

					a {
						width: 100%;
						display: block;
						text-decoration: none;
						color: #111;
					}

					li {
						height: 60px;
						width: 100%;
						padding: 0;
						margin: 0;
						list-style: none;
						display: inline-flex;
						align-items: center;
						justify-content: center;
						font-size: smaller;
						/* background: linear-gradient(to right, #8f94fb, #4e54c8); */
						margin-right: -1px;
					}

					li:hover {
						background: linear-gradient(to right, #98c8ff, #dec6ec);
						color: #333;
					}
				}
			}
		}

		.op2div {
			width: 100%;
			height: 100%;
			float: left;
			overflow: hidden;
		}
	}
}
</style>