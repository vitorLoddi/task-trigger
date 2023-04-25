<template>
	<div class="notifications">
		<article
			v-for="notification in notifications"
			:key="notification.id"
			:class="`message ${situation[notification.type]}`"
		>
			<div class="message-header">
				{{ notification.title }}
			</div>

			<div class="message-body">
				{{ notification.text }}
			</div>
		</article>
	</div>
</template>

<script lang="ts">
import { TypeNotification } from '@/interfaces/INotification';
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
	name: 'Notifications',

	data() {
		return {
			situation: {
				[TypeNotification.SUCCESS]: 'is-success',
				[TypeNotification.ATTENTION]: 'is-warning',
				[TypeNotification.FAILURE]: 'is-danger',
			},
		};
	},

	setup() {
		const store = useStore();

		return {
			notifications: computed(() => store.state.notifications),
		};
	},
});
</script>

<style lang="scss" scoped>
	.notifications {
		position: absolute;
		right: 0;
		width: 300px;
		padding: 8px;
		z-index: 2;
	}
</style>
