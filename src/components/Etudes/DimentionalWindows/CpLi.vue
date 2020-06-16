<template>
    <li @mousemove="moveDrug($event)" @mouseup="endDrug($event)" @mouseleave="endDrug($event)">
        <div :id="windowName" :style="{width: canvasSize.x + 'px', height: canvasSize.y + 'px'}" @mousedown="startDrug($event)"></div>
        <button type="button" :id="eraseId" @click="unvisible" v-show="buttonVisible">erase</button>
    </li>
</template>

<script>
function canvasWindow(id, canvasSize){
    switch(id){
        case 1:
            return trochoidWindow(id, canvasSize, 1);
        case 3:
            return tracingWindow(id, canvasSize, 1);
        case 6:
            return trochoidWindow(id, canvasSize, 2);
        case 9:
            return tracingWindow(id, canvasSize, 2);
        default:
            return canvasDefaultWindow(id, canvasSize);
    }
}

function canvasDefaultWindow(id, canvasSize){
    return (p) => {
        let noiseOffset = .0,
        noiseVal = 0,
        canvas = null;
        
        p.setup = function(){
            canvas = p.createCanvas(canvasSize.x, canvasSize.y);
            canvas.parent(`canvas${id}`);
            p.background(200);
            
            p.textFont("sans-serif");
            p.textSize(50);
            p.textAlign(p.CENTER, p.CENTER);
        };

        p.draw = function(){
            p.noiseSeed(id);
            noiseVal = p.noise(noiseOffset);
            
            p.background(100 + 200 * noiseVal);
            p.text(id, 50, 50);
            noiseOffset += .1;
        };
    };
}

function trochoidWindow(id, canvasSize, mode){
    return (p) => {
        class Trochoid{
            constructor(sizeX, sizeY, offsetY, speed, resolution, radius){
                this.size = {x: sizeX, y: sizeY};
                this.y = offsetY;
                this.speed = speed;
                this.resolution = resolution;
                this.radius = radius;
                
                this.xInterval = this.size.x / this.resolution;
            }
            
            updatePosition(){
                this.y += this.speed;
                
                if(this.y > this.size.y + 2 * this.radius){
                    this.y -= this.size.y + 2 * this.radius;
                }
            }
            
            draw(){
                p.stroke(255);
                p.strokeWeight(.5);
                p.noFill();
                
                p.beginShape();
                for(let xp = -1; xp <= this.resolution + 1; xp++){
                    let position = this.calculateTrochoid(xp, this.y);
                    
                    p.curveVertex(position.x, position.y);
                }
                p.endShape();
            }
            
            calculateTrochoid(pointX, varY){
                let calcX = NaN, calcY = NaN,
                rd = this.radius * 15 * varY / this.size.y,
                theta = p.radians(360 * 4 * pointX / this.resolution),
                scale = NaN;
                
                switch(mode){
                    case 1:
                        scale = this.size.x / (2 * p.PI * this.radius * 4);
                        calcX = this.radius * theta - rd * p.sin(theta);
                        break;
                    case 2:
                        scale = 1;
                        calcX = pointX * this.xInterval;
                        break;
                }
                calcY = varY + rd * p.cos(theta);
                calcX *= scale;
                calcY *= scale;
                
                return {x: calcX, y: calcY};
            }
        }
        
        let resolution = 25,
        radius = 5,
        n = 10,
        cycloids = [];
        
        p.setup = function(){
            let canvas = p.createCanvas(canvasSize.x, canvasSize.y),
            yInterval = (p.height + 2 * radius) / n;
            canvas.parent(`canvas${id}`);
            p.background(0);
            
            for(let i = 0; i < n; i++){
                cycloids.push(new Trochoid(p.width, p.height, i * yInterval, .05, resolution, radius));
            }
        };
        
        p.draw = function(){
            p.push();
            
            switch(mode){
                case 1:
                    break;
                case 2:
                    p.translate(p.width, p.height);
                    p.rotate(p.PI);
                    break;
            }
            
            p.background(0, 3);
            for(let i = 0; i < n; i++){
                cycloids[i].updatePosition();
                cycloids[i].draw();
            }
            
            p.pop();
        };
    };
}

function tracingWindow(id, canvasSize, mode){
    return (p) => {
        let tracingLasers = [],
        lasersLength = 200,
        noiseSetX = 0;
        
        p.setup = function(){
            let canvas = p.createCanvas(canvasSize.x, canvasSize.y);
            canvas.parent(`canvas${id}`);
            p.background(0);
            
            p.stroke(255);
            p.strokeWeight(.5);
            p.noFill();
            
            p.noiseSeed(id);
            
            switch(mode){
                case 1:
                    for(let i = 0; i < lasersLength; i++){
                        tracingLasers.push(p.createVector(p.random(p.width), (p.random(0, 2) > 1) ? 0 : p.height));
                    }
                    break;
                case 2:
                    for(let i = 0; i < lasersLength; i++){
                        tracingLasers.push(p.createVector((p.random(0, 2) > 1) ? 0 : p.width, p.random(p.height)));
                    }
                    break;
            }
        };
        
        p.draw = function(){
            p.background(0, 50);
            
            for(let i = 0; i < tracingLasers.length; i++){
                let noiseVal = p.noise(noiseSetX, i) * p.PI * 6,
                lissajous = culculateLissajous(noiseVal);
                
                p.line(tracingLasers[i].x, tracingLasers[i].y, lissajous.x, lissajous.y);
            }
            noiseSetX += .001;
        };
        
        function culculateLissajous(radVal){
            switch(mode){
                case 1:
                    return p.createVector(p.cos(radVal) * 70 + p.width / 2, p.sin(radVal) * 70 + p.height / 2);
                case 2:
                    return p.createVector(p.cos(radVal) * 70 + p.width / 2, p.sin((radVal + noiseSetX * 5) * 3) * 70 + p.height / 2);
            }
        }
    };
}

export default {
    name: "CpLi",
    props: ["windowId", "buttonVisible", "canvasSize"],
    data: function(){
        return {
            liCanvas: null,
            drugAction: false,
            prevMousePos: {
                x: NaN,
                y: NaN
            }
        };
    },
    computed: {
        windowName: function(){
            return `canvas${this.windowId}`;
        },
        eraseId: function(){
            return `button${this.windowId}`;
        }
    },
    methods: {
        unvisible: function(){
            this.$emit("cp-unvisible");
        },
        
        startDrug: function(e){
            this.drugAction = true;
            this.prevMousePos.x = e.clientX;
            this.prevMousePos.y = e.clientY;
            
            this.$emit("cp-z-index");
        },
        moveDrug: function(e){
            if(this.drugAction){
                let dx = e.clientX - this.prevMousePos.x,
                dy = e.clientY - this.prevMousePos.y;
                
                this.$emit("cp-update-position", dx, dy);
                
                this.prevMousePos.x = e.clientX;
                this.prevMousePos.y = e.clientY;
            }
        },
        endDrug: function(e){
            this.drugAction = false;
        }
    },
    mounted: function(){
        const p5 = require("p5");
        this.liCanvas = new p5(canvasWindow(this.windowId, this.canvasSize));
    }
};
</script>

<style scoped>
li button{
    width: 100%;
    background-color: #434444;
    color: #fffaff;
    border: solid 1px rgba(209, 204, 220, .3);
    border-top: none;
}
</style>