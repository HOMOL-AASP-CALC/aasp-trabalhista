import Vue from 'vue'
import App from './App.vue'
import store from './store'
import io from 'socket.io-client';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faRepeat } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faImagePortrait } from '@fortawesome/free-solid-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faBug } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'


library.add(faArrowLeft)
library.add(faArrowRight)
library.add(faGear)
library.add(faPrint)
library.add(faFilePdf)
library.add(faBars)
library.add(faRepeat)
library.add(faPen)
library.add(faXmark)
library.add(faPlus)
library.add(faImagePortrait)
library.add(faShare)
library.add(faUsers)
library.add(faBug)


Vue.component('font-awesome-icon', FontAwesomeIcon) 
Vue.config.productionTip = false

// console.log('process.env.VUE_APP_SERVIDOR - a - ',process.env.VUE_APP_SERVIDOR)

// if (process.env.VUE_APP_SERVIDOR == 'https://api.debit.com.br/t') {
//   Vue.prototype.$socket = io(process.env.VUE_APP_SERVIDOR, { transports : ['websocket'], path: "/t/" });
// } else {
  Vue.prototype.$socket = io(process.env.VUE_APP_SERVIDOR, { transports : ['websocket'] });
// }


import './assets/relatorios.css' 

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
