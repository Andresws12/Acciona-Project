import { UserResponse } from "../../webservices/models/UserResponse";

export default class MainState {
  public users: UserResponse | null = null;
  public currentLanguage: string = "es";
  public isLoading: boolean = false;
}
