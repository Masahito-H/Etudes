<template>
  <div id="app">
    <transition name="loading">
      <CpLoading v-if="isLoading" />
    </transition>
    <router-view />
  </div>
</template>

<script>
import CpLoading from "@/components/CpLoading.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'App',
  components: { CpLoading },
  computed: {
    ...mapGetters(["isLoading"])
  },
  methods: {
    ...mapActions(["setStateLoading"])
  }
}
</script>

<style>
/* color-palette: https://coolors.co/434444-30bced-fffaff-d1ccdc-050401 */

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #30bced;
  
  box-sizing: border-box;
  background-color: #000;
  height: 100vh;
}

img {
  z-index: 1;
}

button{
    cursor: pointer;
}

button:focus{
    outline: none;
}

button:active{
    outline: solid 1px;
}

.loading-enter-active, .loading-leave-active {
  transition: opacity .25s;
}

.loading-enter, .loading-leave-to {
  opacity: 0;
}
</style>
