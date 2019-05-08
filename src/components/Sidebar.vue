<template>
  <div class="sidebar">
      <h2>Menu</h2>
      <p>
        People:
        <input
          type="number"
          :value="numberOfGuests"
          @input="onDidChangeNumberOfGuests"
          @change="onDidChangeNumberOfGuests"
        >
        <br>
        Total number of guests: {{ this.numberOfGuests }}
      </p>
   <button @click="$router.push({ name: 'Overview', params: { menu: menu }})">
      Confirm Dinner
    </button>
    <table>
      <tr>
        <th> <p> Dish Name </p></th>
        <th><p>Cost</p></th>
      <tr>
      <tr v-for="dish in menu" :id="dish.id" :key="dish.id"> 
        <td> {{dish.title}} </td>
        <td> {{dishPrice(dish.pricePerServing)}} SEK </td>
      </tr>
      <tr>
        <td><h3>Total: {{this.model.menuPrice()}}</h3></td>
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
    update(model, changeDetails) {

      if(changeDetails === "changeGuests"){
        this.numberOfGuests = this.model.getNumberOfGuests();

      }

      if(changeDetails === "changeMenu") {
        this.menu = this.model.getMenu();
        console.log("NOT BLOCKKKKEDDD!");
      }
    },

    // our handler for the input's on change event
    onDidChangeNumberOfGuests(e) {
      this.model.setNumberOfGuests(+e.target.value);
    },
    dishPrice(pps){
      return (Math.ceil(pps * this.numberOfGuests)); //Will later change 1 to actual price of dish!
    }

  }
};
</script>

<style>

.sidebar {
  display: flex;
  flex-flow: column;
  background: black;
  width: 400px;
  height:fit-content;
  margin: 10px 10px 10px 0px;
  padding: 10px;
}

table {
  color: white;
}
.sidebar > p {
  color: white;
}

th > p {
  color: white;
}

.sidebar > h2 {
    color: white;

}

#app.header{
    display: flex;
    flex-flow: column;
	justify-content: center;
	background-color: #EE4035;
	font: 20px/1.37 Ubuntu, sans-serif;
	border-left: 0.25rem solid #EE4035;
	background: #EE4035;
	color: white; 
}
</style>

