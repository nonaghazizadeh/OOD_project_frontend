import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

library.add(faUserTie);
library.add(faEnvelope);
library.add(faPhone);
library.add(faLock);
library.add(faArrowRightFromBracket);
library.add(faGear);
library.add(faMagnifyingGlass);
library.add(faCircleInfo);
library.add(faShare);
library.add(faPlus);
library.add(faMinus);
library.add(faDollarSign);
library.add(faClose);
library.add(faTrash);
library.add(faUserPlus);
library.add(faUserMinus);
library.add(faThumbsUp);
library.add(faThumbsDown);
library.add(faFileCirclePlus);
library.add(faCreditCard);

Vue.component('font-awesome-icon', FontAwesomeIcon)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
