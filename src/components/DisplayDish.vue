<template>
  <div class="display">
      <div class="item">
        <img :src="url + dish.image">
        <p>{{ dish.title }}</p>
      </div>
    
  </div>
</template>

<script>
export default {
  props: ["model", "dish"],
  created() {
    this.model.addObserver(this);
  },

  // this is called when component is removed destroyed
  // good place to remove observer
  beforeDestroy() {
    this.model.removeObserver(this);
  },
  data() {
    return {
      url: ""
    };
  },
  mounted(){
    if (this.dish.image){
    if (this.dish.image.includes('https')){
      this.url = "";
    }
    else{
      this.url = "https://spoonacular.com/recipeImages/";
    }
  }
  }
};
</script>

<style>

.display > p {
  color:black;
}

</style>