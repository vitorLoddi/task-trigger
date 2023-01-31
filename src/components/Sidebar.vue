<template>
	<header>
		<div>
			<img src="../assets/logo.png" alt="Logo" width="80" height="80">
		</div>

		<button class="btn-dark-mode" @click="changeTheme">
			{{  darkModeActive ? 'Ativar' : 'Desativar ' }} modo escuro
		</button>
	</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Sidebar',

	emits: [
		'changeTheme',
	],

	data() {
		return {
			darkModeActive: false,
		};
	},

	methods: {
		changeTheme() : void {
			this.darkModeActive = !this.darkModeActive;

			this.$emit('changeTheme', this.darkModeActive);
		},
	},
});
</script>

<style lang="scss" scoped>
	header {
		padding: 1rem;
		background: #0d3b66;
		width: 100%;
		height: 100vh;
		text-align: center;
	}

	button {
		width: 180px;
		height: 34px;
		border: none;
		border-radius: 6px;
		margin-top: 40px;
		box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease 0s;
		cursor: pointer;
		outline: none;
		font-weight: bold;

		&:hover {
			background-color: #0dc279;
			box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
			color: #fff;
			transform: translateY(-7px);
		}
	}

	@media only screen and (max-width: 768px) {
		header {
			padding: 2.5rem;
			height: auto;
		}
	}
</style>
