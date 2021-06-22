<template>
    <div class="mb-6">
        <h1 class="title">{{ $t('common.titles.userTable') }}</h1>
        <vue-blob-json-csv
            class="button is-link mb-5"
            fileType="csv"
            tag-name="div"
            :file-name="$t('views.userList.userCsvName')"
            :title="$t('views.userList.donwloadTitle')"
            v-if="usersToDownload.length > 0"
            :data="usersToDownload"
            :confirm="$t('views.userList.donwloadConfirm')"
        />
        <b-table
            :data="users.results"
            v-if="users"
            :loading="isLoading"
            :per-page="10"
            :mobile-cards="false"
            paginated
        >
            <b-table-column :label="$t('views.userList.age')">
                <template v-slot:subheading>
                    <b-input
                        v-model="age"
                        type="number"
                        @input="onChangeAge()"
                    ></b-input>
                    <div data-cy="user-table"></div>
                </template>
                <template v-slot="props">
                    {{ props.row.dob.age }}
                </template>
            </b-table-column>
            <b-table-column :label="$t('views.userList.name')" v-slot="props">
                {{ props.row.name.first }}
            </b-table-column>
            <b-table-column :label="$t('views.userList.gender')">
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
            <b-table-column :label="$t('views.userList.country')">
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
            <b-table-column :label="$t('views.userList.email')" v-slot="props">
                {{ props.row.email }}
            </b-table-column>
            <b-table-column :label="$t('views.userList.phone')" v-slot="props">
                {{ props.row.phone }}
            </b-table-column>
            <b-table-column
                :label="$t('views.userList.actions')"
                v-slot="props"
            >
                <font-awesome-icon
                    @click="openUser(props.row)"
                    class="mr-2 is-clickable has-text-link"
                    icon="user"
                />
                <font-awesome-icon
                    @click="addFavUser(props.row)"
                    class="is-clickable has-text-danger"
                    :icon="['fas', 'heart']"
                    v-if="favUsers.find(user => user.email === props.row.email)"
                />
                <font-awesome-icon
                    @click="addFavUser(props.row)"
                    class="is-clickable has-text-danger"
                    :icon="['far', 'heart']"
                    v-else
                />
            </b-table-column>
        </b-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import mainStore from '@/store/main-store/MainStore';

import { UserResponse, User } from '../../webservices/models';

@Component({
    name: 'UsersTable',
})
export default class UsersTable extends Vue {
    private mainStore = mainStore.context(this.$store);

    private genders: string[] = ['female', 'male'];
    private gender: string = '';

    private nationalities: string[] = [
        'AU',
        'BR',
        'CA',
        'CH',
        'DE',
        'DK',
        'ES',
        'FI',
        'FR',
        'GB',
        'IE',
        'IR',
        'NO',
        'NL',
        'NZ',
        'TR',
        'US',
    ];
    private nationality: string = '';
    private age: number = 0;

    private get users(): UserResponse | null {
        return this.mainStore.state.users;
    }
    private get isLoading(): boolean {
        return this.mainStore.state.isLoading;
    }
    private get favUsers(): User[] {
        return this.mainStore.state.favUsers;
    }
    private get usersToDownload(): object[] {
        return this.mainStore.getters.usersToDownload;
    }

    private getUsers(): void {
        this.mainStore.actions.getUsers();
    }
    private openUser(user: User): void {
        this.mainStore.actions.changeCurrentUser(user);
        this.$router.push({ name: 'User' });
    }
    private addFavUser(user: User): void {
        this.mainStore.actions.updateFavUsers(user);
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
