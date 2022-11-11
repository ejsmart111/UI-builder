import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFont, faSquare, faCircle, faStar, faPlay, faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import './style.css'
import vueCustomElement from 'vue-custom-element'
// import DropZone from './components/DropZone.vue'
import 'document-register-element/build/document-register-element'

Vue.config.productionTip = false
Vue.use(vueCustomElement);
library.add(faFont, faSquare, faCircle, faStar, faPlay, faSquareMinus)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.customElement('vue-widget', App)

// new Vue({
//     store,
//     render: h => h(App)
// }).$mount('#app')