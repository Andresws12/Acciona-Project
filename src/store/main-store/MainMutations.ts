import { Mutations } from 'vuex-smart-module';

import MainState from './MainState';

import { UserResponse, User, ListUsers } from '../../webservices/models';

export default class MainMutations extends Mutations<MainState> {
    // User Mutations
    public setUsers(users: UserResponse): void {
        this.state.users = users;
    }

    public setGender(gender: string): void {
        this.state.userGenderQuery = gender;
    }

    public setNationality(nationality: string): void {
        this.state.userNationalityQuery = nationality;
    }

    public setAge(age: number): void {
        this.state.userAgeQuery = age;
    }

    public setCurrentUser(user: User): void {
        this.state.currentUser = user;
    }

    public setApiFavUser(users: ListUsers[]): void {
        this.state.favApiUsers = users;
    }

    public addFavUser(user: User): void {
        this.state.favUsers.push(user);
    }

    public removeFavUser(user: User): void {
        this.state.favUsers.splice(
            this.state.favUsers.findIndex(
                favuser => favuser.email === user.email
            ),
            1
        );
    }

    // Languaje Mutations
    public changeLanguajeToSpanish(): void {
        this.state.currentLanguage = 'es';
    }

    public changeLanguajeToEnglish(): void {
        this.state.currentLanguage = 'en';
    }

    // Loading Mutations
    public startLoading(): void {
        this.state.isLoading = true;
    }

    public stopLoading(): void {
        this.state.isLoading = false;
    }
}
