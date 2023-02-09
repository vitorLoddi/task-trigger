<template>
	<section>
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
import { ADD_PROJECT, CHANGE_PROJECT } from '@/store/type-mutations';

export default defineComponent({
	name: 'Form',

	props: {
		id: {
			type: String,
		},
	},

	mounted() {
		if (this.id) {
			const project = this.store.state.projects.find((proj) => proj.id === this.id);

			this.nameProject = project?.name || '';
		}
	},

	data() {
		return {
			nameProject: '',
		};
	},

	methods: {
		saveProject() {
			if (this.id) {
				this.store.commit(
					CHANGE_PROJECT,
					{
						id: this.id,
						name: this.nameProject,
					},
				);
			} else {
				this.store.commit(
					ADD_PROJECT,
					this.nameProject,
				);
			}

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
