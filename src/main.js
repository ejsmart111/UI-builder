import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFont, faSquare, faCircle, faStar, faPlay, faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import './style.css'

Vue.config.productionTip = false
library.add(faFont, faSquare, faCircle, faStar, faPlay, faSquareMinus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')