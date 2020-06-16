<template>
    <div id="interface-interaction-main">
        <div id="background-canvas" :data-slider-left="sliderLeftVal" :data-slider-right="sliderRightVal"
        :data-laser-left="laserLeft" :data-laser-right="laserRight"></div>
        <CpDrawingCanvas :data-slider-left="sliderLeftVal" :data-slider-right="sliderRightVal"
        :data-laser-left="laserLeft" :data-laser-right="laserRight"></CpDrawingCanvas>
        <CpDrawingSlider key="sliderLeft" class="slider slider-left" id="slider-left"
        @cp-slider-update="cpSliderUpdate" @cp-laser-update="cpLaserUpdate"></CpDrawingSlider>
        <CpDrawingSlider key="sliderRight" class="slider slider-right" id="slider-right"
        @cp-slider-update="cpSliderUpdate" @cp-laser-update="cpLaserUpdate"></CpDrawingSlider>
    </div>
</template>

<script>
import CpDrawingCanvas from "./CpDrawingCanvas";
import CpDrawingSlider from "./CpDrawingSlider";

const backgroundCanvas = (p) => {
    let cv = null,
    cvObject = null,
    noiseOffset = .0;

    p.setup = function(){
        cvObject = p.select("#background-canvas");
        cv = p.createCanvas(cvObject.width, cvObject.height);
        cv.parent("background-canvas");
        p.background(0);
        
        p.textFont("sans-serif");
        p.textSize(100);
        p.textAlign(p.CENTER);
        //p.frameRate(15);
    };
        
    p.draw = function(){
        p.background(0);
    };

    p.windowResized = function(){
        cvObject = p.select("#background-canvas");
        p.resizeCanvas(cvObject.width, cvObject.height);
    };
};

export default{
    name: "CpInterInterMain",
    components: { CpDrawingCanvas, CpDrawingSlider },
    data: function(){
        return {
            backgroundCanvas: null,
            sliderLeftVal: 50,
            sliderRightVal: 50,
            laserLeft: false,
            laserRight: false
        };
    },
    methods: {
        cpSliderUpdate: function(sv, lr){
            if(isNaN(sv)){
                return;
            }
            
            if(lr === "slider-left"){
                this.sliderLeftVal = sv;
            }
            else if(lr === "slider-right"){
                this.sliderRightVal = sv;
            }
        },
        cpLaserUpdate: function(lb, lr){
            if(lr === "slider-left"){
                this.laserLeft = lb;
            }
            else if(lr === "slider-right"){
                this.laserRight = lb;
            }
        }
    },
    mounted: function(){
        const p5 = require("p5");
        this.backgroundCanvas = new p5(backgroundCanvas);
    }
};
</script>

<style scoped>
#interface-interaction-main{
    position: relative;
    height: 80%;
}

#interface-interaction-main #background-canvas{
    height: 100%;
    z-index: 0;
}

#interface-interaction-main .slider{
    top: 50%;
    height: 100%;
    
    position: absolute;
    text-align: center;
    transform: translate(-50%, -50%);
    
    z-index: 1;
}

#interface-interaction-main .slider.slider-left{
    left: 10vw;
}

#interface-interaction-main .slider.slider-right{
    left: 90vw;
}
</style>