<template>
  <div class="wrapper">
    <div class="container">
      <section class="section">
        <div class="columns">
          <div class="column">
            <b-field label="Thể loại" type="is-info">
              <b-select placeholder="Thể loại">
                <option value="Phòng trọ">
                  Phòng trọ
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Tỉnh/Thành phố" type="is-info">
              <b-select placeholder="Hà Nội">
                <option value="Hà Nội">
                  Hà Nội
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Quận/Huyện" type="is-info">
              <b-select placeholder="Quận/Huyện">
                <option value="Cầu Giấy">
                  Cầu Giấy
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Khu vực" type="is-info">
              <b-select placeholder="Khu vực">
                <option value="Xuân Thủy">
                  Xuân Thủy
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Khoảng giá" type="is-info">
              <b-select placeholder="Khoảng giá">
                <option value="Khoảng giá">
                  1000000
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Diện tích" type="is-info">
              <b-select placeholder="Diện tích">
                <option value="35m2">
                  35m2
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column">
            <button class="button is-info" style="margin-top: 2rem">
              Lọc
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  background: url("../../public/images/banner.jpeg");
  background-size: cover;
  display: flex;
  align-items: center;
  height: 15rem;
}

.section {
  background-color: aliceblue;
  opacity: 0.95;
  border-radius: 5px;
}
</style>
