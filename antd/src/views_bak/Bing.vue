<template>
	<LeafletShp :url="LeafletShp0['url']" :zoom="LeafletShp0['zoom']" :attribution="LeafletShp0['attribution']" @L="e" @L="e"> </LeafletShp>
</template>

<script>
	import LeafletShp from "../components/leafletMap/LeafletShp.vue"
	
	
	export default {
		components: {
			LeafletShp
		},
		data() {
			return {
				"LeafletShp0": {
					"url": [
						"http://11.11.11.164:8080/geoserver/swat/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=swat%3Aamu_lower&outputFormat=application%2Fjson"
					],
					"zoom": 5,
					"attribution": "@ Your Company"
				}
			}
		},
		methods: {
			LeafletShp0mouseover() {
				console.log(arguments);
			},
			LeafletShp0click() {
				console.log(arguments);
			}
		}
	}
</script>