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

		<table class="table is-fullwidth">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nome do Projeto</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="(project, index) in projects"
					:key="index"
				>
					<td>{{ project.id }}</td>
					<td>{{ project.name }}</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

// Interfaces
import { useStore } from '@/store';

export default defineComponent({
	name: 'Projects',

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
		},
	},

	setup() {
		const store = useStore();

		return {
			store,
			projects: computed(() => store.state.projects),
		};
	},
});
</script>

<style lang="scss" scoped>
	.projects {
		padding: 1.25rem;
	}
</style>
