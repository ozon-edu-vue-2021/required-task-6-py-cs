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
      const handleChangePagination = (e) => {
        const newMode = e.target.value;
        this.$listeners.changePagination(newMode);
      }
      return (
        <label>Pagination mode:
          <select value={this.pagination} onChange={handleChangePagination}>
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