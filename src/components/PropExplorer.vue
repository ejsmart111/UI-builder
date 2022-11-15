<template>
   <div class="explorer">
      <p v-if="element == null">Select components</p>
      <div v-else>
         <p>{{element.name}}</p>
         <div class="fields">
            <label>X Axis</label>
            <input :value="element.x" type="number" @input="change($event, 'x')"/>
         </div>
         <div class="fields">
            <label>Y Axis</label>
            <input :value="element.y" type="number" @input="change($event, 'y')" />
         </div>
         <div class="fields">
            <label>Width</label>
            <input :value="element.width" type="number" @input="change($event, 'width')"/>
         </div>
         <div class="fields">
            <label>Height</label>
            <input :value="element.height" type="number" @input="change($event, 'height')"/>
         </div><hr v-if="element.background || element.color">
         <div v-if="colorField.includes(element.type)" class="fields">
            <label>Color</label>
            <input :value="element.color" type="color" @input="change($event, 'color')" />
         </div>
         <div v-if="backgroundField.includes(element.type)" class="fields">
            <label>Background</label>
            <input :value="element.background" type="color" @input="change($event, 'background')" />
         </div>
         <hr>
         <div v-if="textField.includes(element.type)" class="fields" >
            <label>Text</label>
            <input :value="element.text" type="text" @input="change($event, 'text')"/>
         </div>
         <div v-if="element.type === 'Input'" class="fields" >
            <label>Placeholder</label>
            <input :value="element.placeholder" type="text" @input="change($event, 'placeholder')"/>
         </div>
         <div v-if="sizeField.includes(element.type)" class="fields" >
            <label>Size</label>
            <input :value="element.size" type="number" @input="change($event, 'size')"/>
         </div>
         <div v-if="weightField.includes(element.type)" class="fields" >
            <label>Font Weight</label>
            <input :value="element.fontWeight" type="number" @input="change($event, 'fontWeight')"/>
         </div>
         <div v-if="element.type === 'Text'" class="fields" >
            <label>Text Align</label>
            <select :value="element.textAlign" @input="change($event, 'textAlign')">
               <option :value="'left'">Left</option>
               <option :value="'center'">Center</option>
               <option :value="'right'">Right</option>
            </select>
         </div>
         <div v-if="borderRadiusFieldPc.includes(element.type)" class="fields" >
            <label>Radius</label>
            <div class="input-group">
               <input :value="element.borderRadius" type="number" @input="change($event, 'borderRadius')"/>
               <div class="suffix">%</div>
            </div>
         </div>
         <div v-if="borderRadiusFieldPx.includes(element.type)" class="fields" >
            <label>Radius</label>
            <div class="input-group">
               <input :value="element.borderRadius" type="number" @input="change($event, 'borderRadius')"/>
               <div class="suffix">px</div>
            </div>
         </div>
         <div v-if="paddingField.includes(element.type)">
            <div class="fields">
               <label>Padding X</label>
               <input :value="element.paddingX" type="number" @input="change($event, 'paddingX')"/>
            </div>
            <div class="fields">
               <label>Padding Y</label>
               <input :value="element.paddingY" type="number" @input="change($event, 'paddingY')"/>
            </div>
         </div>
         <div v-if="isTransparentField.includes(element.type)" class="fields">
            <label>Transparent</label>
            <select :value="element.isTransparent" @input="change($event, 'isTransparent')">
               <option :value="true">Yes</option>
               <option :value="false">No</option>
            </select>
         </div>
         <div v-if="borderField.includes(element.type)" class="fields" >
            <label>Border</label>
            <input :value="element.border" type="text" @input="change($event, 'border')"/>
         </div>
      </div>

      <button @click="remove" v-if="element !== null" class="delete">Remove Element</button>
   </div>
</template>

<script>
export default {
   props: {
      element: {
         type: Object
      }
   },
   computed: {
      textField () {
         return ['Text', 'Button']
      },
      sizeField () {
         return ['Text', 'Button', 'Star']
      },
      borderRadiusFieldPc () {
         return ['Rounded', 'Squared' ]
      },
      borderRadiusFieldPx () {
         return ['Button', 'Input' ]
      },
      paddingField () {
         return ['Button', 'Squared', 'Rounded', 'Input' ]
      },
      isTransparentField () {
         return ['Button', 'Squared', 'Rounded' ]
      },
      borderField () {
         return ['Button', 'Squared', 'Rounded', 'Input' ]
      },
      colorField () {
         return ['Text', 'Star', 'Button' ]
      },
      backgroundField () {
         return ['Rounded', 'Squared', 'Button' ]
      },
      weightField () {
         return ['Text', 'Button' ]
      }
   },
   methods: {
      change(e, param) {
         const val = e.target['type'] === 'number' ? parseInt(e.target.value) : e.target['value']
         this.$emit('change', {val, param})
      },
      remove: function () {
         this.$emit('remove', this.element.id)
      },
   }
}
</script>

<style scoped>
   hr {
      margin: 20px 0;
   }
   .input-group {
      display: flex;
   }
   .input-group input {
      border-radius: 0px;
      box-shadow: none;
      border: 1px solid black
   }
   .explorer {
      padding: 10px 10px;
   }
   .suffix {
      background: #ebe8e8;
      font-size: 12px;
      padding: 1.5px 4px;
      border: 1px solid black;
   }
   .fields {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
   }

   .fields input {
      width: 80px;
   }

   .fields label {
      font-size: 13px;
   }
   .delete {
      background: #e83735;
      border: none;
      box-shadow: none;
      color: #ffffff;
      cursor: pointer;
      display: block;
      margin-top: 30px;
      padding: 8px 10px;
      width: 100%;
   }
</style>
