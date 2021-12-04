<script lang="jsx">
export default {
  name: 'FuncTable',
  functional: true,
  render(h, context) {
    const { props, $style } = context;
    const { headers, rows } = props;
    return (
      <table class={$style.table}>
        <thead>
          {headers.map((header, index) => (
            <th key={index} class={$style.headerCell}>
              <div class={$style.headerContent}>
                { header }
              </div>
            </th>
          ))}
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td key={colIndex} class={$style.cell}>
                  { col }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};
</script>

<style module>
  .table {
    border-spacing: 0;
    margin: 8px;
    width: 100%;
  }

  .cell {
    text-align: left;
    border-bottom: 1px solid #c8cacc;
    padding: 1rem 1rem;
  }

  .headerCell {
    composes: cell;
    background: #c7cbcb;
  }

  .headerContent {
    display: flex;
    gap: 10px;
  }
</style>
