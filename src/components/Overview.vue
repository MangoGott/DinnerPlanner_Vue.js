<template>
    <div class="overview">


        <div class="dishes">
        
        <displayDish
        v-for="dish in menu"
        :id="dish.id"
        :key="dish.id"
        v-bind:dish="dish"
        :model="model"
        >
      </displayDish>

        </div>
         <h1> Total: {{this.model.menuPrice()}} SEK </h1>

        <router-link to=/search>
            <button> Back </button>
        </router-link>
        
        <button @click="$router.push({ name: 'Print', params: { menu: menu } })">
        Print
        </button>


    </div>
</template>

<script>
import DisplayDish from "@/components/DisplayDish";

export default {
  props: ["model"],
  
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
      menu: this.model.getMenu()
    };
  },
  components: {
    displayDish: DisplayDish
  }
};

</script>


<style>

.overview {
   padding: 10px;
  margin: 10px;
}

img {
    height: 100px;
    width: 100px;
}

.dishes {
display: flex;
justify-content: center;
flex-flow: wrap row;

}
</style>
