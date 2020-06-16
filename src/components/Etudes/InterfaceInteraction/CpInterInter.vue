<template>
    <div id="interface-interaction">
        <CpInterInterMain></CpInterInterMain>
        <CpInterInterModeMenu></CpInterInterModeMenu>
    </div>
</template>

<script>
    import CpInterInterMain from "./CpInterInterMain";
    import CpInterInterModeMenu from "./CpInterInterModeMenu";
    
    export default {
        name: "CpInterInter",
        components: { CpInterInterMain, CpInterInterModeMenu }
    };
</script>

<style scoped>
#interface-interaction{
    position: absolute;
    
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
}
</style>