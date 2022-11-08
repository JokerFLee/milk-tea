<template>
<div class="mainview">
	<div class="dot-rolling"></div>
</div>
</template >

<script setup>
</script>

<style lang="scss" scoped>
.mainview{
	z-index: 1000;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);

}

.dot-rolling {
  position: relative;
  height: 30px;
  font-size: 30px;

  &::before {
    content: '⚽';
    display: inline-block;
    position: relative;
    transform: translateX(-100px);
    animation: dot-rolling 1.5s infinite;
  }
}

@keyframes dot-rolling {
  0% {
    content: '⚽';
    transform: translateX(-100px) rotateZ(0deg);
  }

  16.667% {
    content: '⚽';
    transform: translateX(100px) rotateZ(720deg);
  }

  33.333% {
    content: '⚽';
    transform: translateX(-100px) rotateZ(0deg);
  }

  34.333% {
    content: '🏀';
    transform: translateX(-100px) rotateZ(0deg);
  }

  50% {
    content: '🏀';
    transform: translateX(100px) rotateZ(720deg);
  }

  66.667% {
    content: '🏀';
    transform: translateX(-100px) rotateZ(0deg);
  }

  67.667% {
    content: '🏐';
    transform: translateX(-100px) rotateZ(0deg);
  }

  83.333% {
    content: '🏐';
    transform: translateX(100px) rotateZ(720deg);
  }

  100% {
    content: '🏐';
    transform: translateX(-100px) rotateZ(0deg);
  }
}
</style>