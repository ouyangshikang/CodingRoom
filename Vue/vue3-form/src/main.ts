import { createApp, defineComponent, h } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
// import App from './App.vue';

const App = defineComponent({
    render() {
        return h('div', { id: 'app' }, [
            h('img', {
                alt: 'Vue logo',
                src: 'https://vue3js.cn/docs/logo.png'
            }),
            h(HelloWorld, {
                age: 12
            })
        ])
    }
})

createApp(App).mount('#app');
