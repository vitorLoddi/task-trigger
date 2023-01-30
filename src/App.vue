<template>
	<main class="columns is-gapless is-multline">
		<div class="column is-one-quarter">
			<sidebar />
		</div>

		<div class="column is-three-quarter">
			<task-form
				@saveTask="saveTask"
			/>

			<div class="list">
				<task
					v-for="(task, index) in toDoList"
					:key="index"
					:task="task"
				/>

				<box
					v-if="listIsEmpty"
				>
					<p>Você não está muito produtivo hoje :(</p>
				</box>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import Sidebar from '@/components/Sidebar.vue';
import TaskForm from '@/components/TaskForm.vue';
import Task from '@/components/Task.vue';
import Box from '@/components/Box.vue';

// Interfaces
import ITask from '@/interfaces/ITask';

export default defineComponent({
	name: 'App',

	components: {
		Sidebar,
		TaskForm,
		Task,
		Box,
	},

	data() {
		return {
			toDoList: [] as ITask[],
		};
	},

	computed: {
		listIsEmpty() : boolean {
			return !this.toDoList.length;
		},
	},

	methods: {
		saveTask(task : ITask) {
			this.toDoList.push(task);
		},
	},
});
</script>

<style lang="scss" scoped>
.list {
	padding: 1.25rem;
}
</style>
