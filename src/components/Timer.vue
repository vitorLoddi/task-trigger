<template>
	<div class="is-flex is-align-items-center is-justify-content-space-between">
		<stopwatch :time="timeSeconds" />

		<base-button-with-icon
			text="start"
			icon="fa-play"
			:buttonDisabled="timerIsActive"
			@buttonClicked="start"
		/>

		<base-button-with-icon
			text="stop"
			icon="fa-stop"
			:buttonDisabled="!timerIsActive"
			@buttonClicked="finalize"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import Stopwatch from '@/components/Stopwatch.vue';
import BaseButtonWithIcon from '@/components/Base/BaseButtonWithIcon.vue';

export default defineComponent({
	name: 'Timer',

	emits: [
		'timerStarted',
		'timerFinalized',
	],

	components: {
		Stopwatch,
		BaseButtonWithIcon,
	},

	props: {
		idProject: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			timeSeconds: 0,
			stopwatch: 0,
		};
	},

	computed: {
		timerIsActive() : boolean {
			return !!this.timeSeconds;
		},

		projectIsSelected() : boolean {
			return !!this.idProject;
		},
	},

	methods: {
		start() : void {
			this.$emit('timerStarted');

			this.stopwatch = setInterval(() => {
				this.timeSeconds += 1;
			}, 1000);
		},

		finalize() : void {
			clearInterval(this.stopwatch);

			this.$emit('timerFinalized', this.timeSeconds);

			if (this.projectIsSelected) {
				this.timeSeconds = 0;
			}
		},
	},
});
</script>

<style>

</style>
