<template>
	<main
		class="columns is-gapless is-multline"
		:class="{ 'dark-mode': darkModeActive }"
	>
		<div class="column is-one-quarter">
			<sidebar @changeTheme="changeTheme" />
		</div>

		<div class="column is-three-quarter content">
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
			darkModeActive: false,
		};
	},

	computed: {
		listIsEmpty() : boolean {
			return !this.toDoList.length;
		},
	},

	methods: {
		saveTask(task : ITask) : void {
			this.toDoList.push(task);
		},

		changeTheme(darkModeActive : boolean) : void {
			this.darkModeActive = darkModeActive;
		},
	},
});
</script>

<style lang="scss">
	.list {
		padding: 1.25rem;
	}

	main {
		--primary-bg: #FFFFFF;
		--primariy-text: #000000;
	}

	main.dark-mode {
		--primary-bg: #2b2d42;
		--primariy-text: #dddddd;
	}

	.content {
		background-color: var(--primary-bg);
	}
</style>
