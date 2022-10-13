<template>
	<div class="outb">
		<!-- 头部信息简介 -->
		<div class="smbx">
			<div class="mkodm">
				<div class="comm">订单号</div>
				<div class="comm">创建时间</div>
				<div class="comm">详细信息</div>
				<div class="comm">订单来源</div>
				<div class="comm">操作</div>
			</div>
		</div>

		<!-- 中间信息栏 -->
		<div class="cont">
			<div class="medium">
				<div class="content">

					<div class="orderid"></div>
					<div class="time"></div>
					<div class="info"></div>
					<div class="source"></div>
					<div class="action"></div>
				</div>

				<div class="content">
					<div class="orderid"></div>
					<div class="time"></div>
					<div class="info"></div>
					<div class="source"></div>
					<div class="action"></div>
				</div>

				<div class="content">
					<div class="orderid"></div>
					<div class="time"></div>
					<div class="info"></div>
					<div class="source"></div>
					<div class="action"></div>
				</div>

			</div>

		</div>



		<!-- 底部工具栏 -->
		<div class="sec">
			<div class="end"></div>
		</div>
	</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.outb {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: overlay;


	.smbx {
		height: 40px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		margin: 3px 0;

		.mkodm {
			width: 95%;
			height: 100%;
			display: flex;
			background: rgba(200, 200, 200, 0.7);
			border-radius: 7px;

			.comm {
				width: 25%;
				height: 100%;
				min-height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.cont {
		width: 100%;
		margin-top: 43px;
		height: calc(100% - 94px);
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: center;

		.medium {
			width: 95%;
			height: 100%;

			.content:last-child {
				padding-bottom: 46px;
			}

			.content {
				width: 100%;
				height: 50px;
				margin: 3px 0;
				display: flex;


				div {
					width: 100%;
					height: 100%;
					background-color: rgba(15, 50, 131, 0.751);
					
				}
				div:first-child{
					border-top-left-radius: 7px;
					border-bottom-left-radius: 7px;
				}
				div:last-child{
					border-top-right-radius: 7px;
					border-bottom-right-radius: 7px;
				}

			}
		}



	}

	.sec {
		width: 100%;
		height: 40px;
		margin: 3px 0px;
		position: fixed;
		bottom: 0px;
		display: flex;
		align-items: center;
		justify-content: center;

		.end {
			width: 95%;
			height: 100%;
			border-radius: 7px;
			background: rgba(200, 200, 200, 0.7);
		}

	}
}
</style>