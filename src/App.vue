<template>
  <div class="main-app">
    <div class="side">
      <side-nav
        :widgets="widgets"
        @text="addText"
        @input="addInput"
        @rounded="addRoundedContainer('Rounded')"
        @squared="addRoundedContainer('Squared')"
        @star="addStar"
        @button="addButton"
      />
    </div>
    <div class="main">
      <drop-zone @selected="passSelected" @remove="removeWidget" :widgets="widgets" />
      <button @click="save" class="save">Save To Storage</button>
    </div>
    <div class="secondary">
      <div class="tabs">
        <ul class="tab-container">
          <li @click="activeTab = tab" :class="{'active': tab === activeTab}" class="tab" v-for="(tab, index) in tabs" :key="index">{{tab}}</li>
        </ul>
      </div>
      <prop-explorer @remove="removeWidget" v-if="activeTab === 'Properties'" @change="change" :element="selected" />
      <div class="arrangements" v-else>
        <draggable v-model="widgets" group="people" @start="drag=true" @end="drag=false">
          <div @click="selected = element" :class="{'active-arr': selected.id === element.id}" class="arr" v-for="element in widgets" :key="element.id">
            <p class="arrp">
              {{element.name}}
              <font-awesome-icon class="icons" icon="fa-star" v-if="element.type == 'Star'"/>
              <font-awesome-icon class="icons" icon="fa-font" v-else-if="element.type == 'Text'"/>
              <font-awesome-icon class="icons" icon="fa-square-minus" v-if="element.type == 'Input'"/>
              <font-awesome-icon class="icons" icon="fa-circle" v-if="element.type == 'Rounded'"/>
              <font-awesome-icon class="icons" icon="fa-square" v-if="element.type == 'Squared'"/>
              <font-awesome-icon class="icons" icon="fa-play" v-if="element.type == 'Button'"/>
            </p>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from './components/SideNav.vue';
import DropZone from './components/DropZone.vue';
import PropExplorer from './components/PropExplorer.vue';
import draggable from 'vuedraggable'

