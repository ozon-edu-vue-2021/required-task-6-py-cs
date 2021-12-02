import Vue from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSortAmountUp,
  faSortAmountDown,
  faSort,
  faFilter,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VTooltipPlugin from 'v-tooltip'
import VueVirtualScroller from 'vue-virtual-scroller'

import 'v-tooltip/dist/v-tooltip.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'


library.add(faSortAmountUp, faSortAmountDown, faSort, faFilter, faTimes);

Vue.use(VTooltipPlugin);
Vue.use(VueVirtualScroller)

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  render: h => h(App)
}).$mount('#app');
