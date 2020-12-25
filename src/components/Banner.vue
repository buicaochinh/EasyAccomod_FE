<template>
  <div class="wrapper">
    <div class="overlay">
      <div class="container">
        <p class="title">Giải pháp tìm kiếm nhà trọ cho tương lai</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  position: relative;
  background: url("../../public/images/banner.jpg");
  background-size: cover;
  height: 30vh;
  display: flex;
  align-items: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
}
.overlay .container {
  position: relative;
  height: 100%;
  width: 100%;
}
p.title {
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  text-align: center;
  width: 100%;
  transform: translate(-50%, -50%);
}
</style>
