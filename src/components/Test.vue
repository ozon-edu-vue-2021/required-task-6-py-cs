<template>
  <div id="app">
    <select v-model="component" class="select">
      <option v-for="option in options" :key="option" :value="option">{{option}}</option>
    </select>
    <SFCTable :headers="headers" :rows="rows" v-if="component === 'SFC'" />
    <FuncTable :headers="headers" :rows="rows" v-if="component === 'Function'" />
  </div>
</template>

<script>
import FuncTable from './test/FuncTable.vue';
import SFCTable from './test/SFCTable.vue';

import { TOTAL_COUNT } from '../constants';

export default {
  name: 'App',
  components: { FuncTable, SFCTable },
  data() {
    return {
      headers: [],
      rows: [],
      component: 'none',
      options: ['none', 'SFC', 'Function']
    };
  },
  async created() {
    const response = await fetch(`https://fakerapi.it/api/v1/credit_cards?_quantity=${TOTAL_COUNT}`).then(res => res.json());
    const { data } = response;
    this.headers = Object.keys(data[0]);
    const rows = data.map(row => Object.values(row));
    this.rows = new Array(10).fill(rows).flat();
  },
};
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>