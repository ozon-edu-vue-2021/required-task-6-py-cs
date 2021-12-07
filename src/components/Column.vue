<script>
export default {
  name: 'Column',
  props: {
    prop: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  }
};
</script>
