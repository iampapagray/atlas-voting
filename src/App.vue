<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="container center valign-wrapper">
    	<router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  }
};
</script>

<style>

  html, body {
      height: 100%;
      margin: 0px;
  }

  .container{
    height: 100%;
    
  }

  body{
    background: darkorange;
  }

</style>
