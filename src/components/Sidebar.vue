<template>
	<header>
		<div>
			<img src="../assets/logo.png" alt="Logo" width="80" height="80">
		</div>

		<button class="btn-dark-mode" @click="changeTheme">
			{{  darkModeActive ? 'Ativar' : 'Desativar ' }} modo escuro
		</button>

		<nav class="panel mt-5">
			<ul>
				<li>
					<router-link to="/" class="link">
						<i class="fa fa-tasks"></i>
						Tarefas
					</router-link>
				</li>

				<li>
					<router-link to="/projetos" class="link">
						<i class="fa fa-project-diagram"></i>
						Projetos
					</router-link>
				</li>
			</ul>
		</nav>
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

	.panel li {
		margin: 8px 0;

		.link {
			color: #FFFFFF;

			&:hover {
				color: #FAF0CA;
			}

			&.router-link-active {
				color: #FAF0CA;
			}
		}
	}

	@media only screen and (max-width: 768px) {
		header {
			padding: 2.5rem;
			height: auto;
		}
	}
</style>
