import { Actions } from 'vuex-smart-module';
import Vue from 'vue';

import MainMutations from './MainMutations';
import MainGetters from './MainGetters';
import MainState from './MainState';

import { UserResponse, User, ListUsers } from '../../webservices/models';

import {
    getUsers,
    updateFavUsers,
    getFavUsers,
} from '@/webservices/UsersWebservice';

import i18n from '../../localization/localization';

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

            Vue.$toast.success(`${i18n.t('common.notifications.getUsers')}`, {
                timeout: 4000,
            });
        } catch {
            Vue.$toast.error(`${i18n.t('common.notifications.errorMessage')}`, {
                timeout: 4000,
            });
        } finally {
            this.commit('stopLoading', null);
        }
    }

    public async uploadApiFavUsers(nickname: string): Promise<void> {
        try {
            this.commit('startLoading', null);

            const users: ListUsers[] = await updateFavUsers({
                nickname,
                users: this.state.favUsers,
            });

            this.commit('setApiFavUser', users);

            Vue.$toast.success(
                `${i18n.t('common.notifications.uploadFavUsers')}`,
                {
                    timeout: 4000,
                }
            );
        } catch {
            Vue.$toast.error(`${i18n.t('common.notifications.errorMessage')}`, {
                timeout: 4000,
            });
        } finally {
            this.commit('stopLoading', null);
        }
    }

    public async getApiFavUsers(): Promise<void> {
        try {
            this.commit('startLoading', null);

            const users: ListUsers[] = await getFavUsers();

            this.commit('setApiFavUser', users);

            Vue.$toast.success(
                `${i18n.t('common.notifications.getFavUsers')}`,
                {
                    timeout: 4000,
                }
            );
        } catch {
            Vue.$toast.error(`${i18n.t('common.notifications.errorMessage')}`, {
                timeout: 4000,
            });
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
