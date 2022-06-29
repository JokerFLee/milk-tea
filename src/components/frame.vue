<template>
	<div class="np">

		<div class="outbox">
			<div class="a11 a12">
				<div>{{ xxx }},下午好</div>
				<!-- <div class="a13"></div>
                <p class="a14"></p> -->
			</div>
			<div class="a11 b12">

				<div class="b19" @click="clickshow('v1')" @mouseleave="mouseleave('v1')">
					<div class="b20">
						<div class="b-20-con b21"></div> <span>食品原材料</span>
					</div>
					<ul v-show="v1">
						<li>库存总览</li>
						<li>消耗记录</li>
						<li>供货记录</li>
						<li>临期提醒</li>
						<li>申请供货</li>
						<!--管理员:申请直接过 ===> 普通员工:申请,需要得到管理员同意-->
					</ul>
				</div>

				<div class="b19" @click="clickshow('v2')" @mouseleave="mouseleave('v2')">
					<div class="b20">
						<div class="b-20-con b22"></div> <span>日常消耗品</span>
					</div>
					<ul v-show="v2">
						<li>库存总览</li>
						<li>申请供货</li>
						<!--管理员:申请直接过 ===> 普通员工:申请,需要得到管理员同意-->
					</ul>
				</div>

				<div class="b19" @click="clickshow('v3')" @mouseleave="mouseleave('v3')">
					<div class="b20">
						<div class="b-20-con b23"></div> <span>员工</span>
					</div>
					<ul v-show="v3">
						<li>员工申请</li> <!-- 管理员:用于处理员工的注册请求 ===> 普通员工:无权限访问 -->
						<li>用户管理</li> <!-- 管理员:岗位调动,离职,删 改 查 ===> 普通员工:无权限访问-->
						<li>薪资管理</li> <!-- 管理员:调整普通员工薪资以及派发 奶茶券/奖金/津贴 | 普通员工:只可以发起涨薪申请-->

					</ul>
				</div>

				<div class="b19" @click="clickshow('v4')" @mouseleave="mouseleave('v4')">
					<div class="b20">
						<div class="b-20-con b24"></div> <span>其他</span>
					</div>
					<ul v-show="v4">
						<li>申请调休</li>
						<li>活动日历</li>
						<li>匿名吐槽</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="opbox">

			<div class="navga">
				<div class="banner">xxx奶茶管理系统</div>
				<div class="user">
					<div class="container">
						<div class="user_name">
							<div class="img"></div>
							<div class="txt">{{ xxx }}</div>
						</div>
						<div class="exit">
							<div class="img"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="mains">
				<mm class="mi"></mm>
			</div>
		</div>


	</div>
</template>

<script>
import { ref } from 'vue';
import mm from "./mainp.vue";

export default {
	components: {
		mm
	},
	setup() {
		let v1 = ref(1);
		let v2 = ref(0);
		let v3 = ref(0);
		let v4 = ref(0);
		let xxx = ref("liming");

		function clickshow(e) {
			if (e == "v1") {
				this.v1 = 1;
				this.v2 = 0;
				this.v3 == 0;
				this.v4 = 0
			} else if (e == "v2") {
				this.v2 = 1;
				this.v1 = 0
				this.v3 = 0
				this.v4 = 0
			} else if (e == "v3") {
				this.v3 = 1;
				this.v1 = 0
				this.v2 = 0
				this.v4 = 0
			} else {
				this.v4 = 1;
				this.v1 = 0
				this.v2 = 0
				this.v3 = 0
			}
		}
		return {
			v1,
			v2,
			v3,
			v4,
			xxx,
			clickshow,
		}
	},


}
</script>

<style scoped>
@font-face {
	font-family: "nailao";
	src: url("../assets/font/nailao.woff");
}

@font-face {
	font-family: "kkt";
	src: url("../assets/font/kkt.woff");
}

.np {
	width: 100%;
	height: 100%;
	display: flex;

}

.outbox {
	width: 15%;
	height: 100%;
	min-width: 165px;
}

.a11 {
	width: 100%;
}

.a12 {
	height: 5%;
	background: #43cea2;
	background: linear-gradient(to bottom, #113d69, #185b9d);
	color: #f1f1f1;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "nailao";
	box-sizing: border-box;
	padding: 1px;
	border-bottom: solid #462a58 1px;
}

.a13 {
	height: 70%;
	width: 30%;
	background-image: url(../assets/mkt.svg);
	background-position: 50% 50%;
	background-repeat: no-repeat;
	background-size: contain;

}

.a14 {
	height: 100%;
	width: 70%;
	padding: 3px 5px 3px 5px;
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.b12 {
	height: 95%;
	background: #43cea2;
	background: linear-gradient(to bottom, #185a9d, #43cea2);
	display: flex;
	align-items: center;
	flex-direction: column;
	color: #000000;
}

.b19 {
	width: 100%;
	height: auto;
}

.b20 {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
}


.b12 ul {
	width: 80%;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	margin-left: auto;
	margin-right: auto;
}

.b12 li {
	height: 40px;
	width: 100%;
	padding: 0;
	margin: 0;
	list-style: none;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: smaller;

}


.b-20-con {

	height: 30px;
	width: 30px;
	border-radius: 50%;
	background-repeat: no-repeat;
	background-position: 50% 50%;
	background-size: contain;
	padding-left: 20px;
}

.b21 {
	background-image: url(../assets/orange.svg);

}

.b22 {
	background-image: url(../assets/wash.svg);
}

.b23 {
	background-image: url(../assets/stuff.svg);
}

.b24 {
	background-image: url(../assets/other.svg);
}

.b20 span {
	height: 30px;
	width: auto;
	display: inline-flex;
	align-items: center;
	font-size: larger;
	font-family: "kkt";
}

.opbox {
	width: 100%;
	width: 100%;
}

.navga {
	width: 100%;
	height: 5%;
	background: #fff;
	display: flex;
	box-sizing: border-box;
	padding: 1px;
	border-bottom: solid #462a58 1px;
}

.banner {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

}

.user {
	width: 100%;
	height: 100%;
	max-width: 165px;
	margin-left: 5px;
}

.container {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.user_name {
	width: 80%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	border-radius: 3px;

}

.user_name .img {
	width: 30px;
	height: 30px;
	background-image: url("../assets/strong_dog.jpg");
	background-position: 50% 50%;
	background-size: contain;
	background-repeat: no-repeat;
	border-radius: 50%;

}

.user_name .txt {
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.exit {
	width: 20%;
	height: 100%;
	color: white;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 3px;
	margin-right: 5px;
	margin-left: 5px;
}

.exit .img {
	width: 30px;
	height: 30px;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	background-size: contain;
	background-image: url("../assets/exit.svg");
}

.mains {
	width: 100%;
	height: 95%;
	background-color: #dcebfa;
	float: left;
}

.mi {
	width: 100%;
	height: 100%;
}
</style>