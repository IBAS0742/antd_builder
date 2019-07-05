import Vue from 'vue'
import VueStorage from 'vue-ls'
import * as kw from "./keyword";

Vue.use(VueStorage,{
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
});

Vue.ls.set(kw.ROUTER_ADDED,false);