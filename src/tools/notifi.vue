<template>
	<div class="noti">
		<div :class="backc">
			<img :src="src" alt="">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { inject, ref } from 'vue';

let src = ref("")
let backc =ref("cont")

let type = inject("type")


if (type.value == "success") {
	backc.value =  "cont success"
	src.value="src/assets/success.svg"

}else if(type.value == "error"){
	backc.value =  "cont error"
	src.value = "src/assets/error.svg"
}

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

	.success{
		color: #12ab15;
		background-color: rgba(199, 225, 199, 0.70);
	}
	.error{
		color: rgb(200, 46, 46);
		background-color: rgba(255, 210, 210, 0.7);
	}

	.cont {
		width: 80%;
		min-width: 250px;
		height: 90%;
		border-radius: 10px;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
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