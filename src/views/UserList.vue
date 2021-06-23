<template>
    <section class="section">
        <div class="container">
            <users-table />
            <fav-users-table />
            <api-fav-users-table />
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import UsersTable from '@/components/tables/UsersTable.vue';
import FavUsersTable from '@/components/tables/FavUsersTable.vue';
import ApiFavUsersTable from '@/components/tables/ApiFavUsersTable.vue';

@Component({
    name: 'UserList',
    components: {
        UsersTable,
        FavUsersTable,
        ApiFavUsersTable,
    },
})
export default class UserList extends Vue {}
</script>

<style lang="scss" scoped></style>