export default {
  components: {
    SideNav,
    DropZone,
    PropExplorer,
    draggable
  },
  data() {
    return {
      widgets: [],
      selected: null,
      tabs: ['Properties', 'Arrangement'],
      drag: false,
      activeTab: 'Properties'
    }
  },
  methods: {
    save() {
      const widgets = JSON.stringify(this.widgets)
      window.localStorage.setItem('WidgetStore', widgets)
    },
    change(params) {
      this.selected[params.param] = params.val
    },
    passSelected(selected) {
      this.selected = selected
    },
    removeWidget(id) {
      const toDelete = this.widgets.findIndex(x => x.id === id)
      if ( toDelete > -1 ) this.widgets.splice(toDelete, 1)
      this.selected = null
    },
    addText() {
      const id = this.uuid()
      this.widgets.push({
          x: 100,
          y: 100,
          type: 'Text',
          width: 100,
          height: 30,
          id,
          text: 'Custom Text',
          color: 'black',
          size: 24,
          name: `Text ${id.substring(0,5)}`,
          fontWeight: 200,
          textAlign: "left"
      })
    },
    addInput() {
      const id = this.uuid()
      this.widgets.push({
          x: 100,
          y: 100,
          width: 200,
          placeholder: 'Email',
          borderRadius: 3,
          height: 30,
          border: '1px solid black',
          paddingX: 6,
          paddingY: 10,
          type: 'Input',
          name: `Input ${id.substring(0,5)}`,
          id,
          value: ''
      })
    },
    addRoundedContainer(kind) {
      const id = this.uuid()
      this.widgets.push({
        x: 100,
        y: 100,
        width: 400,
        height: 400,
        borderRadius: kind === 'Rounded'?50:0,
        background: 'red',
        isTransparent: false,
        border: '3px solid black',
        type: kind === 'Rounded'?'Rounded':'Squared',
        id,
        name: `${kind} ${id.substring(0,5)}`,
        paddingX: 10,
        paddingY: 10
      })
    },
    addStar() {
      const id = this.uuid()
      this.widgets.push({
        x: 100,
        y: 100,
        width: 60,
        height: 60,
        size: 50,
        color: 'black',
        type: 'Star',
        id,
        name: `Star ${id.substring(0,5)}`,
      })
    },
    addButton() {
      const id = this.uuid()
      this.widgets.push({
        x: 100,
        y: 100,
        width: 150,
        border: '1px solid black',
        borderRadius: 5,
        height: 40,
        size: 16,
        paddingX: 4,
        paddingY: 10,
        background: 'black',
        color: 'white',
        isTransparent: false,
        type: 'Button',
        id,
        text: 'Button',
        name: `Button ${id.substring(0,5)}`,
        fontWeight: 200
      })
    },
    uuid() {
      return Math.random().toString().replace("0.", "")
    },
  },
  mounted() {
    const local = window.localStorage.getItem('WidgetStore')
    if (local)
      this.widgets = JSON.parse(local)
    else
      this.widgets = [
        {
          "x": 289,
          "y": 153,
          "width": 400,
          "height": 400,
          "borderRadius": 50,
          "background": "#e85d5b",
          "isTransparent": false,
          "border": "none",
          "type": "Rounded",
          "id": "012622555374495859",
          "name": "Rounded 01262",
          "paddingX": 10,
          "paddingY": 10
        },
        {
          "x": 296,
          "y": 160,
          "width": 380,
          "height": 380,
          "borderRadius": 50,
          "background": "red",
          "isTransparent": "true",
          "border": "2px solid #fff",
          "type": "Rounded",
          "id": "3547955866623407",
          "name": "Rounded 35479",
          "paddingX": 10,
          "paddingY": 10
        },
        {
          "x": 436,
          "y": 202,
          "width": 20,
          "height": 20,
          "size": "20",
          "color": "#cb3735",
          "type": "Star",
          "id": "15854292432539818",
          "name": "Star 15854"
        },
        {
          "x": 485,
          "y": 172,
          "width": 30,
          "height": 30,
          "size": "30",
          "color": "#cb3735",
          "type": "Star",
          "id": "3968231788961405",
          "name": "Star 39682"
        },
        {
          "x": 361,
          "y": 220,
          "type": "Text",
          "width": 272,
          "height": 105,
          "id": "25616077616400057",
          "text": "All the text and elements in this popup should be editable and draggable",
          "color": "#ffffff",
          "size": "22",
          "name": "Text 25616",
          "fontWeight": "800",
          "textAlign": "center"
        },
        {
          "x": 343,
          "y": 348,
          "width": 293,
          "placeholder": "Email",
          "borderRadius": "7",
          "height": 30,
          "border": "none",
          "paddingX": "12",
          "paddingY": "10",
          "type": "Input",
          "name": "Input 91503",
          "id": "9150349212814222",
          "value": ""
        },
        {
          "x": 342,
          "y": 409,
          "width": 311,
          "border": "1px solid black",
          "borderRadius": "7",
          "height": 43,
          "size": "18",
          "paddingX": 4,
          "paddingY": 10,
          "background": "#181818",
          "color": "white",
          "isTransparent": false,
          "type": "Button",
          "id": "4894153880422636",
          "text": "SIGNUP NOW",
          "name": "Button 48941",
          "fontWeight": "800"
        },
        {
          "x": 389,
          "y": 449,
          "type": "Text",
          "width": 271,
          "height": 30,
          "id": "21789105268925213",
          "text": "No credit card required. No Surprises",
          "color": "#ffffff",
          "size": "14",
          "name": "Text 21789",
          "fontWeight": 200
        },
        {
          "x": 543,
          "y": 202,
          "width": 20,
          "height": 20,
          "size": "20",
          "color": "#cb3735",
          "type": "Star",
          "id": "2637539001968816",
          "name": "Star 26375"
        }
      ]
  }
}

</script>

<style scoped>
  .main-app {
    display: flex;
  }
  .secondary {
    box-sizing: border-box;
    box-shadow: 2px 1px 10px #c3c2c2;
    padding: 20px 0;
    width: 300px;
  }
  .main {
    height: 100vh;
    width: 100%;
  }
  .tab-container {
    border-bottom: 1px solid #c3c2c2;
    display: flex;
    gap: 1em;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .tab {
    cursor: pointer;
    padding: 10px;
  }
  .active {
    color: #6708eb;
    border-bottom: 2px solid #6708eb;
  }
  .save {
    background: #ffffff;
    border: 1px solid #6708eb;
    border-radius: 5px;
    color: #6708eb;
    cursor: pointer;
    margin-left: 20px;
    margin-top: 20px;
    padding: 4px 10px;
  }
  .arr {
    background: #f3f3f3;
    border-bottom: 1px solid #ccc;
    padding: 10px 15px;
    width: 100%;
  }

  .arrp {
    font-size: 14px;
    margin: 0
  }
  .icons {
    font-size: 15px;
    margin-left: 10px;
  }
  .active-arr {
    background: #0c0b0b;
    color: #ffffff;
  }
</style>
