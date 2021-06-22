<template>
    <div>
        <h1 class="title">{{ $t('common.titles.favUserTable') }}</h1>
        <vue-blob-json-csv
            class="button is-link mb-5"
            fileType="csv"
            tag-name="div"
            :file-name="$t('views.userList.favUserCsvName')"
            :title="$t('views.userList.donwloadTitle')"
            v-if="favUsersToDownload.length > 0"
            :data="favUsersToDownload"
            :confirm="$t('views.userList.donwloadConfirm')"
        />
        <b-table
            :data="favUsers"
            :per-page="10"
            paginated
            :mobile-cards="false"
        >
            <b-table-column :label="$t('views.userList.age')">
                <template v-slot="props">
                    {{ props.row.dob.age }}
                </template>
            </b-table-column>
            <b-table-column :label="$t('views.userList.name')" v-slot="props">
                {{ props.row.name.first }}
            </b-table-column>
            <b-table-column :label="$t('views.userList.gender')">
                <template v-slot="props">
                    {{ props.row.gender }}
                </template>
            </b-table-column>
            <b-table-column :label="$t('views.userList.country')">
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
                <div data-cy="fav-user-table"></div>
                <font-awesome-icon
                    @click="openUser(props.row)"
                    class="mr-2 is-clickable has-text-link"
                    icon="user"
                />
                <font-awesome-icon
                    @click="addFavUser(props.row)"
                    class="is-clickable has-text-danger"
                    icon="trash-alt"
                />
            </b-table-column>
        </b-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import mainStore from '@/store/main-store/MainStore';

import { User } from '../../webservices/models';

@Component({
    name: 'FavUsersTable',
})
export default class FavUsersTable extends Vue {
    private mainStore = mainStore.context(this.$store);

    private get favUsers(): User[] {
        return this.mainStore.state.favUsers;
    }
    private get favUsersToDownload(): object[] {
        return this.mainStore.getters.favUsersToDownload;
    }

    private addFavUser(user: User): void {
        this.mainStore.actions.updateFavUsers(user);
    }
    private openUser(user: User): void {
        this.mainStore.actions.changeCurrentUser(user);
        this.$router.push({ name: 'User' });
    }
}
</script>

<style lang="scss" scoped></style>
