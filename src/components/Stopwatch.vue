<template>
	<div class="holder-time">
		<strong>{{ elapsedTime }}</strong>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Stopwatch',

	props: {
		time: {
			type: Number,
			default: 0,
		},
	},

	computed: {
		elapsedTime() : string {
			return new Date(this.time * 1000).toISOString().substr(11, 8);
		},
	},
});
</script>

<style lang="scss" scoped>
	.holder-time strong {
		color: var(--primariy-text);
	}

</style>
