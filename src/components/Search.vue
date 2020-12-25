<template>
  <div class="wrapper">
    <div class="container">
      <section class="section">
        <h6 class="title is-6">Bộ lọc tìm kiếm</h6>
        <b-field label="Thể loại" type="is-info">
          <b-select placeholder="Danh mục" v-model="categoryFilter" expanded>
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </b-select>
        </b-field>

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

        <b-field label="Khoảng giá">
          <b-slider
            v-model="priceRange"
            type="is-info"
            :min="0"
            :max="100000000"
            :step="50000"
          >
          </b-slider>
        </b-field>

        <b-field label="Diện tích">
          <b-slider
            v-model="areaRange"
            type="is-info"
            :min="0"
            :max="200"
            :step="2"
          >
          </b-slider>
        </b-field>

        <b-field label="Tiện ích">
          <div class="block">
            <b-checkbox
              type="is-info"
              native-value="with_owner"
              v-model="amenities"
            >
              Chung chủ
            </b-checkbox>
            <b-checkbox
              type="is-info"
              native-value="restroom"
              v-model="amenities"
            >
              Nhà vệ sinh
            </b-checkbox>
            <b-checkbox
              type="is-info"
              native-value="kitchen"
              v-model="amenities"
            >
              Nhà bếp
            </b-checkbox>
            <b-checkbox
              type="is-info"
              native-value="water_heater"
              v-model="amenities"
            >
              Nóng lạnh
            </b-checkbox>
            <b-checkbox
              type="is-info"
              native-value="air_conditioner"
              v-model="amenities"
            >
              Điều hòa
            </b-checkbox>
            <b-checkbox
              type="is-info"
              native-value="balcony"
              v-model="amenities"
            >
              Ban công
            </b-checkbox>
          </div>
        </b-field>
        <button class="button is-info" style="margin-top: 2rem" @click="submit">
          Tim kiếm
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import HomeServices from "../apis/modules/home.js";
import router from "../router";
export default {
  data() {
    return {
      categoryFilter: null,
      provinceFilter: null,
      districtFilter: null,
      wardFilter: null,
      provinces: [],
      districts: [],
      wards: [],
      categories: [],
      priceRange: [10000000, 20000000],
      areaRange: [35, 50],
      amenities: []
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
      HomeServices.getCategory().then(response => {
        this.categories = response.data.room_types;
      });
    }, 500);
  },
  methods: {
    submit() {
      router.push({
        name: "Search",
        query: {
          category: this.categoryFilter,
          wardId: this.wardFilter,
          owner: this.amenities.includes("with_owner") ? 1 : 0,
          restroom: this.amenities.includes("restroom") ? 1 : 0,
          kitchen: this.amenities.includes("kitchen") ? 1 : 0,
          waterHeater: this.amenities.includes("water_heater") ? 1 : 0,
          airConditioner: this.amenities.includes("air_conditional") ? 1 : 0,
          balcony: this.amenities.includes("balcony") ? 1 : 0,
          squareMax: this.areaRange[1],
          squareMin: this.areaRange[0],
          priceMax: this.priceRange[1],
          priceMin: this.priceRange[0]
        }
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  background-color: #f5f5f5;
}
</style>
