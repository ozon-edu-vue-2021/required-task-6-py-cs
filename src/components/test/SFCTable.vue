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
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="(col, colIndex) in row" :key="colIndex" class="cell">{{col}}</td>
      </tr>
    </tbody>
  </table>  
</template>

<script>
export default {
  name: 'SFCTable',
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

  .cell, 
  .headerCell {
    text-align: left;
    border-bottom: 1px solid #c8cacc;
    padding: 1rem 1rem;
  }

  .headerCell {
    background: #c7cbcb;
  }

  .headerContent {
    display: flex;
    gap: 10px;
  }
</style>