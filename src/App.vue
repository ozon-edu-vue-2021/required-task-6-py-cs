<template>
  <div id="app">
    <label for="test">
      <input id="test" type="checkbox" v-model="testMode" />
      Test mode
    </label>
    <Test v-if="testMode" />
    <div v-else>
      <Selector
        :pagination="pagination"
        
        :changePagination="changePagination"
      />
      <Table :rows="rows" :pagination="pagination">
        <Column prop="owner" title="Owner" />
        <Column prop="type" title="Type" />
        <Column prop="number" title="Number" />
        <Column prop="expiration" title="Exp. Date" />
      </Table>
    </div>
  </div>
</template>

<script>
import Selector from './components/Selector.vue';
import Table from './components/Table.vue';
import Column from './components/Column.vue';
import Test from './components/Test.vue';
import { TOTAL_COUNT, PAGINATION_OPTIONS } from './constants';

export default {
  name: 'App',
  components: { Selector, Table, Column, Test },
  data() {
    return {
      rows: [],
      pagination: PAGINATION_OPTIONS[0],
      testMode: false,
    };
  },
  async created() {
    const response = await fetch(`https://fakerapi.it/api/v1/credit_cards?_quantity=${TOTAL_COUNT}`).then(res => res.json());
    this.rows = response.data;
  },
  methods: {
    changePagination(mode) {
      this.pagination = mode
    },
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