<template>
    <div id="cp-navigator">
        <nav id="navigator">
            <h1>Etudes for rehearsing Vue.js and p5.js</h1>
            <ul id="menulist">
                <li v-for="(work, index) in etudes" :key="work.title" class="etudesWork" @mouseover="overThumb(index)" @mouseleave="leaveThumb(index)">
                    <router-link :to="{ path: '/etudes/' + work.link }" class="linkThumb" :key="work.name">
                        <img :src="work.thumb" :alt="work.title" />
                        <transition name="thumb-mouseon-class">
                            <div class="thumbMouse" v-show="work.isMouseOver">
                                <transition name="thumb-desc">
                                    <p v-if="work.isMouseOver">{{ bredTitle(work.title) }}</p>
                                </transition>
                            </div>
                        </transition>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: "CpNavigator",
    data: function(){
        return {
            etudes: [],
            etudesListLength: 3,
            backgroundCanvas: null
        };
    },
    methods: {
        overThumb: function(index){
            this.etudes[index].isMouseOver = true;
        },
        leaveThumb: function(index){
            this.etudes[index].isMouseOver = false;
        },
        bredTitle: function(str){
            let strs = str.split(/(?=[A-Z])/g),
            newStr = "";
            
            for(let strsElem of strs){
                newStr += (strsElem + " ");
            }
            newStr = newStr.substring(0, newStr.length - 1);
            
            return newStr; 
        }
    },
    mounted: function(){
        this.etudes = [
            ThumbObjectMaker("Prototype", require("../assets/thumbnail/Prototype.png"), "00-prototype"),
            ThumbObjectMaker("DimentionalWindows", require("../assets/thumbnail/DimentionalWindows.png"), "01-dimentionalWindows"),
            ThumbObjectMaker("InterfaceInteraction", require("../assets/thumbnail/InterfaceInteraction.png"), "02-interfaceInteraction")
        ];
        function ThumbObjectMaker(title, thumb, link){
            return {title, thumb, link, isMouseOver: false};
        }
    }
};
</script>

<style scoped>
h1 {
    margin-top: 0;
}

#cp-navigator{
    position: absolute;
    width: 100vw;
    width: 80vh;
    margin: 0 auto;
    
    z-index: 50;
}

#navigator{
    padding: 30px 0;
    
    background-color: #434444;
}

#menulist{
    padding: 0;
    margin: 0;
    
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    
    text-align: center;
}

.etudesWork{
    margin: 0 20px;
    
    background-color: black;
    list-style-type: none;
    
    max-width: 200px;
    max-height: 200px;
}

.linkThumb{
    display: inline-block;
    color: #fffaff;
    text-decoration: none;
    
    position: relative;
    
    max-width: 200px;
    max-height: 200px;
}

.linkThumb img{
    width: 100%;
    height: 100%;
}

.linkThumb .thumbMouse{
    position: absolute;
    top: 0;
    left: 0;
    
    width: 100%;
    height: 100%;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    background-color: rgba(5, 4, 1, .9);
    
    overflow: hidden;
}

.linkThumb .thumbMouse p{
    white-space: pre-wrap;
    word-wrap: break-word;
}

.thumb-mouseon-class-enter-active, .thumb-mouseon-class-leave-active{
    transition: opacity .25s;
}

.thumb-mouseon-class-enter, .thumb-mouseon-class-leave-to{
    opacity: 0;
}

.thumb-desc-enter-active, .thumb-desc-leave-active{
    transition: transform .25s;
}

.thumb-desc-enter{
    transform: translateX(7%);
}


</style>