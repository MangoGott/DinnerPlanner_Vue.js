<template>
<div class="detail">
    <h3>{{$route.params.dish.title}}</h3>
    <img :src="url + $route.params.dish.image">
    <p>ID : {{$route.params.dish.id}}</p>
    <p>INFO: TO BE ANNOUNCED</p>
    <p> {{getInfo($route.params.dish.id)}} </p>
</div>
</template>

<script>
  // Alternative to passing the moderl as the component property,
  // we can import the model instance directly
  import modelInstance from "../data/DinnerModel";
 

  export default {
    // this methods is called by Vue lifecycle when the
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    data() {
      return {
        status: "LOADING",
        url: "https://spoonacular.com/recipeImages/"
      }
    },
    methods: {
      
      getInfo(id){
        modelInstance.getDish(id);
      }
    }
  }
</script>

<style>


.detail > img {
width: auto;
    height: 300px;
}

</style>
