<template>
  <div class="wrapper">
    <h3 class="title is-3">Quản lý báo cáo</h3>
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Nội dung</th>
          <th>Bài viết</th>
          <th>Người đăng</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, index) in reportsPagination" :key="index">
          <td>{{ report.request }}</td>
          <td>{{ report.id_post }}</td>
          <td>{{ report.id_from }}</td>
          <td>
            <button
              :class="[
                'button',
                'is-small',
                report.status === 0 ? 'is-info' : 'is-success'
              ]"
              :disabled="report.status === 1"
              @click="previewReport(report.id, index)"
            >
              {{ report.status === 1 ? "Đã duyệt" : "Duyệt" }}
            </button>
          </td>
          <td>
            <button
              class="button is-small is-danger"
              @click="deleteReport(report.id, index)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      type="is-info"
      :total="reports.length"
      v-model="current"
      :range-before="2"
      :range-after="2"
      order="is-centered"
      side="default"
      :simple="false"
      :rounded="false"
      :per-page="10"
      icon-prev="chevron-left"
      icon-next="chevron-right"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
    </b-pagination>
  </div>
</template>

<script>
import AdminServices from "../../../apis/modules/admin";
import { pagination } from "@/services/pagination";
export default {
  data() {
    return {
      reports: [],
      current: 1
    };
  },
  computed: {
    reportsPagination() {
      let page = this.current;
      return [...pagination(this.reports, page)];
    }
  },
  created() {
    this.$emit("update:layout", "AdminLayout");
    setTimeout(() => {
      AdminServices.getAllReports().then(response => {
        this.reports = response.data.data;
      });
    }, 500);
  },
  methods: {
    previewReport(rid, index) {
      let arr = [...this.reports];
      this.reports = [
        ...arr.slice(0, index),
        {
          ...arr[index],
          status: 1
        },
        ...arr.slice(index + 1)
      ];
      AdminServices.postPreviewReport(rid, { _method: "PATCH", status: 1 });
    },
    deleteReport(rid, index) {
      this.reports.splice(index, 1);
      AdminServices.postDeleteReport(rid, { _method: "DELETE" });
    }
  }
};
</script>

<style scoped></style>
