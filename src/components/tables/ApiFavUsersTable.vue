<template>
    <div>
        <h1 class="title">{{ $t('common.titles.apiFavUserTable') }}</h1>
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
            </b-table-column>
        </b-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import mainStore from '@/store/main-store/MainStore';

import { User } from '../../webservices/models';

@Component({
    name: 'ApiFavUsersTable',
})
export default class FavUsersTable extends Vue {
    private mainStore = mainStore.context(this.$store);

    private get favUsers(): User[] {
        return this.mainStore.state.favApiUsers;
    }

    private openUser(user: User): void {
        this.mainStore.actions.changeCurrentUser(user);
        this.$router.push({ name: 'User' });
    }
}
</script>

<style lang="scss" scoped></style>
