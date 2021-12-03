<template>
  <div id="app">
    <Selector
      :pagination="pagination"
      
      @changePagination="changePagination"
    />
    <Table
      :rows="rows"
      :total-pages="totalPages"
      :current-page="currentPage"
      :pagination="pagination"

      @getPage="getNextPage"
    >
      <Column prop="owner" title="Owner" />
      <Column prop="type" title="Type" />
      <Column prop="number" title="Number" />
      <Column prop="expiration" title="Exp. Date" />
    </Table>
  </div>
</template>

<script>
import Selector from './components/Selector.vue';
import Table from './components/Table.vue';
import Column from './components/Column.vue';
import { TOTAL_COUNT, PAGE_LIMIT } from './constants';

export default {
  name: 'App',
  components: { Selector, Table, Column },
  data() {
    return {
      allRows: [],
      rows: [],
      limit: PAGE_LIMIT,
      currentPage: 1,
      pagination: "Static",
    };
  },
  async created() {
    const response = await fetch(`https://fakerapi.it/api/v1/credit_cards?_quantity=${TOTAL_COUNT}`).then(res => res.json());
    this.allRows = response.data;
    this.rows = await this.getPageByNumber(this.currentPage);
  },
  methods: {
    changePagination(mode) {
      this.pagination = mode
    },
    async getPageByNumber(number) {
      await new Promise(res => setTimeout(() => res(), 500));
      const { limit } = this;
      const from = (number - 1) * limit;
      const to = number * limit
      const slice = this.allRows.slice(from, to);
      return slice;
    },
    async getStaticPage(number) {
      this.rows = await this.getPageByNumber(number);
      this.currentPage = number;
    },
    async getNextPage() {
      console.log('getting');
      this.currentPage++;
      const newRows = await this.getPageByNumber(this.currentPage);
      console.log(newRows);
      this.rows = [...this.rows, ...newRows];
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.allRows.length / PAGE_LIMIT);
    },
    // getPage: this.pagination === "Static" ? this.getStaticPage : this.getNextPage,
  }
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