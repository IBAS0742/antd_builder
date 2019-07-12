<template>
	<BaseLeafLet :url="BaseLeafLet0['url']" :params="BaseLeafLet0['params']" :zoom="BaseLeafLet0['zoom']" :attribution="BaseLeafLet0['attribution']"> </BaseLeafLet>
</template>

<script>
	import BaseLeafLet from "../components/leafletMap/BaseLeafLet.vue"
	
	
	export default {
		components: {
			BaseLeafLet
		},
		data() {
			return {
				"BaseLeafLet0": {
					"url": "http://11.11.11.164:8080/geoserver/et/wms",
					"params": {
						"styles": "et:et",
						"format": "image/png",
						"VERSION": "1.1.1",
						"layers": "et:ET_2016_113",
						"transparent": true
					},
					"zoom": 5,
					"attribution": "@ Your Company"
				}
			}
		},
		methods: {
	
		}
	}
</script>