<template>
	<!-- <div class="loader" >
		<div class="loader-inner">
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line"></div>
			</div>
		</div>
	</div> -->
<div class="mainview">
	<div class="dot-rolling"></div>
</div>
</template >

<script setup>
</script>

<style lang="scss" scoped>
// .loader {
// 	background-color: #0000009d;
// 	backdrop-filter: blur(15px);
// 	-webkit-backdrop-filter: blur(15px);
// 	bottom: 0;
// 	left: 0;
// 	overflow: hidden;
// 	position: fixed;
// 	right: 0;
// 	top: 0;
// 	z-index: 99999;

// 	.loader-inner {
// 		bottom: 0;
// 		height: 60px;
// 		left: 0;
// 		margin: auto;
// 		position: absolute;
// 		right: 0;
// 		top: 0;
// 		width: 100px;
// 	}

// 	.loader-line-wrap {
// 		animation:
// 			spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
// 		box-sizing: border-box;
// 		height: 50px;
// 		left: 0;
// 		overflow: hidden;
// 		position: absolute;
// 		top: 0;
// 		transform-origin: 50% 100%;
// 		width: 100px;
// 	}

// 	.loader-line {
// 		border: 4px solid transparent;
// 		border-radius: 100%;
// 		box-sizing: border-box;
// 		height: 100px;
// 		left: 0;
// 		margin: 0 auto;
// 		position: absolute;
// 		right: 0;
// 		top: 0;
// 		width: 100px;
// 	}

// 	.loader-line-wrap:nth-child(1) {
// 		animation-delay: -50ms;
// 	}

// 	.loader-line-wrap:nth-child(2) {
// 		animation-delay: -100ms;
// 	}

// 	.loader-line-wrap:nth-child(3) {
// 		animation-delay: -150ms;
// 	}

// 	.loader-line-wrap:nth-child(4) {
// 		animation-delay: -200ms;
// 	}

// 	.loader-line-wrap:nth-child(5) {
// 		animation-delay: -250ms;
// 	}

// 	.loader-line-wrap:nth-child(1) .loader-line {
// 		border-color: hsl(0, 80%, 60%);
// 		height: 90px;
// 		width: 90px;
// 		top: 7px;
// 	}

// 	.loader-line-wrap:nth-child(2) .loader-line {
// 		border-color: hsl(60, 80%, 60%);
// 		height: 76px;
// 		width: 76px;
// 		top: 14px;
// 	}

// 	.loader-line-wrap:nth-child(3) .loader-line {
// 		border-color: hsl(120, 80%, 60%);
// 		height: 62px;
// 		width: 62px;
// 		top: 21px;
// 	}

// 	.loader-line-wrap:nth-child(4) .loader-line {
// 		border-color: hsl(180, 80%, 60%);
// 		height: 48px;
// 		width: 48px;
// 		top: 28px;
// 	}

// 	.loader-line-wrap:nth-child(5) .loader-line {
// 		border-color: hsl(240, 80%, 60%);
// 		height: 34px;
// 		width: 34px;
// 		top: 35px;
// 	}

// 	@keyframes spin {

// 		0%,
// 		15% {
// 			transform: rotate(0);
// 		}

// 		100% {
// 			transform: rotate(360deg);
// 		}
// 	}
// }

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