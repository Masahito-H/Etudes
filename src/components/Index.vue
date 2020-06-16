<template>
    <div id="center-content">
        <div id="background-canvas"></div>
        <CpNavigator />
    </div>
</template>

<script>
import CpLoading from "@/components/CpLoading.vue";
import CpNavigator from "@/components/CpNavigator.vue";

const p5Test = (p) => {
    let cv = null,
    noiseOffset = 0;
    
    p.setup = function(){
        cv = p.createCanvas(p.windowWidth, p.windowHeight);
        cv.parent("background-canvas");
        p.background(0);
    
        p.textFont("sans-serif");
        p.textSize(50);
        p.textAlign(p.CENTER);
    
        p.fill(255);
    };
    
    p.draw = function(){
        p.background(0);
        p.fill(255, 255 * p.noise(noiseOffset));
        
        p.text("BACKGROUND", p.width / 2, p.height / 2);
         
        noiseOffset += .1;
    };
};

export default {
    name: "Index",
    components: { CpLoading, CpNavigator },
    data: function(){
        return {
            backgroundCanvas: null,
        };
    },
    mounted: function(){
        const p5 = require("p5");
        this.backgroundCanvas = new p5(p5Test);
    }
};
</script>

<style scoped>
#center-content{
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    
    display: flex;
    align-items: center;
    justify-content: center;
}

#background-canvas{
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    
    z-index: -1;
}
</style>