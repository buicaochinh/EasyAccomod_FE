<template>
  <div class="table-wrapper">
    <div class="title is-4">{{ $props.title }}</div>
    <b-table
      :data="data"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      :pagination-rounded="isPaginationRounded"
      :sort-icon="sortIcon"
      :sort-icon-size="sortIconSize"
      default-sort="user.first_name"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <b-table-column
        field="user.name"
        label="Tiêu đề"
        width="25rem"
        sortable
      ></b-table-column>

      <b-table-column
        field="user.name"
        label="Danh mục"
        width="10rem"
      ></b-table-column>

      <b-table-column
        field="user.name"
        label="Giá phòng"
        width="10rem"
        sortable
      ></b-table-column>

      <b-table-column field="date" label="Tình trạng" width="8rem" centered>
        <span class="tag is-success">
          {{ new Date().toLocaleDateString() }}
        </span>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 5
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
div.title.is-4 {
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
}
</style>
