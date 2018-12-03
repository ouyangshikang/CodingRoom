<style lang="scss">
	.bt-drag {
		margin: 200px auto;
		width: 100%;
		height: 66px;
		background:rgb(234, 238, 243);
		display: flex;
		font-family: 'PingFang-SC-Medium';
		overflow-x: auto;
		overflow-y: hidden;


		.test-layout {
			position: relative;
			width:71px;
			height: 46px;
			margin-left: 8px;
			border: 2px solid transparent;
			border-radius:2px;
			box-shadow:0px 2px 4px 0px rgba(0, 102, 255, 0.12);
			box-sizing: border-box;
			background: #fefefe;
			text-align: center;
			margin: auto;
			cursor: pointer;
			span {
				color: #5F9BFF;
				font-size: 32px;
				line-height: 32px;
				user-select: none;
			}
		}

		.pages-list {
            display: flex;
			margin: auto;
			align-items: center;
			padding: 0;
			.pages-layout {
				position: relative;
				width:71px;
				height: 46px;
				margin-left: 8px;
				border: 2px solid transparent;
				border-radius:2px;
				box-shadow:0px 2px 4px 0px rgba(0, 102, 255, 0.12);
				box-sizing: border-box;
				background: #fefefe;
				// cursor: pointer;
				transition: all .5s;
				display: inline-block;
				overflow: hidden;
				&:hover{
					box-shadow:0px 5px 4px 0px rgba(0, 102, 255, 0.12);
				}
				&.active {
					border-color: #005CF9;
					border-width: 2px;
				}
				&:first-child {
					margin-left: 13px;
				}
				cursor: pointer;
				// cursor: url('./drag.png') 33 33, auto;
			}
			.symbol {
				margin-left: 8px;
				width: 2px;
				height: 60px;
				background: #005CF9;
				position: relative;
				transition: all linear 1s;
				&::before, &::after {
					content: '';
					display: block;
					border-radius: 50%;
					border-top: 3px solid transparent;
					border-left: 3px solid transparent;
					border-right: 3px solid #005CF9;
					border-bottom: 3px solid #005CF9;
					position: absolute;
					left: -2px;
				}
				&::before {
					top: -4px;
					transform: rotatez(45deg);
				}
				&::after {
					bottom: -4px;
					transform: rotateZ(-135deg);
				}
			}
			.list-leave-active {
				position: absolute;
			}
			.list-enter, .list-leave-to {
				opacity: 0;
				transform: translateY(30px);
			}

        }

	}
</style>


<template>
	<div class="bt-drag">
		<!-- <ul class="pages-list"> -->
			<transition-group class="pages-list" tag="ul" name="list">
				<li
					v-for="(item, index) in arrList"
					:key="index"
					class="pages-layout"
					draggable="true"
					@dragstart="onDragStart($event, index)"
					@dragenter="onDragOver($event, index)"
					@dragover.prevent="onDragOver($event, index)"
					@dragleave="onDragLeave($event)"
					@drop="onDrop($event, index)"
					@dragend="onDragEnd($event)"
				>
					{{item}}
				</li>
				<!-- <slot></slot> -->

			</transition-group>
			<!-- <div class="sympol"></div> -->
			<div class="test-layout" @click="addLayout">
				<span>+</span>
			</div>
		<!-- </ul> -->
	</div>
</template>

<script>


export default {
	props: {
		list: {
			type: Array,
			default: []
		},
		targetIndex: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			arrList: this.list,
			initDragIndex: null
		};
	},
	computed: {

	},
	methods: {
		onDragStart(e, index) {
			e.target.style.opacity = '0.4';
			// e.target.style.cursor = 'url("./drag.png") 10 10, auto';
			e.target.style.borderColor = 'transparent';
			this.initDragIndex = index;
		},
		onDragOver(e, index) {
			console.log('dragover', e);
			const target = e.target;
			if(this.initDragIndex === index) {
				return;
			}
			this.addDropeffects(target, index);
		},
		onDragLeave() {
			// console.log('dragleave', e);
			this.clearDropeffects();
		},
		onDrop(index) {
			// console.log('drop', e);
			this.dragChange(this.initDragIndex, index);
		},
		onDragEnd(e) {
			console.log('dragend', e);
			e.target.style.opacity = '1';
			e.target.style.borderColor = '';
			// e.target.style.cursor = 'pointer';
			this.clearDropeffects();
		},
		addDropeffects(targetElement, index){
			this.clearDropeffects();
			const symbol = document.createElement('div');
			symbol.setAttribute('class', 'symbol');

			const parent = targetElement.parentNode;
			// 往右边拖拽
			if(this.initDragIndex < index) {
				if(parent.lastChild === targetElement) {
					parent.appendChild(symbol);
				}
				else {
					parent.insertBefore(symbol, targetElement.nextSibling);
				}
			}
			// 往左边拖拽
			else {
				parent.insertBefore(symbol, targetElement);
			}
		},
		clearDropeffects() {
			const parentElem = document.querySelector('.pages-list');
			const childElem = document.querySelector('.symbol');
			if(childElem) {
				parentElem.removeChild(childElem);
			}
		},
		sortArray(arr, fromIndex, toIndex){
			arr = [].concat(arr);
			let item = arr.splice(fromIndex, 1)[0];
			arr.splice(toIndex , 0, item);
			return arr;
		},
		dragChange(fromIndex, toIndex) {
			if(fromIndex === toIndex) {
				return;
			}
			this.arrList = this.sortArray(this.arrList, fromIndex, toIndex);
			this.$emit('moveList', this.arrList);
		},

		addLayout() {
			let len = this.arrList.length;
			this.arrList.push(++len);
		},
		removeLayout() {
			this.arrList.pop();
		}
	},
	watch: {
		list: {
			deep: true,
			handler(val) {
				this.arrList = val;
			}
		}
	}
};
</script>
