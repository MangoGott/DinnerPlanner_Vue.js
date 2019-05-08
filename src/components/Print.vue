<template>
    <div class=print>

    <div class=list>

        <dishPrint v-for="dish in menu"
        :id="dish.id"
        :key="dish.id"
        v-bind:dish="dish"
        :model="model"
        >
        </dishPrint>

    </div>



    <router-link to=/search>
            <button> Go back and edit dinner </button>
        </router-link>

    </div>
</template>

<script>
import DishPrint from "@/components/DishPrint";

export default {
    props: ["model"],
    data(){
        return {
            menu: this.model.getMenu()
        };
    },
    components: {
        dishPrint: DishPrint
    }
};
</script>

<style>

.print{
    padding: 10px;
  margin: 10px;
}

</style>