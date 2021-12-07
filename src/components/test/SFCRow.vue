<template>
  <tr>
    <td v-for="(col, colIndex) in row" :key="colIndex" class="cell">{{col}}</td>
  </tr>
</template>

<script>
export default {
  name: 'SFCRow',
  props: {
    row: {
      type: Array,
      default: () => []
    },
  },
}
</script>

<style scoped>
  .cell {
    text-align: left;
    border-bottom: 1px solid #c8cacc;
    padding: 1rem 1rem;
  }
</style>