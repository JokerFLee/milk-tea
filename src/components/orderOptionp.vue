<template>
	<div class="outb">
		<div class="smbx">

			<!-- 
				仅可以选择取消订单!不可以删除订单信息. 三个月后才可以选择删除。
				并且需要选择原因.默认是[顾客主动退款]
				如果奶茶已经做出,且无质量原因客观上不接受取消订单退款.
				 -->
			<div class="mkodm">
				<div class="comm">订单号</div>
				<div class="comm">创建时间</div>
				<div class="comm">详细信息</div>
				<div class="comm">创建方式</div>
				<div class="comm">操作</div>
			</div>

			<div class="cont">
				
			</div>

			<div class="sec">

			</div>

		</div>
	</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.outb {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;

	.smbx {
		height: 40px;
		width: 95%;
		background: #eee;
		margin-top: 15px;
		border-radius: 7px;
		box-shadow: -2px -2px 5px #fcfcfc, 2px 2px 5px #babebc;

		.mkodm{
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			.comm{
				width: 25%;
				height: 100%;
				min-height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
</style>