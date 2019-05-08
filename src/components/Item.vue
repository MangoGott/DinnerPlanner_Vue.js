<template>
  <div class="item">
      <div class="item2">
        <img :src="url + dish.image">
       
     <router-link to=/dishdetail>
        <button @click="godishDetails">
           {{ dish.title }}
        </button>
    </router-link>


    <button @click="addDishFunc">Add dish</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["model", "dish"],
  data() {
    return {
      url: "https://spoonacular.com/recipeImages/"
    };
  },
  methods: {
    update() {
      this.menu = this.model.getMenu();
    },
    addDishFunc() {
      
      this.model.getDish(this.dish.id)
      .then(elem => {
          this.model.addMenu(elem);
      })
      .catch((error) => {
               // alert("Couldn't complete fetch :(" + error);
      });
    }, godishDetails(){
      console.log("Pushed:" + this.dish.id);
      this.model.setSelectedDish(this.dish.id);
    }
  }
};
</script>

<style>

.item {
    display: flex;
    align-items: center;
    flex-flow: column;
    flex-wrap: wrap;
    height: auto;
    width: 200px;
    padding: 10px;
    color: black;
    
}

.item2 > img {
  display: flex;
  width: auto;
  height: 100px;
  width: 100px;
  flex-flow: wrap;
  padding: 10px;
}

</style>

