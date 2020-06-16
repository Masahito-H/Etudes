<template>
    <div>
        <div class="wrapper">
            <div id="reset-area">
                <button type="button" id="reset-button" value="reset" @click="resetVisible">reset</button>
            </div>
            <CpDwindows ref="dwindow"></CpDwindows>
        </div>
    </div>
</template>

<script>
import CpDwindows from "./CpDwindows";

export default {
    name: "DimentionalWindows",
    components: { CpDwindows },
    methods: {
        resetVisible: function(){
            this.$refs.dwindow.resetVisible();
        }
    }
};
</script>

<style scoped>
#reset-area #reset-button{
    cursor: pointer;
    
    background-color: rgba(0, 0, 0, 0);
    color: #FFF;
    border: solid 1px #EEF;
}
</style>