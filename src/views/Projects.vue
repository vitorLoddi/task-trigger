<template>
	<section class="projects">
		<h1 class="title">Projetos</h1>

		<router-link to="/projetos/novo" class="button">
			<span class="icon is-small">
				<i class="fas fa-plus"></i>
			</span>

			<span>Novo Projeto</span>
		</router-link>

		<table class="table is-fullwidth">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nome do Projeto</th>
					<th>Ações</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="(project, index) in projects"
					:key="index"
				>
					<td>{{ project.id }}</td>
					<td>{{ project.name }}</td>
					<td>
						<router-link :to="`/projetos/${project.id}`" class="button">
							<span class="icon is-small">
								<i class="fas fa-pencil-alt"></i>
							</span>
						</router-link>
					</td>
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

	setup() {
		const store = useStore();

		return {
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
