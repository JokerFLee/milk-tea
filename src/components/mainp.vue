<template>
	<div class="fp" @click="mmplus">
		hello world {{ss}}
	</div>
</template>

<script>
import { ref } from 'vue'

export default {
	name: "main",
	setup() {
		let ss = ref(88);
		function mmplus() {
			this.ss+=1
		}
		return {
			ss,
			mmplus
		}
	}
}
</script>

<style scoped>
.fp {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>