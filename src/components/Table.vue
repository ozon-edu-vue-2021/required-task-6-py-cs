<script lang="jsx">
import Pagination from './Pagination';
import Loader from '../assets/loader.svg';
import { SORT_ICONS, PAGE_LIMIT, PAGINATION_OPTIONS } from '../constants';

export default {
  name: 'Table',
  props: {
    rows: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: String,
      default: () => PAGINATION_OPTIONS[0]
    },
  },
  data() {
    return {
      limit: PAGE_LIMIT,
      currentPage: 1,
      sorts: {},
      sortsOrder: [],
      filters: {},
    };
  },
  computed: {
    filteredRows() {
      const { rows, filters } = this;
      let res = [...rows];
      Object.entries(filters).forEach(([col, filterText]) => {
        if (filterText) {
          res = res.filter(row => row[col].search(filterText) > -1)
        }
      });
      return res;
    },
    sortedRows() {
      const { sortsOrder, sorts, filteredRows } = this;
      if (!sortsOrder.length) return filteredRows;
      let res = [...filteredRows];
      sortsOrder.forEach((col) => {
          res = res.sort((a, b) => sorts[col] === 'asc' ? a[col].localeCompare(b[col]) : b[col].localeCompare(a[col]))
      });
      return res;
    },
    visibleRows() {
      const { sortedRows, pagination, currentPage } = this;
      return sortedRows
        .slice((pagination === "Static" ? (currentPage - 1) * PAGE_LIMIT : 0), currentPage * PAGE_LIMIT + 1)
    },
    totalPages() {
      return Math.ceil(this.filteredRows.length / PAGE_LIMIT);
    },
  },
  methods: {
    getPage(number) {
      this.currentPage = number;
    },
    async getNextPage() {
      await new Promise(res => setTimeout(res, 500));
      this.currentPage++;
    },
    renderRows(h, columnsOptions) {
      return this.visibleRows.map((row, index) => {
        return <tr key={row.id || index}>{...this.renderColumns(h, row, columnsOptions)}</tr>;
      });
    },
    renderColumns(h, row, columnsOptions) {
      return columnsOptions.map((column) => {
        return (
          <td key={column.prop} class={this.$style.cell}>
            {column.scopedSlots.body ? column.scopedSlots.body({ row }) : row[column.prop]}
          </td>
        );
      });
    },
    getColumnOptions() {
      return this.$slots.default.
        filter(item => item.componentOptions && item.componentOptions.tag === 'Column').
        map(column =>
          Object.assign({}, column.componentOptions.propsData, {
              scopedSlots: column.data.scopedSlots || {}
            }
          )
        );
    },
    renderInfPager() {
      const directives = [
        {
          name: 'detect-viewport',
          value: {
            callback: this.getNextPage
          }
        }
      ];

      const style = {
        background: `url("${Loader}") no-repeat center`
      };

      return (
        <div {...{ class: this.$style.infPager, style, directives }} />
      );
    },
    toggleSort(prop) {
      const current = this.sorts[prop];
      const sortOptions = Object.keys(SORT_ICONS);
      const currentIdx = sortOptions.indexOf(current);
      const nextIdx = (currentIdx + 1) % sortOptions.length;
      if (nextIdx === 1) this.sortsOrder.push(prop);
      if (nextIdx === 0) this.sortsOrder = this.sortsOrder.filter((el) => el !== prop);
      const next = sortOptions[nextIdx];
      this.sorts[prop] = next;
    },
    setFilterText(column, value) {
      this.$set(this.filters, column, value);
      this.currentPage = 1;
    },
    renderHead(h, columnsOptions) {
      const { $style, sorts, setFilterText } = this;

      return columnsOptions.map((column) => {
        const { prop } = column;
        const renderedTitle = column.scopedSlots.title ? column.scopedSlots.title() : column.title;

        if (!sorts[prop]) {
          this.$set(sorts, prop, 'none');
        }

        const sortIcon = SORT_ICONS[sorts[prop]] || 'sort';

        return (
          <th key={column.prop} class={$style.headerCell}>
            <div class={$style.headerContent}>
              <span>{renderedTitle}</span>
              <font-awesome-icon
                class={$style.sortIcon}
                icon={sortIcon}
                on={{ click: () => this.toggleSort(prop) }}
              />
            </div>
            <div class={$style.headerContent}>
              <input 
                value={this.filters[prop]}
                on={{ input: (e) => setFilterText(prop, e.target.value) }}
              />
              <font-awesome-icon
                class={$style.sortIcon}
                icon="trash"
                on={{ click: () => setFilterText(prop, '') }}
              />
            </div>
          </th>
        );
      });
    },
  },
  render(h) {
    const { $style, totalPages, currentPage, pagination, getPage, renderInfPager } = this;
    const columnsOptions = this.getColumnOptions();
    const columnsHead = this.renderHead(h, columnsOptions);
    const rows = this.renderRows(h, columnsOptions);

    return (
      <div>
        <table class={$style.table}>
          <thead>{...columnsHead}</thead>
          <tbody>{...rows}</tbody>
        </table>
        {pagination === "Static"
          ? <Pagination totalPages={totalPages} currentPage={currentPage} getPage={getPage} />
          : currentPage < totalPages ? renderInfPager() : ""
        }
      </div>
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

  .infPager {
    width: 100%;
    height: 32px;
  }
</style>
