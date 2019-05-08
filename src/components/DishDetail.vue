<template>

<div class="detail">
    
    <sidebar :model="this.model"/>

<h2 v-if='status === "LOADING"'>LOADING ;)</h2>
<b v-else-if='status === "ERROR"'>Failed to load data, please try again</b>

<div v-else-if='status === "LOADED"' class="dishdetails">
    <h2>{{dish.title}}</h2>
    <img :src="dish.image">
    <p> {{dish.instructions}} </p>

     <div class="ingredientsContainer">
       <h2>Number of guests: {{nrGuest}} </h2>

      <table>
        <tr v-for="dishIng in dish.extendedIngredients" :key="dishIng.id">
          <td>{{dishIng.amount * nrGuest}} {{dishIng.unit}}</td>
          <td> {{dishIng.name}}</td>
          <td> {{1 * nrGuest + ' SEK'}}</td>
        </tr>

        <tr>
          <td> Total cost: </td>
          <td> {{Math.ceil(dish.pricePerServing * nrGuest)}} SEK</td>
        </tr>
      </table>
</div>


  <!-- <p>{{dish}}</p> -->
    <div class="buttons">
    <router-link to="/search">
    <button>Back</button>
    </router-link>
    <button class="button" @click="addDish">Add dish to menu</button>
    <button class="button" @click="removeDish">Remove</button>
    </div>
     </div>
    
  
</div>


</template>

<script>
  // Alternative to passing the moderl as the component property,
  // we can import the model instance directly
  import Sidebar from '@/components/Sidebar'; 

  export default {
    // this methods is called by Vue lifecycle when the
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    props: ["model", "dishId"],
    components: { 
      sidebar:Sidebar
    },
    data() {
      return {
        status: "LOADING",
        url: "https://spoonacular.com/recipeImages/",
        nrGuest: this.model.getNumberOfGuests(),
        dish: {},
        currentDishId: this.model.getSelectedDish()
        }
    },
    created() {
    this.model.addObserver(this);
    },
    beforeDestroy() {
    this.model.removeObserver(this);
    },
    mounted() {
    // when data is retrieved we update it's properties
    // this will cause the component to re-render
    this.status = "LOADING"
    let currentDishId = this.model.getSelectedDish();
    console.log("Current:" + this.currentDishId);
    this.model.getDish(this.currentDishId)
    .then(elem => {
        this.status = "LOADED"
        this.dish = elem;
      })
      .catch((error)  => {
        this.status = "ERROR"
       // alert("Couldn't complete fetch :(" + error);
      });
    this.model.addObserver(this);
  },
  methods: {
    update(model, changeDetails) {  
      status = "LOADING";
      this.currentDishId = this.model.getSelectedDish();
      
      if(changeDetails === "changeGuests"){
      console.log("nrGuest UPDATED");
      this.nrGuest = this.model.getNumberOfGuests();
      }
    },
    addDish() {
      this.model.addMenu(this.dish);
    },
    removeDish(){
      this.model.removeDish(this.dish);
    }
  }
};

</script>

<style>


.detail{

   display: flex;
  flex-flow: row;
  margin: 10px;
  
}

.dishdetails{
  background: black;
  margin: 10px 10px 0px 10px; 
  padding: 10px;
  color: white;
  height: auto;
  width: 600px;
}



</style>
