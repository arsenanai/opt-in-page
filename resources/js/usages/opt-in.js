import Vue from 'vue'
import OptInApp from '../apps/OptInApp.vue'

Vue.config.productionTip = false
var optInApp = new Vue({
    render: h => h(OptInApp),
}).$mount('#opt-in-page')