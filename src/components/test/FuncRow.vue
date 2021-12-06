<script lang="jsx">
export default {
  name: 'FuncRow',
  functional: true,
  render(h, context) {
    return (
      <tr>
        {context.props.row.map((col, colIndex) => (
          <td key={colIndex} class={context.$style.cell}>
            { col }
          </td>
        ))}
      </tr>
    );
  }
};
</script>

<style module>
  .cell {
    text-align: left;
    border-bottom: 1px solid #c8cacc;
    padding: 1rem 1rem;
  }
</style>