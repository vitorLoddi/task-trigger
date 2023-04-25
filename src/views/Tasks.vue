<template>
	<task-form @saveTask="saveTask" />

	<div class="list">
		<task
			v-for="(task, index) in toDoList"
			:key="index"
			:task="task"
			@taskClicked="selectTask"
		/>

		<box v-if="listIsEmpty">
			<p>Hoje você não está muito produtivo :(</p>
		</box>

		<div
			class="modal"
			:class="{'is-active': selectedTask}"
			v-if="selectedTask"
		>
			<div class="modal-background"></div>

			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">
						Editando tarefa
					</p>

					<button class="delete" aria-label="close" @click="closeModal" />
				</header>

				<section class="modal-card-body">
					<div class="field">
						<label
							for="descriptionTask"
							class="label"
						>
							Descrição
							<input
								type="text"
								id="descriptionTask"
								class="input"
								v-model="selectedTask.description"
							>
						</label>
					</div>
				</section>

				<footer class="modal-card-foot">
					<button
						class="button is-success"
						@click="saveChangeTask"
					>
						Salvar Alterações
					</button>

					<button
						class="button"
						@click="closeModal"
					>
						Cancelar
					</button>
				</footer>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

// Components
import TaskForm from '@/components/TaskForm.vue';
import Task from '@/components/Task.vue';
import Box from '@/components/Box.vue';

// Interfaces
import { useStore } from '@/store';
import {
	AC_GET_TASKS, AC_ADD_TASK, AC_GET_PROJECTS, AC_CHANGE_TASK,
} from '@/store/type-actions';
import ITask from '@/interfaces/ITask';
import { TypeNotification } from '@/interfaces/INotification';

// Hooks
import useNotifier from '@/hooks/notifier';

export default defineComponent({
	name: 'App',

	components: {
		TaskForm,
		Task,
		Box,
	},

	data() {
		return {
			selectedTask: null as ITask | null,
		};
	},

	methods: {
		saveTask(task: ITask) {
			this.store.dispatch(AC_ADD_TASK, task)
				.then(() => {
					this.notify(
						'Excelente!',
						'A tarefa foi cadastrada com sucesso!',
						TypeNotification.SUCCESS,
					);
				});
		},

		selectTask(task: ITask) {
			this.selectedTask = task;
		},

		closeModal() {
			this.selectedTask = null;
		},

		saveChangeTask() {
			this.store.dispatch(AC_CHANGE_TASK, this.selectedTask)
				.then(() => {
					this.notify(
						'Excelente!',
						'A tarefa foi alterada com sucesso!',
						TypeNotification.SUCCESS,
					);

					this.closeModal();
				});
		},
	},

	computed: {
		listIsEmpty() : boolean {
			return !this.toDoList.length;
		},
	},

	setup() {
		const store = useStore();
		const { notify } = useNotifier();

		store.dispatch(AC_GET_PROJECTS);
		store.dispatch(AC_GET_TASKS);

		return {
			store,
			toDoList: computed(() => store.state.tasks),
			notify,
		};
	},
});
</script>
