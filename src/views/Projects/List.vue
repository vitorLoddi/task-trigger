<template>
	<section>
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
					<td>
						{{ project.id }}
					</td>

					<td>
						{{ project.name }}
					</td>

					<td>
						<router-link :to="`/projetos/${project.id}`" class="button">
							<span class="icon is-small">
								<i class="fas fa-pencil-alt"></i>
							</span>
						</router-link>

						<button
							class="button ml-2 is-danger"
							@click="exclude(project.id)"
						>
							<span class="icon is-small">
								<i class="fas fa-trash"></i>
							</span>
						</button>
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
import { DELETE_PROJECT } from '@/store/type-mutations';

export default defineComponent({
	name: 'List',

	methods: {
		exclude(id: string) {
			this.store.commit(DELETE_PROJECT, id);
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
