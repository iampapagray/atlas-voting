<template>
	<div id="login" >
		<div class="row">
		   	<div class="col s10 offset-s1 m4 offset-m4">
		     	<div class="card blue hoverable center">
		       		<div class="card-content white-text center">
						<span class="card-title">ATLAS Got Talent</span>
						<p>Enter your code from the coupon!</p>
		       			<form>
							<div class="input-field white-text">
								<input id="last_name" type="text" class="validate" v-model="mycode" autocomplete="false" >
								<!-- <label for="last_name">Last Name</label> -->
							</div>
							<button class="btn waves-effect waves-light" type="submit" name="action" @click="doSubmit">Submit <i class="far fa-paper-plane right"></i>
							</button>
						</form>
		       		</div>
		     	</div>
		   	</div>
		</div>
	</div>
</template>

<script>
	import router from '../router'
	import db from './firebaseInit'
	export default {
		name:'login',
		data () {
			return {
				mycode : "",
				codeState: null,
				quantity: null
			}
		},
		methods: {
			doSubmit(e){
				e.preventDefault()
				db.collection('codes').where('code','==',this.mycode).where('state','==','1').get()
				.then(querySnapshot => {
					if(querySnapshot.empty){
						console.log('not found')
						M.toast({html: 'Code is invalid or used!', classes: 'red'})
						return ''
					}
					querySnapshot.forEach(doc => {
						M.toast({html: 'Success', classes: 'green'})
						this.codeState = doc.data().state
						this.quantity = doc.data().quantity

						localStorage.setItem('user', JSON.stringify(doc.data()))
						localStorage.setItem('jwt', doc.id)

						if (localStorage.getItem('jwt') != null){
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else {
                                this.$router.push('vote')
                            }
                        }
					})
				})
				// router.push({ name: "cast-vote" })
			}
		}
	};
</script>

<style>
	.input-field label, .input-field {
	     color: #fff;
	}

	#login{
		width: 100%;
		/*text-align: center;*/
  		margin-top: 20%;
		/*align-self: center;*/
	}


</style>
