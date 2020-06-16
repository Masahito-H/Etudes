<template>
    <div id="cp-prototype">
        <!-- <p>mounted: <slot name="hello"></slot></p> -->
        <div id="prototype-canvas" v-bind:style="{width: divSize.x, height: divSize.y}"></div>
    </div>
</template>

<script>
const s = (p) => {
    let noiseOffset = .0,
    plusPlus = .1,
    dy = 275,
    easing = .925,
    alpha = 1;

    p.setup = function(){
        let canvas = p.createCanvas(500, 500);
        canvas.parent("prototype-canvas");
        p.background(200);
        
        p.textFont("sans-serif");
        p.textSize(25);
    };

    new Promise((resolve, reject) => {
        alpha = 1;
        
        p.draw = helloVue;
        
        function helloVue(){
            let noiseAlpha = p.noise(noiseOffset);
        
            p.background(175 + 50 * p.noise(noiseOffset + 1000));
            p.fill(0, 255 / 2 * noiseAlpha);
            noiseOffset += plusPlus;
            
            p.textAlign(p.RIGHT, p.CENTER);
            p.text("mounted: HELLO!", 247, 250);
            
            if(parseInt(dy) <= 10){
                p.fill(0, 255 * noiseAlpha * alpha);
                alpha -= 0.01;
            }
        
            p.textAlign(p.LEFT, p.CENTER);
            p.text("Vue.js", 253, parseInt(250 + dy));
            dy *= easing;
        
            if(alpha <= 0){
                setTimeout(function(){
                    resolve();
                }, 500);
            }
        }
    }).then(() => {
        dy = 275;
        alpha = 1;
        
        p.draw = null;
        p.draw = helloP5;
        
        function helloP5(){
            let noiseAlpha = p.noise(noiseOffset);
            
            p.background(175 + 50 * p.noise(noiseOffset + 1000));
            p.fill(0, 255 * noiseAlpha);
            noiseOffset += plusPlus;
        
            p.textAlign(p.RIGHT, p.CENTER);
            p.text("mounted: HELLO!", 247, 250);
        
            if(parseInt(dy) <= 0){
                p.fill(0, 255 * noiseAlpha * alpha);
                (alpha > 0) ? alpha -= 0.01 : alpha = 0;
            }
        
            p.textAlign(p.LEFT, p.CENTER);
        
            if(alpha > 0){
                p.text("p5.js", 253, parseInt(250 + dy));
                dy *= easing;
            }
        }
    });
};

export default {
    name: "CpPrototype",
    data: function(){
        return {
            divSize: {
                x: `500px`,
                y: `500px`
            },
            prototypeCanvas: null
        };
    },
    mounted: function(){
        const p5 = require("p5");
        this.prototypeCanvas = new p5(s);
    }
}
</script>

<style scoped>
    
</style>