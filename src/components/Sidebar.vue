<template>
  <div class="sidebar">
      <h3>This is the sidebar</h3>
      <p>
        People:
        <input
          type="number"
          :value="numberOfGuests"
          @input="onDidChangeNumberOfGuests"
          @change="onDidChangeNumberOfGuests"
        >
        <br>
        Total number of guests: {{ numberOfGuests }}
      </p>

    <table>
      <tr>
        <th> <p> Dish Name </p></th>
        <th><p>Cost</p></th>
      <tr>
      <tr v-for="dish in menu" :id="dish.id" :key="dish.id"> 
        <td> {{dish.title}} </td>
        <td> {{dishPrice()}} SEK </td>
      </tr>
    </table>
  </div>
</template>



<script>

import modelInstance from "../data/DinnerModel";

export default {
  props: ["model"],
  // this methods is called by React lifecycle when the
  // component is created that's a good place to setup model observer
  created() {
    this.model.addObserver(this);
  },

  // this is called when component is removed destroyed
  // good place to remove observer
  beforeDestroy() {
    this.model.removeObserver(this);
  },

  // we define and initalise the data we want to use and modify in the component
  data() {
    return {
      numberOfGuests: this.model.getNumberOfGuests(),
      menu: this.model.getMenu()
    };
  },

  methods: {
    // in our update function we modify the the property of
    // the compoented which will cause the component to re-render
    update() {
      this.numberOfGuests = this.model.getNumberOfGuests();
      this.menu = this.model.getMenu();
    },

    // our handler for the input's on change event
    onDidChangeNumberOfGuests(e) {
      this.model.setNumberOfGuests(+e.target.value);
    },
    dishPrice(){
      return (1 * this.model.getNumberOfGuests()); //Will later change 1 to actual price of dish!
    }

  }
};
</script>

<style>

.sidebar {
  
  background: grey;
  width: 300px;
  height: 500px;
}
</style>

