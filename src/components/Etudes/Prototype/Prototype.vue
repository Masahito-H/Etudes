<template>
    <section>
        <CpPrototype><span id="hello" slot="hello">Hello! Vue.js</span></CpPrototype>
    </section>
</template>

<script>
import CpPrototype from "./CpPrototype.vue";

export default {
  name: "Prototype",
  components: { CpPrototype }
};
</script>

<style scoped>

</style>