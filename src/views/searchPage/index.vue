<template>
  <div class="container">
    <div class="section">
      <h4 class="title is-4">Kết quả được lọc:</h4>
      <RoomBox />
      {{ roomsFilter }}
    </div>
  </div>
</template>

<script>
import HomeServices from "../../apis/modules/home.js";
import RoomBox from "../../components/RoomBox";

export default {
  props: {
    category: {
      type: String,
      default: ""
    },
    wardId: {
      type: Number,
      default: 0
    },
    withOwner: {
      type: Number,
      default: -1
    },
    restroom: {
      type: Number,
      default: -1
    },
    kitchen: {
      type: Number,
      default: -1
    },
    waterHeater: {
      type: Number,
      default: -1
    },
    airConditioner: {
      type: Number,
      default: -1
    },
    balcony: {
      type: Number,
      default: -1
    },
    squareMin: {
      type: Number,
      default: 0
    },
    squareMax: {
      type: Number,
      default: 0
    },
    priceMin: {
      type: Number,
      default: 0
    },
    priceMax: {
      type: Number,
      default: 0
    }
  },
  components: {
    RoomBox
  },
  data() {
    return {
      roomsFilter: []
    };
  },
  created() {
    const dataPack = {
      id_ward: this.$props.wardId,
      with_owner: this.$props.withOwner,
      restroom: this.$props.restroom,
      kitchen: this.$props.kitchen,
      water_heater: this.$props.waterHeater,
      air_conditioner: this.$props.airConditioner,
      balcony: this.$props.balcony,
      id_room_type: this.$props.category,
      square_min: this.$props.squareMin,
      square_max: this.$props.squareMax,
      price_min: this.$props.priceMin,
      price_max: this.$props.squareMax
    };
    setTimeout(() => {
      HomeServices.postFilter(dataPack).then(response => {
        this.roomsFilter = response.data["Search result"];
      });
    }, 500);
    this.$emit("update:layout", "DefaultLayout");
  }
};
</script>

<style scoped></style>
