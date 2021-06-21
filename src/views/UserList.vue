<template>
  <div>
    <div v-if="users">
      <b-table :data="users.results">
        <b-table-column label="Name" v-slot="props">
          {{ props.row.name.first }}
        </b-table-column>
        <b-table-column label="Gender" v-slot="props">
          {{ props.row.gender }}
        </b-table-column>
        <b-table-column label="Pais" v-slot="props">
          {{ props.row.location.country }}
        </b-table-column>
        <b-table-column label="Email" v-slot="props">
          {{ props.row.email }}
        </b-table-column>
        <b-table-column label="Teléfono" v-slot="props">
          {{ props.row.phone }}
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import mainStore from "@/store/main-store/MainStore";

import { UserResponse } from "../webservices/models/UserResponse";

@Component({
  name: "UserList",
})
export default class UserList extends Vue {
  private mainStore = mainStore.context(this.$store);

  private get users(): UserResponse | null {
    return this.mainStore.state.users;
  }

  private getUsers(): void {
    this.mainStore.actions.getUsers();
  }
}
</script>

<style lang="scss" scoped></style>
