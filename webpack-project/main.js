import '@babel/polyfill'

import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

document.body.appendChild(new Vue({
    components: {
        App: () => import('./app.vue')
    },
    data: {
        message: 'Hello Vue!'
    },
    render(h) {
        return h('App');
    },
    beforeCreate() {
    }
}).$mount(document.createElement('div')).$el);
