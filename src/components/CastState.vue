<template>
	<div id="cast-state">
		<h3>State of Vote Cast</h3>

		<table id="my-table"></table>

		<h5>List for Q1</h5>
		<p>{{ newList[0][0] }}</p>
		<button @click="storeCodes(newList[0], '1')">store q1.1</button>
		<button @click="trypdf(newList[0], '1 vote codes -1')">download q1.1</button>
		<p>{{ newList[1][0] }}</p>
		<button @click="storeCodes(newList[1], '1')">store q1.2</button>
		<button @click="trypdf(newList[1], '1 vote codes -2')">download q1.2</button>

		<h5>List for Q10</h5>
		<p>{{ newList[2][0] }}</p>
		<button @click="storeCodes(newList[2], '10')">store q10.1</button>
		<button @click="trypdf(newList[2], '10 vote codes -1')">download q10.1</button>
		<p>{{ newList[3][0] }}</p>
		<button @click="storeCodes(newList[3], '10')">store q10.2</button>
		<button @click="trypdf(newList[3], '10 vote codes -2')">download q10.2</button>
		<p>{{ newList[4][0] }}</p>
		<button @click="storeCodes(newList[4], '10')">store q10.3</button>
		<button @click="trypdf(newList[4], '10 vote codes -3')">download q10.3</button>
		<p>{{ newList[5][0] }}</p>
		<button @click="storeCodes(newList[5], '10')">store q10.4</button>
		<button @click="trypdf(newList[5], '10 vote codes -4')">download q10.4</button>

		<h5>List for Q20</h5>
		<p>{{ newList[6][0] }}</p>
		<button @click="storeCodes(newList[6], '20')">store q20.1</button>
		<button @click="trypdf(newList[6], '20 vote codes -1')">download q20.1</button>
		<p>{{ newList[7][0] }}</p>
		<button @click="storeCodes(newList[7], '20')">store q20.2</button>
		<button @click="trypdf(newList[7], '20 vote codes -2')">download q20.2</button>


		<h5>List for Q50</h5>
		<p>{{ newList[8][0] }}</p>
		<button @click="storeCodes(newList[8], '50')">store q50.1</button>
		<button @click="trypdf(newList[8], '50 vote codes -1')">download q50.1</button>
		<p>{{ newList[9][0] }}</p>
		<button @click="storeCodes(newList[9], '50')">store q50.2</button>
		<button @click="trypdf(newList[9], '50 vote codes -1')">download q50.2</button>
	</div>
</template>

<script>
	import db from './firebaseInit'
	import * as jsPDF from 'jspdf'
	import 'jspdf-autotable'
	
	export default {
		name:'cast-state',
		data () {
			return {
				list0 : ["fish","goat","djskldjlk","wWGanEQ","bqQgSot","avdo8Ts","3sfA7LJ","moLJZMx","R8tINbt","O9E06aA","fxLZSwS","NiAKNi8","pe1FHlq","Wakc4Ug","5acTcMR"],
				thelist :[],
				newList: [],
				weights : ["1","1","10","10","10","10","20","20","50","50"],
				counter: 0
			}
		},
		methods: {
			random(len, size){
				var possible = "QWERTYUPASDFGHJKLZXCVBNMqwertyupasdfghjkzxcvbnm0123456789"
				while(this.thelist.length < size){
					var text = ""

					for (var i = 0; i < len; i++) {
						text += possible.charAt(Math.floor(Math.random() * possible.length))
					}

					if(this.thelist.includes(text) == false){
						this.thelist.push(text)
					}
				}

				console.log("finished generating random codes")
			},
			chunkArray(myArray, chunk_size){
			    var index = 0;
			    var arrayLength = myArray.length;
			    
			    for (index = 0; index < arrayLength; index += chunk_size) {
			        var myChunk = myArray.slice(index, index+chunk_size);
			        // Do something if you want with the group
			        this.newList.push(myChunk);
			    }

				console.log("finished putting codes into chunks")
			},
			storeCodes(useList, quan){
				// var batch = db.batch()
				// for (var x = 0; x < useList.length; x++) {
				// 	var ref = db.collection('codes').doc()
				// 	var currentList = useList
				// 	console.log("adding " + ref + " with " + currentList[x])
				// 	batch.set(ref, { 
				// 		code: currentList[x],
				// 		quantity: quan,
				// 		state: "1" 
				// 	});

				// 	this.counter++
				// }
				// console.log('Do commit: ')
				// batch.commit().then(function () {
				//     console.log("done  ")
				// });

				console.log("finished writing all codes for " + useList[0])
			},
			trypdf(mainList, name){
				var doc = new jsPDF({
				  orientation: 'landscape'
				})
				doc.autoTable({html: '#my-table'})
				var col = ["Code","Code","Code","Code","Code", "Code","Code","Code","Code","Code"]
				var rows = []

				for (var i = 0; i < mainList.length; ) {
					var temp = [mainList[i], mainList[i+1], mainList[i+2], mainList[i+3], mainList[i+4], mainList[i+5], mainList[i+6], mainList[i+7], mainList[i+8], mainList[i+9]]
					rows.push(temp);

					i = i+10
				}

				doc.autoTable({
					head: [col],
					body: rows,
					startY: 10
				})
				doc.save(name+'.pdf')

				console.log("done saving")
			},
			checkSizeOfCodes(){
				db.collection('codes').get().then(querySnapshot => {
					console.log(querySnapshot)
				})
			}
		},
		created() {
			this.random(8, 5000)
			// console.log("List is " + this.thelist.length)
			this.chunkArray(this.thelist, 500)
			// this.storeCodes()
			// this.trypdf()
			// this.checkSizeOfCodes()


			db.collection('codes').where('code','==','0a27cWmY').get().then(querySnapshot => {
				if(querySnapshot.empty){
					console.log('not found')
				}

				querySnapshot.forEach(doc => {
					console.log(doc.data())
				})
			})
		}
	};
</script>
