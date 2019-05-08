<template>
    <div class=print>
    <img :src="dish.image">
    <h2>{{ dish.title}}</h2>
    <p>{{ dish.instructions}}</p>

    </div>
</template>

<script>
export default {
    props: ["model", "dish"],
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
            fullDish: {},
            url: ""
        };
    },
    mounted() {
    // when data is retrieved we update it's properties
    // this will cause the component to re-render
    /*this.model
      .getDish(this.dish.id)
      .then(dish => {
        this.fullDish = dish;
      })
      .catch(() => {
      //OH SHIT
      });
*/
}
};
</script>
<style>

.print > p {
    color: black;
}
.print > h2 {
    color: black;
}

</style>
