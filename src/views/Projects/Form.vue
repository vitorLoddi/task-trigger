<template>
	<section class="projects">
		<h1 class="title">Projetos</h1>

		<form @submit.prevent="saveProject">
			<div class="field">
				<label
					for="nameProject"
					class="label"
				>
					Nome do Projeto:
					<input
						type="text"
						id="nameProject"
						class="input"
						v-model="nameProject"
					>
				</label>
			</div>

			<div class="field">
				<button type="submit" class="button">
					Salvar
				</button>
			</div>
		</form>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Interfaces
import { useStore } from '@/store';

export default defineComponent({
	name: 'Form',

	data() {
		return {
			nameProject: '',
		};
	},

	methods: {
		saveProject() {
			this.store.commit(
				'ADD_PROJECT',
				this.nameProject,
			);

			this.nameProject = '';

			this.$router.push('/projetos');
		},
	},

	setup() {
		const store = useStore();

		return {
			store,
		};
	},
});
</script>

<style lang="scss" scoped>
	.projects {
		padding: 1.25rem;
	}
</style>
