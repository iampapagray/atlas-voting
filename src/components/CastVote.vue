<template>
	<div id="cast-vote">
		<Navbar />
		<!-- <h3>Cast Vote</h3> -->
		<div class="row" style="margin-top: 5%">
		    <div class="col s12 m4" v-for="atlas in contestants" v-bind:key="atlas.id" style="margin-top: 2%">
		      <div class="card">
		        <div class="card-image">
		          <img :src="atlas.img" class="responsive-img imge">
		          <span class="card-title">{{ atlas.name }}</span>
		          <a class="btn-floating btn-lg halfway-fab waves-effect waves-light blue" :disabled="cast > 0" @click=vote(atlas.name)>
		          	<i class="fas fa-vote-yea"></i>
		          </a>
		        </div>
		        <div class="card-content">
		          <p>{{ atlas.region }}</p>
		        </div>
		      </div>
		    </div>
		</div>
	</div>
</template>

<script>
	import db from './firebaseInit'
	import Navbar from './Navbar'
	export default {
		name:'cast-vote',
		components:{
			Navbar
		},
		data () {
			return {
				contestants: [],
				cast : 0
			}
		},
		methods:{
			vote(name){
				this.cast++
				var codeData = JSON.parse(localStorage.getItem('user'))

				db.collection("votes").add({
					code: codeData.code,
				    name: name,
				    quantity: codeData.quantity
				})
				.then(function(docRef) {
				    console.log("Document written with ID: ", docRef.id);
				    M.toast({html: 'Voted Successfully!', classes: 'green', completeCallback:function(){
				    	localStorage.clear()
				    	location.reload(true)
				    } })
				})
				.catch(function(error) {
				    console.error("Error adding document: ", error);
				    M.toast({html: 'Voting failed!', classes: 'red'})

				    // reset code state and remove jwt
				    var docId = localStorage.getItem('jwt')
				    db.collection("codes").doc(docId).set({
				        state: "1"
				    }, {merge:true})
				    .then(function() {
				        console.log("Document successfully written!");
				        M.toast({html: 'Refresh page and try again!', classes: 'red'})
				        localStorage.clear()
				    })
				    .catch(function(error) {
				        console.error("Error writing document: ", error);
				    });
				});
			}
		},
		created () {
			db.collection('contestants').orderBy('name').get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					
					const data = {
						'id': doc.id,
						'name': doc.data().name,
						'atlas_id': doc.data().person_id,
						'region': doc.data().regions,
						'desc': doc.data().other,
						'img': require('@/assets/images/'+doc.data().name.toLowerCase()+'.jpeg')
					}
					this.contestants.push(data)
				})
			})

			// change code state here
			var docId = localStorage.getItem('jwt')
			db.collection("codes").doc(docId).set({
			    state: "0"
			}, {merge:true})
			.then(function() {
			    console.log("Document successfully written!");
			})
			.catch(function(error) {
			    console.error("Error writing document: ", error);
			});
		}
	};
</script>
