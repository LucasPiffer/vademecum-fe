import Vue from 'vue'
import Router from 'vue-router'
import Laws from './components/Laws.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'laws',
            component: Laws
        }
    ]
})