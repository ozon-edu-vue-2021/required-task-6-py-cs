<script lang="jsx">
import { PAGINATION_OPTIONS } from '../constants';

export default {
  name: "Selector",
  props: {
    pagination: {
      type: String,
      default: "Static"
    },
  },
  render() {
      const options = PAGINATION_OPTIONS;
      const { changePagination } = this.$listeners;

      return (
        <label>Pagination mode:
          <select
            value={this.pagination}
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

<style>

</style>