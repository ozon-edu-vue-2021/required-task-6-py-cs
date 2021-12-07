<template>
  <table class="table">
    <thead>
      <th v-for="header in headers" :key="header" class="headerCell">
        <div class="headerContent">
          {{header}}
        </div>
      </th>
    </thead>
    <tbody>
      <SFCRow v-for="(row, rowIndex) in rows" :key="rowIndex" :row="row" />
    </tbody>
  </table>  
</template>

<script>
import SFCRow from './SFCRow.vue';

export default {
  name: 'SFCTable',
  components: { SFCRow },
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    },
  },
}
</script>

<style scoped>
.table {
    border-spacing: 0;
    margin: 8px;
    width: 100%;
  }
 
.headerCell {
  text-align: left;
  border-bottom: 1px solid #c8cacc;
  padding: 1rem 1rem;
  background: #c7cbcb;
}

.headerContent {
  display: flex;
  gap: 10px;
}
</style>