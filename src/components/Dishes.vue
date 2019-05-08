<template>
  <div class="Dishes">
    <h2>Dishes</h2>
      
      <h2 v-if='status === "LOADING"'>LOADING ;)</h2>
      <b v-else-if='status === "ERROR"'>Failed to load data, please try again</b>

      <div v-else-if='status === "LOADED"' class="dishes">
     
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
        if(changeDetails === "fetch"){
           this.status = "LOADING"
           modelInstance.searchDish().then(dishes => {
           this.status = "LOADED"
           this.dishes = dishes.results
           }).catch(() => {
           this.status = "ERROR"
           });
        }
      }
    }
  }
</script>

<style>

.dishes {
  display: flex;
  flex-flow: wrap;
  height: 400px;
  overflow: scroll;
  padding: 10px;
  color: white;
}

.dishes > h2 {
  color: white;
}

</style>


}
