<template>
  <div class="wrapper">
    <div class="container">
      <section class="section">
        <b-field label="Thể loại" type="is-info">
          <b-select placeholder="Thể loại">
            <option value="Phòng trọ">
              Phòng trọ
            </option>
          </b-select>
        </b-field>

        <b-field label="Tỉnh/Thành phố" type="is-info">
          <b-select placeholder="Hà Nội">
            <option value="Hà Nội">
              Hà Nội
            </option>
          </b-select>
        </b-field>

        <b-field label="Quận/Huyện" type="is-info">
          <b-select placeholder="Quận/Huyện">
            <option value="Cầu Giấy">
              Cầu Giấy
            </option>
          </b-select>
        </b-field>

        <b-field label="Đường/Phố" type="is-info">
          <b-select placeholder="Khu vực">
            <option value="Xuân Thủy">
              Xuân Thủy
            </option>
          </b-select>
        </b-field>

        <b-field label="Khoảng giá" type="is-info">
          <b-select placeholder="Khoảng giá">
            <option value="Khoảng giá">
              1000000
            </option>
          </b-select>
        </b-field>

        <b-field label="Diện tích" type="is-info">
          <b-select placeholder="Diện tích">
            <option value="35m2">
              35m2
            </option>
          </b-select>
        </b-field>

        <b-field label="Tiện ích">
          <b-checkbox type="is-info">
            Tủ
          </b-checkbox>
        </b-field>

        <button class="button is-info" style="margin-top: 2rem">
          Tim kiếm
        </button>
      </section>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  background-color: #f5f5f5;
}
</style>
