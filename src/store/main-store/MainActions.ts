import { Actions } from "vuex-smart-module";

import MainMutations from "./MainMutations";
import MainGetters from "./MainGetters";
import MainState from "./MainState";

import { UserResponse } from "../../webservices/models/UserResponse";

import { getUsers } from "@/webservices/UsersWebservice";

export default class MainActions extends Actions<
  MainState,
  MainGetters,
  MainMutations,
  MainActions
> {
  // User Actions
  public async getUsers(): Promise<void> {
    try {
      this.commit("startLoading", null);

      const users: UserResponse = await getUsers("");

      this.commit("setUsers", users);
    } finally {
      this.commit("stopLoading", null);
    }
  }

  // Translate Actions
  public changeLanguajeToSpanish(): void {
    this.commit("changeLanguajeToSpanish");
  }

  public changeLanguajeToEnglish(): void {
    this.commit("changeLanguajeToEnglish");
  }
}
