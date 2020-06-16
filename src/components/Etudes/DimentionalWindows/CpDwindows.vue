<template>
    <transition-group tag="ul" name="list" id="window-list">
        <CpLi v-for="(windowView, index) in windowList" :key="windowView.id"
        :windowId="windowView.id" :buttonVisible="windowView.visible"
        :canvasSize="canvasSize" v-show="windowView.visible"
        @cp-unvisible="cpUnvisible(index)" @cp-z-index="cpZIndex(index)"
        @cp-update-position="(dx, dy) => {cpUpdatePosition(index, dx, dy)}"
        :style="{top: windowView.liPosition.y + 'px', left: windowView.liPosition.x + 'px', 'z-index': windowView.zId}"></CpLi>
    </transition-group>
</template>

<script>
import CpLi from "./CpLi";

export default {
    name: "CpDWindows",
    components: { CpLi },
    data: function(){
        return {
            windowList: [],
            zIdList: [],
            listLength: 10,
            visibleTime: 500,
            canvasSize: {
                x: 200, y: 200
            }
        };
    },
    methods: {
        resetVisible: function(){
            
            this.windowList.forEach((elem) => {
                if(elem.visible && this.isMoved(elem)){
                    new Promise((res, rej) => {
                        elem.visible = false;
                        setTimeout(() => {
                            elem.liPosition = this.definePosition(elem.id);
                            res();
                        }, this.visibleTime);
                    }).then(() => {
                        elem.visible = true;
                    });
                }
                else if(!elem.visible){
                    elem.liPosition = this.definePosition(elem.id);
                    elem.visible = true;
                }
            });
        },
        cpUnvisible: function(id){
            this.windowList[id].visible = false;
        },
        cpZIndex: function(id){
            let listId = this.zIdList.indexOf(id);
            
            this.zIdList.push(this.zIdList.splice(listId, 1)[0]);
            for(let i = 0; i < this.listLength; i++){
                this.windowList[this.zIdList[i]].zId = `${i + 1}`;
            }
        },
        cpUpdatePosition: function(id, dx, dy){
            let position = this.windowList[id].liPosition,
            ulPosition = this.$el.getBoundingClientRect();
            position.x += dx; position.y += dy;
            
            if(position.x + ulPosition.left < 0){
                position.x = -ulPosition.left;
            }
            else if(position.x + this.canvasSize.x + ulPosition.left > window.innerWidth){
                position.x = window.innerWidth - this.canvasSize.x - ulPosition.left;
            }
            
            if(position.y + ulPosition.top < 0){
                position.y = -ulPosition.top;
            }
            else if(position.y + this.canvasSize.y + ulPosition.top > window.innerHeight){
                position.y = window.innerHeight - this.canvasSize.y - ulPosition.top;
            }
        },
        
        definePosition: function(i){
            let defX = NaN, defY = NaN;
            
            switch(i % 5){
                case 0: case 1: case 2:
                    defX = (i % 5) * this.canvasSize.x + ((i % 5 === 0) ? 0 : this.canvasSize.x * (i % 5));
                    defY = Math.floor(i / 5) * 2 * this.canvasSize.y;
                    break;
                case 3: case 4:
                    defX = this.canvasSize.x + ((i % 5 === 3) ? 0 : this.canvasSize.x * 2);
                    defY = (Math.floor(i / 5) * 2 + 1) * this.canvasSize.y;
                    break;
            }
            
            return {x: defX, y: defY};
        },
        isMoved: function(elem){
            let defaultPosition = this.definePosition(elem.id);
            
            if(elem.liPosition.x === defaultPosition.x && elem.liPosition.y === defaultPosition.y){
                return false;
            }
            else{
                return true;
            }
        }
    },
    beforeMount: function(){
        for(let i = 0; i < this.listLength; i++){
            this.windowList.push({
               id: i,
               visible: true,
               liPosition: this.definePosition(i),
               zId: i + 1
            });
            this.zIdList.push(i);
        }
    }
};
</script>

<style scoped>
#window-list{
    padding: 0;
    margin: auto;
    
    width: calc(200px * 5);
    height: calc(200px * 4);
    
    position: relative;
}
    
#window-list li{
    display: inline-block;
    position: absolute;
    
    list-style-type: none;
    text-align: center;
    
    cursor: grab;
}

#window-list li:active{
    cursor: grabbing;
}

.list-enter-active, .list-leave-active{
    transition-duration: .5s;
    transition-property: opacity, transform;
}

.list-move{
    transition: opacity .5s;
}

.list-enter, .list-leave-to{
    opacity: 0;
}
</style>