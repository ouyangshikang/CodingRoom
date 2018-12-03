<template>
	<div id="app">
		<bt-drag
			:list="list"
			@moveList="moveList"
		>
		</bt-drag>
	</div>
</template>

<script>

import btDrag from './components/bt-drag.vue';
export default {
	components: {
		btDrag
	},
	data() {
		return {
			list: [1, 2, 3, 4, 5, 6],
			transferIndex: null
		};
	},
	methods: {
		moveList(params) {
			this.list = params;
		},
		showTarget(index) {
			this.transferIndex = index;
		}
	}
};
</script>

<style lang="scss" scoped>

</style>