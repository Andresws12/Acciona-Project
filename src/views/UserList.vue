<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Usuarios</h1>
      <b-table
        :data="users.results"
        :loading="isLoading"
        :per-page="10"
        paginated
      >
        <b-table-column label="Edad">
          <template v-slot:subheading>
            <b-input
              v-model="age"
              type="number"
              @input="onChangeAge()"
            ></b-input>
          </template>
          <template v-slot="props">
            {{ props.row.dob.age }}
          </template>
        </b-table-column>
        <b-table-column label="Name" v-slot="props">
          {{ props.row.name.first }}
        </b-table-column>
        <b-table-column label="Gender">
          <template v-slot:subheading>
            <b-select
              placeholder="Select a name"
              v-model="gender"
              @input="onChangeGender()"
            >
              <option
                v-for="(option, index) in genders"
                :value="option"
                :key="index"
              >
                {{ option }}
              </option>
            </b-select>
          </template>
          <template v-slot="props">
            {{ props.row.gender }}
          </template>
        </b-table-column>
        <b-table-column label="Pais">
          <template v-slot:subheading>
            <b-select
              placeholder="Select a name"
              v-model="nationality"
              @input="onChangeNationality()"
            >
              <option
                v-for="(option, index) in nationalities"
                :value="option"
                :key="index"
              >
                {{ option }}
              </option>
            </b-select>
          </template>
          <template v-slot="props">
            {{ props.row.location.country }}
          </template>
        </b-table-column>
        <b-table-column label="Email" v-slot="props">
          {{ props.row.email }}
        </b-table-column>
        <b-table-column label="Teléfono" v-slot="props">
          {{ props.row.phone }}
        </b-table-column>
        <b-table-column label="Acciones" v-slot="props">
          <font-awesome-icon
            @click="openUser(props.row)"
            class="mr-2 is-clickable"
            icon="user"
          />
          <font-awesome-icon
            @click="addFavUser(props.row)"
            class="is-clickable"
            :icon="['fas', 'heart']"
            v-if="
              favUsers.find((user) => user.name.first === props.row.name.first)
            "
          />
          <font-awesome-icon
            @click="addFavUser(props.row)"
            class="is-clickable"
            :icon="['far', 'heart']"
            v-else
          />
        </b-table-column>
      </b-table>

      <h1 class="title">Usuarios Favoritos</h1>

      <b-table :data="favUsers" :per-page="10" paginated>
        <b-table-column label="Edad">
          <template v-slot="props">
            {{ props.row.dob.age }}
          </template>
        </b-table-column>
        <b-table-column label="Name" v-slot="props">
          {{ props.row.name.first }}
        </b-table-column>
        <b-table-column label="Gender">
          <template v-slot="props">
            {{ props.row.gender }}
          </template>
        </b-table-column>
        <b-table-column label="Pais">
          <template v-slot="props">
            {{ props.row.location.country }}
          </template>
        </b-table-column>
        <b-table-column label="Email" v-slot="props">
          {{ props.row.email }}
        </b-table-column>
        <b-table-column label="Teléfono" v-slot="props">
          {{ props.row.phone }}
        </b-table-column>
        <b-table-column label="Acciones" v-slot="props">
          <font-awesome-icon
            @click="openUser(props.row)"
            class="mr-2 is-clickable"
            icon="user"
          />
        </b-table-column>
      </b-table>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import mainStore from "@/store/main-store/MainStore";

import { UserResponse, User } from "../webservices/models";

@Component({
  name: "UserList",
})
export default class UserList extends Vue {
  private mainStore = mainStore.context(this.$store);

  private genders: string[] = ["female", "male"];
  private gender: string = "";

  private nationalities: string[] = [
    "AU",
    "BR",
    "CA",
    "CH",
    "DE",
    "DK",
    "ES",
    "FI",
    "FR",
    "GB",
    "IE",
    "IR",
    "NO",
    "NL",
    "NZ",
    "TR",
    "US",
  ];
  private nationality: string = "";

  private age: number = 0;

  private favUsers: User[] = [];

  private get users(): UserResponse | null {
    return this.mainStore.state.users;
  }

  private get isLoading(): boolean {
    return this.mainStore.state.isLoading;
  }

  private getUsers(): void {
    this.mainStore.actions.getUsers();
  }

  private openUser(user: User): void {
    this.mainStore.actions.changeCurrentUser(user);
    this.$router.push({ name: "User" });
  }

  private addFavUser(user: User): void {
    if (
      this.favUsers.find((favuser) => favuser.name.first === user.name.first)
    ) {
      this.favUsers.splice(
        this.favUsers.findIndex(
          (favuser) => favuser.name.first === user.name.first
        )
      );
    } else {
      this.favUsers.push(user);
    }
  }

  private onChangeGender(): void {
    this.mainStore.actions.changeGender(this.gender);
  }

  private onChangeNationality(): void {
    this.mainStore.actions.changeNationality(this.nationality);
  }

  private onChangeAge(): void {
    this.mainStore.actions.changeAge(this.age);
  }
}
</script>

<style lang="scss" scoped></style>
