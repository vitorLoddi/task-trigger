<template>
	<main
		class="columns is-gapless is-multline"
		:class="{ 'dark-mode': darkModeActive }"
	>
		<div class="column is-one-quarter">
			<sidebar @changeTheme="changeTheme" />
		</div>

		<div class="column is-three-quarter content">
			<notifications />
			<router-view />
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import Sidebar from '@/components/Sidebar.vue';
import Notifications from '@/components/Notifications.vue';

export default defineComponent({
	name: 'App',

	components: {
		Sidebar,
		Notifications,
	},

	data() {
		return {
			darkModeActive: false,
		};
	},

	methods: {
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
