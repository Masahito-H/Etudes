<template>
    <div id="drawing-slider">
        <div :id="id + '-canvas'" class="slider-canvas" :data-drug-action="drugAction"></div>
        <div class="slider-button" @mousemove="moveDrug($event)" @mouseup="endDrug($event)" @mouseleave="endDrug($event)">
            <div :id="id + '-laser-canvas'" class="laser-canvas" :style="{top: parameter}" :data-drug-action="drugAction"></div>
            <button @mousedown="startDrug($event)" :style="{top: parameter}">the test</button>
        </div>
    </div>
</template>

<script>
const sliderCanvas = function(idName){
    return (p) => {
        let cv = null,
        cvObject = null,
        noiseOffset = .0;
        
        p.setup = function(){
            cvObject = p.select(`#${idName}`);
            cv = p.createCanvas(cvObject.width, cvObject.height);
            cv.parent(idName);
            p.frameRate(30);
        };
        
        p.draw = function(){
            p.clear();
            //p.background(0, 0);
            
            let sliderStartVal = p.height * .1,
            sliderEndVal = p.height * .9,
            g = p.drawingContext.createLinearGradient(0, sliderStartVal, 0, sliderEndVal),
            col1 = NaN, col2 = NaN, col3 = NaN;
            
            if(cv.parent().getAttribute("data-drug-action")){
                col1 = 255; col2 = 100; col3 = 100;
            }
            else{
                col1 = 200; col2 = 200; col3 = 255;
            }
            g.addColorStop(0, p.color(col1, col2, col3, 0));
            g.addColorStop(.5, p.color(col1, col2, col3, 100 + 155 * p.noise(noiseOffset)));
            g.addColorStop(1, p.color(col1, col2, col3, 0));
            p.drawingContext.strokeStyle = g;
            p.strokeWeight(7);
            
            p.line(p.width * .5, sliderStartVal, p.width * .5, sliderEndVal);
            
            noiseOffset += .1;
        };
        
        p.windowResized = function(){
            cvObject = p.select(`#${idName}`);
            p.resizeCanvas(cvObject.width, cvObject.height);
        };
    };
};

const laserCanvas = function(idName){
    return (p) => {
        let cv = null,
        noiseOffset = .0;
        
        p.setup = function(){
            cv = p.createCanvas(p.windowWidth * .4, p.windowHeight * .1);
            cv.parent(idName);
            p.frameRate(30);
        };
        
        p.draw = function(){
            p.clear();
            //p.background(0, 0);
            
            let g = p.drawingContext.createLinearGradient(0, 0, p.width, 0),
            col1 = NaN, col2 = NaN, col3 = NaN;
            
            if(cv.parent().getAttribute("data-drug-action")){
                col1 = 255; col2 = 100; col3 = 100;
            }
            else{
                col1 = 200; col2 = 200; col3 = 255;
            }
            g.addColorStop(0, p.color(col1, col2, col3, 100 + 155 * p.noise(noiseOffset)));
            g.addColorStop(1, p.color(col1, col2, col3, 0));
            p.drawingContext.strokeStyle = g;
            p.strokeWeight(5);
            
            p.line(0, p.height * .5, p.width, p.height * .5);
            
            noiseOffset += .1;
        };
        
        p.windowResized = function(){
            p.resizeCanvas(p.windowWidth * .4, p.windowHeight * .1);
        };
    };
};

export default {
    name: "CpDrawingSlider",
    props: ["id"],
    data: function(){
        return {
          sliderCanvas: null,
          laserCanvas: null,
          parameter: `50%`,
          drugAction: false
        };
    },
    methods: {
        startDrug: function(e){
            this.drugAction = true;
            this.$emit("cp-laser-update", true, this.id);
        },
        moveDrug: function(e){
            if(this.drugAction){
                let pos = this.$el.getBoundingClientRect(),
                mY = e.clientY - pos.height * .1,
                margY = pos.height * .8,
                percY = mY / margY * 100,
                sliderVal = NaN;
                
                if(percY < 0){
                    this.parameter = `10%`;
                    sliderVal = 0;
                }
                else if(percY > 100){
                    this.parameter = `90%`;
                    sliderVal = 100;
                }
                else{
                    this.parameter = `${Math.round(e.clientY)}px`;
                    sliderVal = percY;
                }
                this.$emit("cp-slider-update", sliderVal, this.id);
            }
        },
        endDrug: function(e){
            this.drugAction = false;
            this.$emit("cp-laser-update", false, this.id);
        }
    },
    mounted: function(){
        const p5 = require("p5");
        this.sliderCanvas = new p5(sliderCanvas(`${this.id}-canvas`));
        this.laserCanvas = new p5(laserCanvas(`${this.id}-laser-canvas`));
    }
};
</script>

<style scoped>
#drawing-slider .slider-canvas{
    position: relative;
    width: 10vw;
    height: 100%;
}

#drawing-slider .slider-button{
    position: absolute;
    width: 100%;
    height: 100%;
    
    top: 0%;
}

#drawing-slider .slider-button .laser-canvas{
    position: absolute;
    /* width: 40vw; height: 10vh; */
    
    transform: translateY(-50%);
    top: 50%;
    left: 50%;
}

#drawing-slider .slider-button .laser-canvas#slider-right-laser-canvas{
    transform: translate(-100%, -50%) rotate(180deg);
}

#drawing-slider .slider-button button{
    cursor: pointer;
    position: relative;
    
    transform: translateY(-50%);
    top: 50%;
}
</style>