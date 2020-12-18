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
          <b-select placeholder="Tỉnh/Thành phố" v-model="provinceFilter">
            <option
              v-for="(province, index) in provinces"
              :key="index"
              :value="province.id"
            >
              {{ province.name }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Quận/Huyện" type="is-info">
          <b-select placeholder="Quận/Huyện" v-model="districtFilter">
            <option
              v-for="(district, index) in districts"
              :key="index"
              :value="district.id"
            >
              {{ district.name }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Phường/Xã" type="is-info" v-model="wardFilter">
          <b-select placeholder="Phường">
            <option
              v-for="(ward, index) in wards"
              :key="index"
              :value="ward.id"
            >
              {{ ward.name }}
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
import HomeServices from "../apis/modules/home.js";
export default {
  data() {
    return {
      provinceFilter: null,
      districtFilter: null,
      wardFilter: null,
      provinces: [],
      districts: [],
      wards: []
    };
  },
  watch: {
    provinceFilter(val) {
      setTimeout(() => {
        HomeServices.getDistrictsByIdProvince(val).then(response => {
          this.districts = response.data.districts;
        });
      }, 500);
      return val;
    },
    districtFilter(val) {
      setTimeout(() => {
        HomeServices.getWardsByIdDistrict(val).then(response => {
          this.wards = response.data.wards;
        });
      }, 500);
      return val;
    }
  },
  created() {
    setTimeout(() => {
      HomeServices.getAllProvinces().then(response => {
        this.provinces = response.data.provinces;
      });
    }, 500);
  }
};
</script>

<style scoped>
.wrapper {
  background-color: #f5f5f5;
}
</style>
