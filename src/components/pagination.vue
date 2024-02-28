<template>
  <nav
    aria-label="..."
    v-if="data.list.length"
    class="d-flex justify-content-center mt-4"
  >
    <ul class="pagination">
      <li
        :class="`page-item ${l.label.toString() == data.current_page ? 'active' : ''}  ${
          l.label == '...' ? 'disabled' : ''
        }`"
        v-for="l in data.links"
        :key="l.label"
      >
        <a
          class="page-link"
          href="javascript:void(0);"
          @click.prevent="emitPage(l.label)"
          >{{
            l.label.includes("previous") || l.label.includes("Previous")
              ? "&laquo;"
              : l.label.includes("next") || l.label.includes("Next")
              ? "&raquo;"
              : l.label
          }}</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
  methods: {
    emitPage(page) {
      if (page.includes("previous")) {
        if (this.data.current_page > 1) {
          this.$emit("emitPage", this.data.current_page - 1);
        }
      } else if (page.includes("next")) {
        if (this.data.current_page < this.data.last_page) {
          this.$emit("emitPage", this.data.current_page + 1);
        }
      } else {
        this.$emit("emitPage", parseInt(page));
      }
    },
  },
};
</script>

<style scoped>
nav {
  margin-left: auto;
}
.pagination {
  display: flex;
  flex-wrap: wrap;
}

.page-item.active a {
  background: #2a3042;
  border-color: #2a3042;
}
</style>
