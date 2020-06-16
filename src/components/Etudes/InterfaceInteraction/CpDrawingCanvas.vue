<template>
    <div id="drawing-canvas" :data-delete="deleteCanvas" :data-save="saveCanvas"></div>
</template>

<script>
//import { mapActions, mapGetters } from "vuex";

const drawingCanvas = function(store){
    return (p) => {
        let cv = null,
        cvObject = null,
        halfW = NaN,
        halfH = NaN,
        noiseOffset = 0;

        p.setup = function(){
            cvObject = p.select("#drawing-canvas");
            cv = p.createCanvas(cvObject.width - 4, cvObject.height - 4);
            cv.parent("drawing-canvas");

            halfW = p.width / 2;
            halfH = p.height / 2;

            p.background(255, 0);
            p.textFont("sans-serif");
            p.textSize(100);
            p.textAlign(p.CENTER);

            p.ellipseMode(p.RADIUS);
        };

        p.draw = function(){
            if(store && store.getters.clearCanvasEvent){
                p.clear();
                store.dispatch("clearFinish");
            }

            p.background(255, 0);

            let sl = cv.parent().getAttribute("data-slider-left") / 100,
            sr = cv.parent().getAttribute("data-slider-right") / 100,
            slVal = p.height * (sl - .5),
            srVal = p.height * (sr - .5),
            intrsecL = intersection(slVal, halfW, halfH) * -1,
            intrsecR = intersection(srVal, halfW, halfH);

            p.fill(255, 50, 50);
            p.noStroke();

            p.push();
            p.translate(halfW, halfH);
            //p.ellipse(intrsecL, slVal, 10, 10);
            //p.ellipse(intrsecR, srVal, 10, 10);
            if(cv.parent().getAttribute("data-laser-left")){
                drawLaser(intrsecL, slVal);
            }
            if(cv.parent().getAttribute("data-laser-right")){
                drawLaser(intrsecR, srVal);
            }
            p.pop();

            p.erase();
            p.noFill();
            p.stroke(0);

            p.strokeWeight(1);
            p.ellipse(halfW, halfH, halfW, halfH);
            for(let i = 1; i <= 12; i++){
                p.strokeWeight(1 + (i * 2));
                p.ellipse(halfW, halfH, halfW + (i * i + 1), halfH + (i * i + 1));
            }
            p.noErase();

            p.fill(255);
            p.strokeWeight(1);
            //p.text(`${p.round(p.frameRate())}`, halfW, halfH);

            noiseOffset += .1;

            if(store && store.getters.saveCanvasEvent){
                p.save(cv, "myCanvas.png");
                store.dispatch("saveFinish");
            }
        };

        p.windowResized = function(){
            cvObject = p.select("#drawing-canvas");
            p.resizeCanvas(cvObject.width - 4, cvObject.height - 4);
            p.background(255, 0);
            halfW = p.width / 2;
            halfH = p.height / 2;
        };

        function intersection(y, a, b){
            return p.sqrt(a ** 2 * (1 - y ** 2 / b ** 2));
        }

        function drawLaser(x, y){
            let r = p.atan2(y, x) + p.PI / 2,
            lesX = x, lesY = y;

            p.noFill();
            p.strokeWeight(1);
            for(let i = 50; i >= 0; i--){
                let rd = p.random(-1, 1),
                newLesX = x * i / 50 + 25 * p.cos(r) * rd, newLesY = y * i / 50 + 25 * p.sin(r) * rd;
                p.stroke(p.noise(noiseOffset + i, 10) * 255, p.noise(noiseOffset + i, 20) * 255, p.noise(noiseOffset + i, 30) * 255);
                p.line(lesX, lesY, newLesX, newLesY);

                lesX = newLesX;
                lesY = newLesY;
            }
        }
    };
};

export default {
    name: "CpDrawingCanvas",
    data: function(){
        return {
            drawingCanvas: null,
            deleteCanvas: false,
            saveCanvas: false
        };
    },
    computed: {
        clearCanvasEvent: function(){
          return this.$store.getters.clearCanvasEvent;
        },
        saveCanvasEvent: function(){
          return this.$store.getters.saveCanvasEvent;
        }
    },
    methods: {
        clearFinish: function(){
          this.$store.dispatch("clearFinish");
        },
        saveFinish: function(){
          this.$store.dispatch("saveFinish");
        }
    },
    mounted: function(){
        const p5 = require("p5");
        this.drawingCanvas = new p5(drawingCanvas(this.$store));
    }
};
</script>

<style scoped>
#drawing-canvas{
    position: absolute;

    width: 60%;
    height: 80%;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;

    border: 1.5px solid #F00;
    border-radius: 50%;

    z-index: 2;
}
</style>
