<script>
import { ref } from "vue";
import login from "./components/login.vue"

export default {

  name:"App",
  components:{
    login
  },
  setup() {
    let sb = ref("hello");
    let lens = ref(19);
    let haha = ref([]);

    function showinfo(){
      console.log(this.sb + "  " + this.lens);
    }

    function hahaadd(e){
      console.log(e);
      this.haha.unshift(Math.random(0,1)*120+9)
      console.log(this.haha);
    }
    
    return{
      sb,
      lens,
      haha,
      hahaadd,
      showinfo
    }
  }

}
</script>

<template>
  <login></login>
  <!-- <div>
    <p>{{sb}} {{lens}}</p>
    <button @click="showinfo">click me</button>
    <button @click="hahaadd">come on</button>
    <div v-show="haha.length" v-for="item in haha" :key="item">
      <h1>{{item}}</h1>
    </div>
  </div> -->
</template>

<style>

</style>
