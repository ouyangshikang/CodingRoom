<template>
	<div :class="['todo-item', todo.completed ? 'completed' : '']">
		<input
			type="checkbox"
			class="toggle"
			v-model="todo.completed"
		>
		<label>{{todo.content}}</label>
		<button class="destory" @click="deleteTodo"></button>
	</div>
</template>

<script>
export default {
	props: {
		todo: {
			type: Object,
			required: true
		}
	},
	methods: {
		deleteTodo() {
			this.$emit('del', this.todo.id);
		}
	}
};
</script>

<style lang="scss" scoped>
.todo-item {
    position: relative;
    border-bottom: 1px solid rgba(0,0,0,.06);
    font-size: 24px;
    background-color: #fff;

    &:hover {
        .destory::after {
            content: "×";
        }
    }
    label {
        margin-left: 45px;
        display: block;
        padding: 15px 60px 15px 15px;
        line-height: 1.2;
        white-space: pre-line;
        word-break: break-all;
        transition: color .4s;
    }
    &.completed {
        label {
            text-decoration: line-through;
            color: #d9d9d9;
        }
    }
}
.toggle {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 40px;
    height: 40px;
    border: none;
    text-align: center;
    outline: none;

    appearance: none;
    &::after {
        content: url("../assets/images/round.svg");
    }
    &:checked:after {
        content: url("../assets/images/done.svg");
    }
}
.destory {
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    margin: auto 0;
    margin-bottom: 11px;
    width: 40px;
    height: 40px;
    border-width: 0;
    font-size: 30px;
    outline: none;
    color: #cc9a9a;
    background-color: transparent;
    cursor: pointer;
    transition: color .2s ease-out;

    appearance: none;
}

</style>


