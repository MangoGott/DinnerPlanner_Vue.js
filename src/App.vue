<template>
  <div id="app">
   <div class="header"> 
    <h1>Dinner Planner</h1>
   </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}

</script>
<style>
.header{
    display: flex;
	justify-content: center;
	background-color: #EE4035;
	font: 20px/1.37 Ubuntu, sans-serif;
	border-left: 0.25rem solid #EE4035;
	background: #EE4035;
	color: white; 
	width: auto;
}

h1 {
	font-family: 'Helvetica', 'Arial Narrow', Arial, sans-serif;
	font-size: 50px;
	font-weight: normal;
	text-transform: uppercase;
	letter-spacing: 4px;
	
}

h2 {
  font-family: 'Helvetica', 'Arial Narrow', Arial, sans-serif;
	font: bold;
  
}

h3 {
	font: 20px/1.37 Ubuntu, sans-serif;
	text-transform: uppercase;
	border-left: 0.25rem solid #EE4035;
	color: #EE4035; 
	padding: 0.25rem;

}

img {
	/* FIXA SÅ BILDERNA SPRÄNGS*/
	width: auto;
	height: auto;
}

button {
	width: 100px;
}

</style>

