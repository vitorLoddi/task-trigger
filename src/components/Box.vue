<template>
	<div class="box has-text-weight-bold">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Box',
});
</script>

<style lang="scss" scoped>
.box {
	background: #FAFCAF;
}
</style>
