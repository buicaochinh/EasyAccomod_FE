<template>
  <div class="wrapper">
    <section class="columns">
      <div class="column">
        <b-field label="Tỉnh/Thành phố" type="is-info">
          <b-select
            placeholder="Tỉnh/Thành phố"
            v-model="provinceFilter"
            expanded
          >
            <option
              v-for="(province, index) in provinces"
              :key="index"
              :value="province.id"
            >
              {{ province.name }}
            </option>
          </b-select>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Quận/Huyện" type="is-info">
          <b-select placeholder="Quận/Huyện" v-model="districtFilter" expanded>
            <option
              v-for="(district, index) in districts"
              :key="index"
              :value="district.id"
            >
              {{ district.name }}
            </option>
          </b-select>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Phường/Xã" type="is-info">
          <b-select placeholder="Phường/Xã" v-model="wardFilter" expanded>
            <option
              v-for="(ward, index) in wards"
              :key="index"
              :value="ward.id"
            >
              {{ ward.name }}
            </option>
          </b-select>
        </b-field>
      </div>
    </section>
  </div>
</template>

<script>
import HomeServices from "../apis/modules/home.js";
export default {
  name: "SelectAddress",
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
    },
    wardFilter(val) {
      this.$emit("wardSelect", val);
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

<style scoped></style>
