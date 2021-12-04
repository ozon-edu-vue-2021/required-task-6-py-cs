import Vue from 'vue';
import App from './App.vue';
// import Test from './Test.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSortAmountUp,
  faSortAmountDown,
  faSort,
  faFilter,
  faTimes,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Directive } from '@/directives/detect-viewport';
import VueVirtualScroller from 'vue-virtual-scroller'

import 'v-tooltip/dist/v-tooltip.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'


library.add(faSortAmountUp, faSortAmountDown, faSort, faFilter, faTimes, faTrash);

Vue.use(VueVirtualScroller)

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.directive('detect-viewport', Directive);

new Vue({
  render: h => h(App)
}).$mount('#app');
