<template>
   <div ref="box" class="box" width="100%" height="100%">

      <div class="canvas">
          <VueDragResize
            v-for="widget in widgets"
            :key="widget.id"
            @resizing="resize($event, widget)"
            @dragging="drag($event, widget)"
            :isActive="widget.id === selected.id"
            :w="widget.width"
            :h="widget.height"
            :x="widget.x"
            :y="widget.y"
            :minh="0"
            :minw="0"
         >
            <p
               :style="{
                  fontSize: `${widget.size}px`,
                  color: widget.color,
                  fontWeight: widget.fontWeight,
                  textAlign: widget.textAlign
               }"
               @click="select(widget)"
               v-if="widget.type === 'Text'">{{widget.text}}</p>
            <input
               v-else-if="widget.type === 'Input'"
               @click="select(widget)"
               :placeholder="widget.placeholder"
               :style="{
                  padding: widget.paddingX+'px '+widget.paddingY+'px',
                  width: widget.width+'px',
                  border: widget.border,
                  borderRadius: widget.borderRadius+'px'}"
                  v-model="widget.value"
               />
            <div
               v-else-if="widget.type === 'Rounded'"
               @click="select(widget)"
               :style="{
                  backgroundColor: background(widget),
                  padding: widget.paddingX+'px '+widget.paddingY+'px',
                  border: widget.border,
                  borderRadius: `${widget.borderRadius}%`,
                  height: `${widget.height}px`,
                  width: `${widget.width}px`,
               }"></div>
            <div
               v-else-if="widget.type === 'Squared'"
               @click="select(widget)"
               :style="{
                  backgroundColor: background(widget),
                  padding: widget.paddingX+'px '+widget.paddingY+'px',
                  border: widget.border,
                  borderRadius: `${widget.borderRadius}%`,
                  height: `${widget.height}px`,
                  width: `${widget.width}px`,
               }"></div>
            <font-awesome-icon
               v-else-if="widget.type === 'Star'"
               @click="select(widget)"
               :style="{
                  color: widget.color,
                  opacity: widget.isTransparent?0:1,
                  fontSize: widget.size}"
               icon="fa-star"
            />
            <button
               @click="select(widget)"
               :style="{
                  backgroundColor: background(widget),
                  padding: widget.paddingX+'px '+widget.paddingY+'px',
                  border: widget.border,
                  height: `${widget.height}px`,
                  width: `${widget.width}px`,
                  fontSize: `${widget.size}px`,
                  color: widget.color,
                  borderRadius: `${widget.borderRadius}px`,
                  fontWeight: widget.fontWeight
               }"
               v-else>{{widget.text}}</button>
          </VueDragResize>

         </div>

    </div>
 </template>

 <script>
 import VueDragResize from 'vue-drag-resize';

 export default {
    props: {
       widgets: {
          required: true
       }
    },
    components: {
       VueDragResize
    },
    data() {
       return {
          dragOffsetX: null,
          dragOffsetY: null,
          selected: {}
       }
    },
    computed: {
      background: function () {
         return widget => widget.isTransparent == 'true' ? 'transparent': widget.background
      },
    },
    methods: {
      resize(e,widget) {
         widget.width = e.width
         widget.height = e.height
      },
      drag(e, widget) {
         widget.x = e.left
         widget.y = e.top
      },
       select: function (widget) {
          this.selected = widget
          this.$emit('selected', this.selected)
       },
       remove: function (id) {
          this.$emit('remove', id)
       },
    }
 }
 </script>

 <style  scoped>
    .small {
       cursor: move;
       display:inline-block;
       font: 'Nunito' 1px sans-serif;
       position: relative;
       user-select: none;
       -webkit-user-select: none;
    }

    .txt {
       padding: 15px 10px;
    }
    .box {
       margin: auto;
       position: center;
       display: block;
    }

    .drag {
      cursor: move;
    }

    .selected {
       border: 2px dashed #ded4f9;
    }

    .canvas {
       position: absolute;
    }
 </style>
