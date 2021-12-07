<script lang="jsx">
export default {
  name: 'Pagination',
  functional: true,
  props: {
    totalPages: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    getPage: {},
  },
  render(h, context) {
    const { $style, props } = context;
    const { getPage, totalPages, currentPage } = props;

    const pageNumbers = totalPages <= 5
      ? new Array(totalPages).fill(null).map((_, idx) => idx + 1)
      : new Array(5).fill(null).map((_, idx) => idx + (currentPage < 3 ? 1 : currentPage > totalPages - 2 ? (totalPages - 4) : currentPage - 2));

    return (
      <div class={$style.pagination}>
        {!pageNumbers.includes(1) ? 
          <span class={$style.span}>
            <span class={$style.control} on={{ click: () => getPage(1) }}>1</span>
            <span class={$style.span}>...</span>
          </span>
          : <span />
        }
        
        {...pageNumbers.map(
          number => (
            <span
              class={[$style.control, { [$style.active]: currentPage === number }]}
              on={{ click: () => getPage(number) }}
            >
              {number}
            </span>
          )
        )}
        {!pageNumbers.includes(totalPages) ? 
          <span class={$style.span}>
            <span class={$style.span}>...</span>
            <span class={$style.control} on={{ click: () => getPage(totalPages) }}>{totalPages}</span>
          </span>
          : <span />
        }
      </div>
    );
  }
};
</script>

<style module>
  .pagination {
    height: 48px;
    width: 100%;
    border-bottom: 1px solid #c8cacc;
    display: flex;
    align-items: center;
    margin-left: 8px;
  }

  .control,
  .span {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    padding-top: 6px;
    user-select: none;
  }

  .control:last-of-type {
    margin-right: 0;
  }

  .control:hover {
    cursor: pointer;
  }

  .control.active {
    color: cornflowerblue;
    background: ivory;
    border: 1px solid #c8cacc;
    border-radius: 6px;
  }
</style>
