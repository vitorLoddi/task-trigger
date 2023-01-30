<template>
	<div class="box">
		<div class="columns">
			<div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
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

			<div class="column">
				<timer
					@timerFinalized="endTask"
					@timerStarted="timerStarter = true"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Timer from '@/components/Timer.vue';

export default defineComponent({
	name: 'TaskForm',

	emits: [
		'saveTask',
	],

	data() {
		return {
			timerStarter: false,
			description: '',
		};
	},

	components: {
		Timer,
	},

	methods: {
		endTask(elapsedTime: number) : void {
			this.$emit('saveTask', {
				description: this.description,
				elapsedTime,
			});

			this.timerStarter = false;
			this.description = '';
		},
	},
});
</script>
