<template>
	<task-form @saveTask="saveTask" />

	<div class="list">
		<task
			v-for="(task, index) in toDoList"
			:key="index"
			:task="task"
		/>

		<box v-if="listIsEmpty">
			<p>Hoje você não está muito produtivo :(</p>
		</box>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import TaskForm from '@/components/TaskForm.vue';
import Task from '@/components/Task.vue';
import Box from '@/components/Box.vue';

// Interfaces
import ITask from '@/interfaces/ITask';

export default defineComponent({
	name: 'App',

	components: {
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
		saveTask(task: ITask) : void {
			this.toDoList.push(task);
		},
	},
});
</script>
