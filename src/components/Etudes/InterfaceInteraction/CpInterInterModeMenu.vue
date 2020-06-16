<template>
    <div id="interface-interaction-modemenu">
        <button id="delete" @mouseup="canvasClear">delete</button>
        <button id="save" @mouseup="canvasSave">save</button>
    </div>
</template>

<script>
export default {
    name: "CpInterInterModeMenu",
    methods: {
        canvasClear: function(){
            this.$store.dispatch("clear");
        },
        canvasSave: function(){
            this.$store.dispatch("save");
        }
    }
};
</script>

<style scoped>
#interface-interaction-modemenu{
    height: 20%;
}
</style>