<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <router-link :to="{ name: 'Room', params: { id: idRoom } }">
          <img :src="baseUrlImg + $props.imgSrc" alt="Image" />
        </router-link>
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-5">
            <router-link
              style="color: #2c3e50"
              :to="{ name: 'Room', params: { id: $props.idRoom } }"
              >{{ $props.title }}</router-link
            >
          </p>
        </div>
      </div>

      <div class="content">
        <span class="field-title">Giá phòng: </span
        ><span class="info">{{ $props.price | toCurrency }}</span> <br />
        <span class="field-title">Diện tích: </span
        ><span class="info">{{ $props.area }}</span> <br />
        <span class="field-title">Địa chỉ: </span
        ><span class="info">{{ $props.address }}</span> <br />
        <span class="field-title">Loại phòng: </span
        ><span class="info">{{ $props.category }}</span> <br />
      </div>
      <div class="field is-grouped">
        <p class="control">
          <b-rate :value="rate" show-score disabled />
        </p>
        <p class="control" style="margin-left: auto">
          <button
            :class="[
              'button',
              'is-small',
              'is-danger',
              { 'is-outlined': isNotActive }
            ]"
            @click="addAndRemoveFavorite"
          >
            <b-icon size="is-small" icon="heart" />
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import HomeServices from "../apis/modules/home";
import urls from "../constants/urls";
import { getArrayValue } from "@/services/getArrayValue";
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    idRoom: {
      type: Number,
      default: 0
    },
    rate: {
      type: Number,
      default: 0
    },
    imgSrc: {
      type: String,
      default: ""
    },
    price: {
      type: Number,
      default: 0
    },
    area: {
      type: Number,
      default: 0
    },
    address: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      default: ""
    }
  },
  computed: {
    baseUrlImg: () => urls.BASE_URL_IMG,
    isNotActive() {
      let idFavs = getArrayValue(this.$store.getters["HOME/favorites"], "id");
      console.log(idFavs);
      return !idFavs.includes(this.$props.idRoom);
    }
  },
  filters: {
    toCurrency(value) {
      if (typeof value !== "number") {
        return value;
      }
      let formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    }
  },
  methods: {
    addAndRemoveFavorite() {
      if (this.isNotActive) {
        this.isNotActive = !this.isNotActive;
        HomeServices.postAddFavorite(this.$props.idRoom);
      } else {
        this.isNotActive = !this.isNotActive;
        HomeServices.postRemoveFavorite(this.$props.idRoom);
      }
      this.$store.dispatch("HOME/getFavorites");
    }
  }
};
</script>

<style scoped>
div.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

span.field-title {
  font-weight: bold;
}
</style>
