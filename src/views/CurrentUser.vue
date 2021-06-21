<template>
  <section class="section">
    <div class="container">
      <div class="card">
        <div class="card-image">
          <div style="width: 100%">
            <GmapMap
              :center="{
                lat: Number(currentUser.location.coordinates.latitude),
                lng: Number(currentUser.location.coordinates.longitude),
              }"
              :zoom="7"
              map-type-id="terrain"
              style="width: 500px; height: 300px"
            >
            </GmapMap>
          </div>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  :src="currentUser.picture.thumbnail"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">
                {{ currentUser.name.first }} {{ currentUser.name.last }}
              </p>
              <p class="subtitle is-6">@{{ currentUser.login.username }}</p>
            </div>
          </div>

          <div class="content">
            <p>Email: {{ currentUser.email }}</p>
            <p>Teléfono: {{ currentUser.phone }}</p>
            <p>Móvil: {{ currentUser.cell }}</p>
            <p>Sexo: {{ currentUser.gender }}</p>
            <p>
              Dirección:
              {{ currentUser.location.street.name }},
              {{ currentUser.location.street.number }},
              {{ currentUser.location.city }}, {{ currentUser.location.state }},
              {{ currentUser.location.postcode }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import mainStore from "@/store/main-store/MainStore";

import { User } from "../webservices/models";

@Component({
  name: "CurrentUser",
})
export default class CurrentUser extends Vue {
  private mainStore = mainStore.context(this.$store);

  private get currentUser(): User {
    return this.mainStore.state.currentUser;
  }
}
</script>

<style lang="scss" scoped></style>
