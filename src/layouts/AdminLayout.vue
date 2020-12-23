<template>
  <div class="admin-layout">
    <HeaderAdmin />
    <SideBar>
      <slot />
    </SideBar>
  </div>
</template>

<script>
import HeaderAdmin from "../components/Admin/HeaderAdmin";
import SideBar from "../components/Admin/SideBar";
export default {
  components: {
    HeaderAdmin,
    SideBar
  }
};
</script>

<style scoped></style>
