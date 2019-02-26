<template>
  <div class="Dishes">
    <h3>Dishes</h3>
    
      <em v-if='status === "LOADING"'>Loading...</em>
      <b v-else-if='status === "ERROR"'>Failed to load data, please try again</b>
      <div class="dishes">
      <item v-for="dish in dishes" :id="dish.id" :key="dish.id" :dish="dish" :model="model"></item>
      </div>
  </div>
</template>

<script>
//TO DO: Everytime I notify Observer, you update all the components, this might create alot of fetches!!

  import modelInstance from "../data/DinnerModel";
  import Item from "@/components/Item";
  
  export default {  
    props: ["model"],
    components: {
      item: Item
    },
    mounted() {
      // when data is retrieved we update it's properties
      // this will cause the component to re-render
      /*
      modelInstance.getAllDishes().then(dishes => {
        this.status = "LOADED"
        this.dishes = dishes.results
      }).catch(() => {
        this.status = "ERROR"
      })
      modelInstance.addObserver(this);
    }
    */
      modelInstance.searchDish().then(dishes => {
        this.status = "LOADED"
        this.dishes = dishes.results
      }).catch(() => {
        this.status = "ERROR"
      })
      modelInstance.addObserver(this);
    },
    data() {
      return {
        status: "LOADING",
        dishes: []
      }
    },
    methods:{
      
      update(model, changeDetails){
        modelInstance.searchDish().then(dishes => {
        this.status = "LOADED"
        this.dishes = dishes.results
      }).catch(() => {
        this.status = "ERROR"
      });
      }
    }
  }
</script>

<style>

.dishes {
  display: flex;
  flex-flow: wrap;
  width: 700px;
  height: 400px;
  overflow: scroll;
  padding: 10px;
}

</style>


}
