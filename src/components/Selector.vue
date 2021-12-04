<script lang="jsx">
import { PAGINATION_OPTIONS } from '../constants';

export default {
  name: "Selector",
  functional: true,
  props: {
    pagination: {
      type: String,
      default: "Static"
    },
    changePagination: {},
  },
  render(h, context) {
      const options = PAGINATION_OPTIONS;
      const { props, $style } = context;
      const { pagination, changePagination } = props;

      return (
        <label class={$style.selector}>Pagination mode:
          <select class={$style.input}
            value={pagination}
            on={{ change: (e) => changePagination(e.target.value) }}
          >
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      )
  }
}
</script>

<style module>
  .selector {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    border-top: 1px solid #c8cacc;
    border-bottom: 1px solid #c8cacc;
  }
  .input {
    margin-left: 10px;
  }
</style>