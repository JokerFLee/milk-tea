<template>
	<div class="noti">
		<div class="cont">
			<img src="../assets/success.svg" alt="">
			提交成功！
		</div>
	</div>
</template>

<script setup>


</script>

<style lang="scss" scoped>
@keyframes lol {
	from {
		top: 0;
		opacity: 1;
	}

	to {
		top: -100%;
		opacity: 0;
	}
}
.noti {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	animation-name: lol;
	animation-duration: 0.7s;
	animation-fill-mode: forwards;
	animation-timing-function: linear;

	.cont {
		width: 80%;
		min-width: 250px;
		height: 90%;
		border-radius: 10px;
		background-color: rgba(199, 225, 199, 0.70);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		color: #12ab15;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		font-weight: bold;
		font-family: kkt;

	}

	img {
		width: 50px;
		height: 50px;
		object-fit: cover;
		position: absolute;
		left: 20px;
	}

}
</style>