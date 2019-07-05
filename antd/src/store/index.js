import Vue from 'vue'
import Vuex from 'vuex'
import permission from './permission'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ...permission
    }
})
