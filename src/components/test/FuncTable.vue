<script lang="jsx">
import FuncRow from './FuncRow'

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
          {rows.map((row, rowIndex) => (<FuncRow row={row} key={rowIndex} />))}
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
