<template>
  <div class="item">
      <div class="item2">
        <img :src="url + dish.image">
        <button @click="$router.push({ name: 'DishDetail', params: { dish: dish } })">
           {{ dish.title }}
        </button>
      </div>
    <button @click="addDishFunc">Add dish to menu</button>
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
      this.model.addMenu(this.dish);
      
    }
  }
};
</script>

<style>

.item {
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 200px;
    width: 200px;
    padding: 10px;
    
}

.item2 > img {
  display: flex;
  width: auto;
  height: 150px;
  width: 150px;
  flex-flow: wrap;
  padding: 10px;
}

</style>

