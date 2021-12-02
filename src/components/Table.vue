<script lang="jsx">
import Pagination from './Pagination';
import Dropdown from './Dropdown';
import Loader from '../assets/loader.svg';
import { PAGINATION_OPTIONS } from '../constants';
import orderBy from 'lodash';

export default {
  name: 'Table',
  props: {
    rows: {
      type: Array,
      default: () => []
    },
    totalPages: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    pagination: {
      type: String,
      default: PAGINATION_OPTIONS[0],
    }
  },
  data() {
    return {
      sortProp: '',
      sortDirection: '',
      filterProp: '',
      filterText: ''
    };
  },
  computed: {
    sortedRows() {
      let res;

      if (!this.sortProp) {
        res =  this.rows;
      }

      res = orderBy(this.rows, [this.sortProp], [this.sortDirection]);

      if(this.filterText) {
        res = res.filter(row => row[this.filterProp].search(this.filterText) > -1)
      }

      return res;
    }
  },
  methods: {
    renderRows(h, columnsOptions) {
      return this.sortedRows.map((row, index) => {
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
            callback: this.$listeners.getPage
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
      this.sortProp = prop;
      this.sortDirection = (this.sortDirection === 'desc' || !this.sortDirection) ? 'asc' : 'desc';
    },
    openFilterTooltip(prop = '') {
      this.filterProp = prop;
      this.filterText = '';
    },
    setFilterText(e) {
      this.filterText = e.target.value;
    },
    renderHead(h, columnsOptions) {
      const { $style, sortProp, sortDirection, filterProp, filterText } = this;

      return columnsOptions.map((column) => {
        const renderedTitle = column.scopedSlots.title ? column.scopedSlots.title() : column.title;
        let sortIcon = 'sort';

        if (sortProp === column.prop) {
          sortIcon = sortDirection === 'asc' ? 'sort-amount-down' : 'sort-amount-up';
        }

        return (
          <th key={column.prop} class={$style.headerCell}>
            <div class={$style.headerCellContent}>
              <span>{renderedTitle}</span>
              <font-awesome-icon
                class={$style.sortIcon}
                icon={sortIcon}
                on={{ click: () => this.toggleSort(column.prop) }}
              />
              <Dropdown
                columnProp={column.prop}
                shown={column.prop === filterProp}
                filterText={filterText}

                on={{
                  openFilterTooltip: () => this.openFilterTooltip(column.prop),
                  closeFilterTooltip: () => this.openFilterTooltip(),
                  setFilterText: this.setFilterText,
                }}
              />
            </div>
          </th>
        );
      });
    },
  },
  render(h) {
    const { $style, totalPages, currentPage, pagination, $listeners } = this;
    const { getPage } = $listeners;
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
          ? <Pagination totalPages={totalPages} currentPage={currentPage} on={{ getPage: getPage }} />
          : this.renderInfPager()
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

  .infPager {
    width: 100%;
    height: 32px;
  }
</style>
