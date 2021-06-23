import { Actions } from 'vuex-smart-module';

import MainMutations from './MainMutations';
import MainGetters from './MainGetters';
import MainState from './MainState';

import { UserResponse, User } from '../../webservices/models';

import {
    getUsers,
    updateFavUsers,
    getFavUsers,
} from '@/webservices/UsersWebservice';

export default class MainActions extends Actions<
    MainState,
    MainGetters,
    MainMutations,
    MainActions
> {
    // User Actions
    public async getUsers(): Promise<void> {
        try {
            this.commit('startLoading', null);

            const users: UserResponse = await getUsers(this.getters.query);

            this.commit('setUsers', users);
        } finally {
            this.commit('stopLoading', null);
        }
    }

    public async updateApiFavUsers(): Promise<void> {
        try {
            this.commit('startLoading', null);

            await updateFavUsers(this.state.favUsers);
        } finally {
            this.commit('stopLoading', null);
        }
    }

    public async getApiFavUsers(): Promise<void> {
        try {
            this.commit('startLoading', null);

            const users: User[] = await getFavUsers();

            this.commit('setApiFavUser', users);
        } finally {
            this.commit('stopLoading', null);
        }
    }

    public async changeGender(gender: string): Promise<void> {
        this.commit('setGender', gender);

        await this.dispatch('getUsers', null);
    }

    public async changeNationality(nationality: string): Promise<void> {
        this.commit('setNationality', nationality);

        await this.dispatch('getUsers', null);
    }

    public async changeAge(age: number): Promise<void> {
        this.commit('setAge', age);

        await this.dispatch('getUsers', null);
    }

    public async changeCurrentUser(user: User): Promise<void> {
        this.commit('setCurrentUser', user);
    }

    public async updateFavUsers(user: User): Promise<void> {
        if (this.state.favUsers.find(favuser => favuser.email === user.email)) {
            this.commit('removeFavUser', user);
        } else {
            this.commit('addFavUser', user);
        }
    }

    // Translate Actions
    public changeLanguajeToSpanish(): void {
        this.commit('changeLanguajeToSpanish');
    }

    public changeLanguajeToEnglish(): void {
        this.commit('changeLanguajeToEnglish');
    }
}
