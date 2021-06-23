import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import Router from 'vue-router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import VueBlobJsonCsv from 'vue-blob-json-csv';

library.add(fab, fas, far);

import VueLayers from 'vuelayers';

import 'vue-toastification/dist/index.css';
import './styles/main.scss';

import axios from 'axios';
import Buefy from 'buefy';
import Toast from 'vue-toastification';
import i18n from '@/localization/localization';

import './registerServiceWorker';

Vue.config.productionTip = false;

axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.use(VueBlobJsonCsv);
Vue.use(VueLayers);
Vue.use(Router);
Vue.use(Buefy, {
    defaultIconComponent: 'font-awesome-icon',
    defaultIconPack: 'fa',
});
Vue.use(Toast, {
    position: 'bottom-left',
});

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app');
