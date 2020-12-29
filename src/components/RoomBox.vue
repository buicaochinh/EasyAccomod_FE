<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-128x128">
          <router-link :to="{ name: 'Room', params: { id: idRoom } }">
            <img :src="baseUrlImg + $props.imgSrc" alt="Image" />
          </router-link>
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <router-link :to="{ name: 'Room', params: { id: $props.idRoom } }">
              <strong>{{ $props.title }}</strong>
            </router-link>
            <br />
            <span class="field-title">Giá phòng: </span
            ><span class="info">{{ $props.price | toCurrency }}</span> <br />
            <span class="field-title">Diện tích: </span
            ><span class="info">{{ $props.area }}</span> <br />
            <span class="field-title">Địa chỉ: </span
            ><span class="info">{{ $props.address }}</span> <br />
            <span class="field-title">Loại phòng: </span
            ><span class="info">{{ $props.category }}</span> <br />
          </p>
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
    </article>
  </div>
</template>

<script>
import urls from "../constants/urls";
import HomeServices from "@/apis/modules/home";
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
      return !idFavs.includes(this.$props.idRoom);
    }
  },
  methods: {
    addAndRemoveFavorite() {
      if (this.isNotActive) {
        HomeServices.postAddFavorite(this.$props.idRoom);
      } else {
        HomeServices.postRemoveFavorite(this.$props.idRoom);
      }
      this.$store.dispatch("HOME/getFavorites");
    }
  }
};
</script>

<style scoped>
div.box:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

a {
  color: #2c3e50;
}
</style>
