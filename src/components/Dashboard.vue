<template>
	<div id="dashboard">
		<Navbar />

			<div class="row">

				<div class="col s10 offset-s1">
					<bar-chart></bar-chart>
				</div>

			</div>
		
	</div>
</template>

<script>
	import db from './firebaseInit'
	import BarChart from '@/components/BarChart'
	import Navbar from './Navbar'
	export default {
		name:'dashboard',
		components: {
		      BarChart,
		      Navbar
		},
		data () {
			return {
			}
		}
		  
	};
	
</script>

<style scoped>
	.row {
	    padding-top: 50px;
	}

	#dashboard{
		width: 100%
	}
</style>
