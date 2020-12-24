<template>
    <div class="hello">
        <h1>{{ age }}</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const PropsType = {
    age: {
        type: Number,
        required: true,
    },
} as const;
export default defineComponent({
    name: 'HelloWorld',
    props: PropsType,
    mounted() {
        this.age;
    },
});
</script>
