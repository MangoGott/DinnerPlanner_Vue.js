<template>
  <div class="select-dish">
      <!-- We pass the model as property to the Sidebar component -->
      <sidebar :model="this.model"/>
    
        <div class="search">
          <h2>Find a Dish</h2>
          <input v-model="filter" type="text" placeholder="Serch here">
          <form >
            <select v-model="type">
              <option value="all">All</option>
              <option value="side dish">Side dish</option>
              <option value="main course">Main course</option>
              <option value="dessert">Dessert</option>
              <option value="appetizer">Appetizer</option>
              <option value="salad">Salad</option>
              <option value="bread">Bread</option>
              <option value="breakfast">Breakfast</option>
              <option value="soup">Soup</option>
              <option value="beverage">Beverage</option>
              <option value="sauce">Sauce</option>
              <option value="drink">Drink</option>
            </select>
          </form>
          <button v-on:click="results()">Search</button>
        <dishes :model="this.model"/>
      </div>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'
  import Dishes from '@/components/Dishes'

  export default {
    props: ['model'],
    components: {
      'sidebar': Sidebar,
      'dishes': Dishes
    },
    data() {
      return {
        type: "",
        filter: "",
      }
    },
    methods: {

      results(){
        this.model.setFilter(this.filter);
        this.model.setType(this.type);
        
      }

    }
  }
</script>

<style>

.select-dish {
  display: flex;
  flex-flow: row;
  margin: 10px;
}

.search {
  background: black;
  margin: 10px 10px 0px 10px; 
  padding: 10px;
  color: white;
  height: auto;
  width: 600px;
}

.search > h2 {
  color: white;
}

</style>
