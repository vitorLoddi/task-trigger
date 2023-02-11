<template>
	<div class="box form">
		<div class="columns">
			<div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
				<label for="task">
					<input
						id="task"
						type="text"
						class="input"
						placeholder="Qual tareda você deseja iniciar?"
						v-model="description"
						:disabled="timerStarter"
					/>
				</label>
			</div>

			<div class="column is-3">
				<div class="select">
					<label for="selectProjects">
						<select
							id="selectProjects"
							v-model="idProject"
						>
							<option value="">Selecione o projeto</option>

							<option
								v-for="project in projects"
								:key="project.id"
								:value="project.id"

							>
								{{ project.name }}
							</option>
						</select>
					</label>
				</div>
			</div>

			<div class="column">
				<timer
					@timerFinalized="endTask"
					@timerStarted="timerStarter = true"
					:idProject = idProject
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

// Components
import Timer from '@/components/Timer.vue';
import { useStore } from '@/store';
import { NOTIFY } from '@/store/type-mutations';
import { TypeNotification } from '@/interfaces/INotification';

export default defineComponent({
	name: 'TaskForm',

	emits: [
		'saveTask',
	],

	data() {
		return {
			timerStarter: false,
			description: '',
			idProject: '',
		};
	},

	components: {
		Timer,
	},

	methods: {
		endTask(elapsedTime: number) : void {
			const project = this.projects.find((p) => p.id === this.idProject);

			if (!project) {
				this.store.commit(NOTIFY, {
					title: 'Ops!',
					text: 'Selecione um projeto antes de finalizar a tarefa!',
					type: TypeNotification.FAILURE,
				});

				return;
			}

			this.$emit('saveTask', {
				description: this.description,
				elapsedTime,
				project,
			});

			this.timerStarter = false;
			this.description = '';
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
	.box.form {
		background-color: var(--primary-bg);
	}
</style>
