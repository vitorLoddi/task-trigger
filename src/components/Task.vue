<template>
	<box>
		<div class="columns pointer" @click="taskClicked">
			<div class="column is-4">
				{{ task.description || 'Tarefa não identificada' }}
			</div>

			<div class="column is-3">
				{{ task.project?.name || 'N/D' }}
			</div>

			<div class="column">
				<stopwatch
					:time="task.elapsedTime"
				/>
			</div>
		</div>
	</box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

// Components
import Box from '@/components/Box.vue';
import Stopwatch from '@/components/Stopwatch.vue';

// Interfaces
import ITask from '@/interfaces/ITask';

export default defineComponent({
	name: 'Task',

	components: {
		Box,
		Stopwatch,
	},

	emmits: [
		'taskClicked',
	],

	props: {
		task: {
			type: Object as PropType<ITask>,
			required: true,
		},
	},

	methods: {
		taskClicked() : void {
			this.$emit('taskClicked', this.task);
		},
	},

});
</script>

<style lang="scss" scoped>
	.pointer {
		cursor: pointer;
	}
</style>
