<template>
    <div>
        <router-view id="work-view" />
        <button id="menu-icon-nav" @click="openMenu">MENU</button>
        <transition name="overlay-menu">
            <div id="overlay" v-show="isOpenMenu" @click="returnFromMenu">
                <transition name="etudes-menu">
                    <CpNavigator v-if="isOpenMenu" id="cp-navigator" />
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
import CpNavigator from "@/components/CpNavigator.vue";

export default {
    name: "Etudes",
    components: { CpNavigator },
    //props: ["work"],
    data: function(){
        return {
            isOpenMenu: false
        };
    },
    methods: {
        returnFromMenu: function(){
            this.isOpenMenu = false;
        },
        openMenu: function(){
            this.isOpenMenu = true;
        }
    }
};
</script>

<style scoped>
#work-view{
    position: absolute;
    
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    text-align: center;
    
    overflow-y: hidden;
}

#menu-icon-nav{
    display: inline-block;
    
    background-color: #434444;
    color: #FFFAFF;
    border: none;
    border-radius: 0;
    
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 13px;
    
    font-size: 30px;
    text-align: center;
    
    z-index: 50;
}

#overlay{
    background-color: rgba(5, 4, 1, .9);
    
    width: 100vw;
    height: 100vh;
    
    position: absolute;
    top: 0;
    left: 0;
    
    z-index: 100;
    
    cursor: pointer;
}

#cp-navigator{
    position: absolute;
    
    top: 0;
    left: 0;
    margin: 0;
    
    cursor: auto;
}

.overlay-menu-enter-active, .overlay-menu-leave-active{
    transition: opacity .25s;
}

.overlay-menu-enter, .overlay-menu-leave-to{
    opacity: 0;
}

.etudes-menu-enter-active, .etudes-menu-leave-active{
    transition: transform .25s;
}

.etudes-menu-enter, .etudes-menu-leave-to{
    transform: translateX(-100%);
}
</style>