<template>
   <div class="sidenav">
      <h2>Poptin</h2>
      <ul>
         <li @click="loadComponent(item)" v-for="(item, index) in items" :key="index">
            <font-awesome-icon :icon="item.icon" />
            <span class="name">{{item.name}}</span>
         </li>
      </ul>
   </div>
</template>

<script>
export default {
   data() {
      return {
         items: [
            { name: 'Text Field', id: 1, icon: 'fa-font' },
            { name: 'Input Field', id: 2, icon: 'fa-square-minus' },
            { name: 'Rounded Container', id: 3, icon: 'fa-circle' },
            { name: 'Square Container', id: 3, icon: 'fa-square' },
            { name: 'Stars', id: 4, icon: 'fa-star' },
            { name: 'Buttons', id: 5, icon: 'fa-play' },
         ]
      }
   },
   methods: {
      loadComponent (item) {
         if (item.name == 'Text Field') {
            this.$emit('text')
         } else if (item.name == 'Input Field') {
            this.$emit('input')
         } else if (item.name === 'Rounded Container') {
            this.$emit('rounded')
         } else if (item.name === 'Square Container') {
            this.$emit('squared')
         } else if (item.name === 'Stars') {
            this.$emit('star')
         } else {
            this.$emit('button')
         }
      }
   },
}
</script>

<style scoped>
   h2 {
      color: #6708eb;
      font-size: 30px;
      font-weight: 900;
      margin: 10px 0;
      margin-top: 0 !important;
      padding: 30px;
      padding-top: 20px;
      padding-bottom: 20px;
   }
   .sidenav {
      background: #f2f2f2;
      box-sizing: border-box;
      box-shadow: 2px 1px 10px #f7f7f7;
      height: 100%;
      width: 250px;
   }

   ul {
      list-style: none;
      margin: 0;
      padding: 0;
   }

   li {
      cursor: pointer;
      padding: 15px 30px;
   }

   .name {
      margin-left: 15px;
   }
</style>
