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
      <div class="top">
        <button @click="save" class="save">
          <span v-if="!saving">Save To Storage</span>
          <span v-else>Saving <font-awesome-icon spin icon="fa-spinner" /></span>
        </button>
        <pre class="link" @click="copy">Script Link: {{link}}</pre>
      </div>
      <div v-if="snack" class="snack" :style="{background: getBackground}">
        {{message}}
      </div>
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
import uiStore from './uiStore';
import { getDatabase, child, set, ref, get } from 'firebase/database'

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
      activeTab: 'Properties',
      saving: false,
      snack: false,
      state: 'none',
      message: '',
      link: 'https://popup-c2ba0.web.app/js/app.js'
    }
  },
  computed: {
    getBackground() {
      if (this.state == 'success') return '#57d16e'
      return '#f44e4e'
    }
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.link)
      try {
        this.snack = true
        this.state = 'success'
        this.message = 'Link has been copied'
      } catch (err) {
        this.snack = false
        this.state = 'fail'
        this.message = 'Sorry an error occured'
      }
      setTimeout(() => {
        this.snack = false
      }, 3000);
    },
    async save() {
      this.saving = true
      const db = getDatabase()
      try {
        await set(ref(db, 'widgets'), this.widgets)
        this.snack = true
        this.state = 'success'
        this.message = 'Template saved successfully'
      } catch (err) {
        this.snack = false
        this.state = 'fail'
        this.message = 'Sorry an error occured'
      }
      setTimeout(() => {
        this.snack = false
      }, 3000);
      this.saving = false
    },
    change(params) {
      this.selected[params.param] = params.val
      this.selected['x'] = this.selected['x'] + 0.1
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
          color: '#000000',
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
          border: '1px solid #000000',
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
        background: '#FF0000',
        isTransparent: false,
        border: '3px solid #000000',
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
        color: '#000000',
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
        w: 150,
        border: '1px solid #000000',
        borderRadius: 5,
        h: 40,
        size: 16,
        paddingX: 4,
        paddingY: 10,
        background: '#000000',
        color: '#FFFFFF',
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
    loadWidgets() {
      const db = ref(getDatabase())
      get(child(db, 'widgets')).then(snap => {
        if (snap.exists) {
          this.widgets = snap.val()
        } else {
          this.widgets = uiStore
        }
      })
    }
  },
  mounted() {
    this.loadWidgets()
  }
}

</script>

<style scoped>
  .main-app {
    display: none;
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
    padding: 1px 10px;
    height: 30px;
    margin-top: 10px
  }
  .link {
    cursor: pointer;
  }
  .top {
    display: flex;
    position: absolute;
    left: 280px;
    gap: 10px;
    top: 20px;
  }
  .snack {
    bottom: 0;
    left: 0;
    color: #FFFFFF;
    text-align: center;
    padding: 3px;
    position: absolute;
    width: 100%;
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
