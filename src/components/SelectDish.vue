<template>
  <div class="select-dish">
    <h2>This is the Select Dish screen</h2>
      <!-- We pass the model as property to the Sidebar component -->
      <sidebar :model="this.model"/>
      
      
        <h1>Find a Dish</h1>
        <div class="search">
          <input v-model="filter" id="Input" type="text" placeholder="Enter key words">
          <form >
            <select id="typeOption" v-model="type">
              <option value="main course">Main course</option>
              <option value="side dish">Side dish</option>
              <option value="dessert">Dessert</option>
              <option value="appetizer">Appetizer</option>
            </select>
          </form>
          <button class="button" type="button" id="searchBtn" v-on:click="results()">Search</button>
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