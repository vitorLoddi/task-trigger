<template>
	<button
		class="button"
		:disabled="buttonDisabled"
		@click="$emit('buttonClicked')"
	>
		<span class="icon">
			<i :class="`fas ${icon}`"></i>
		</span>

		<span>
			{{ text }}
		</span>
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'BaseButtonWithIcon',

	emits: [
		'buttonClicked',
	],

	props: {
		icon: {
			type: String,
			required: true,
		},

		text: {
			type: String,
			required: true,
		},

		buttonDisabled: {
			type: Boolean,
			default: false,
		},
	},
});

</script>
