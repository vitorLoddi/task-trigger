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
import { AC_ADD_PROJECT, AC_CHANGE_PROJECT } from '@/store/type-actions';
import { TypeNotification } from '@/interfaces/INotification';

// Hooks
import useNotifier from '@/hooks/notifier';

export default defineComponent({
	name: 'Form',

	props: {
		id: {
			type: String,
		},
	},

	mounted() {
		if (this.id) {
			const project = this.store.state.project.projects.find((proj) => proj.id === this.id);

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
				this.store.dispatch(
					AC_CHANGE_PROJECT,
					{
						id: this.id,
						name: this.nameProject,
					},
				).then(() => {
					this.notifySuccessRegister();
				});
			} else {
				this.store.dispatch(AC_ADD_PROJECT, this.nameProject)
					.then(() => {
						this.notifySuccessRegister();
					});
			}
		},

		notifySuccessRegister() {
			this.nameProject = '';

			this.notify(
				'Excelente!',
				'O projeto foi cadastrado com sucesso!',
				TypeNotification.SUCCESS,
			);

			this.$router.push('/projetos');
		},
	},

	setup() {
		const store = useStore();
		const { notify } = useNotifier();

		return {
			store,
			notify,
		};
	},
});
</script>
