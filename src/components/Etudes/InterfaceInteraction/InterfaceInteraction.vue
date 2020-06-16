<template>
    <div class="main-content">
        <article>
              <CpInterInter></CpInterInter>
        </article>
    </div>
</template>

<script>
import CpInterInter from "./CpInterInter";

export default {
    name: "InterfaceInteraction",
    components: { CpInterInter }
};
</script>

<style scoped>
article {
    width: 100vw;
    height: 100vh;
}
</style>