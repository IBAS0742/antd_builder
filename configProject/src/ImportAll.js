import Vue from 'vue'

import HeaderSCPage from './components/_comp_/layout/HeaderSC/HeaderSCPage';
// Vue.use(HeaderSCPage);
Vue.component(HeaderSCPage.name,HeaderSCPage);

import SliderHCFPage from './components/_comp_/layout/SliderHCF/SliderHCFPage';
// Vue.use(SliderHCFPage);
Vue.component(SliderHCFPage.name,SliderHCFPage);

import './components/_comp_/leafletMap/utils/DomUtils';
import LeafletShp from './components/_comp_/leafletMap/LeafletShp.vue';
Vue.component(LeafletShp.name,LeafletShp);

import MyDefinedOne from './components/_comp_/MyDefinedOne/MyDefinedOne.vue';
Vue.component(MyDefinedOne.name,MyDefinedOne);