<template>
    <div class="loading">
        <span id="loading-express">Etudes <span id="loading-longtime" v-show="longTime"><br />Please wait.</span></span>
    </div>
</template>

<script>
export default {
    name: "CpLoading",
    data: function(){
        return {
            longTime: false
        }
    }
};
</script>

<style scoped>
    .loading{
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        
        background-color: #050401;
        color: #fffaff;
        
        text-align: center;
        
        display: flex;
        align-items: center;
        justify-content: center;
        
        z-index: 100;
        
        cursor: wait;
    }
</style>