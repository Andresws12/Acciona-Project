<template>
    <section class="section">
        <div class="container">
            <div class="card">
                <div class="card-image">
                    <div style="width: 100%">
                        <vl-map
                            :load-tiles-while-animating="true"
                            :load-tiles-while-interacting="true"
                            style="height: 400px"
                        >
                            <vl-view
                                :zoom.sync="zoom"
                                :center.sync="center"
                                :rotation.sync="rotation"
                            ></vl-view>

                            <vl-layer-tile id="osm">
                                <vl-source-osm></vl-source-osm>
                            </vl-layer-tile>

                            <vl-overlay
                                id="overlay"
                                :position="centerCoordinate"
                            >
                                <template slot-scope="scope">
                                    <div class="overlay-content">
                                        <font-awesome-icon
                                            icon="map-marker-alt"
                                        />
                                        {{ $t('views.currentUser.position') }}
                                        {{ scope.position }}
                                    </div>
                                </template>
                            </vl-overlay>
                        </vl-map>
                    </div>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <img
                                    :src="currentUser.picture.thumbnail"
                                    alt="Placeholder image"
                                />
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">
                                {{ currentUser.name.first }}
                                {{ currentUser.name.last }}
                                <font-awesome-icon
                                    @click="addFavUser(currentUser)"
                                    class="is-clickable has-text-danger"
                                    :icon="['fas', 'heart']"
                                    v-if="
                                        favUsers.find(
                                            user =>
                                                user.email === currentUser.email
                                        )
                                    "
                                />
                                <font-awesome-icon
                                    @click="addFavUser(currentUser)"
                                    class="is-clickable has-text-danger"
                                    :icon="['far', 'heart']"
                                    v-else
                                />
                            </p>
                            <p class="subtitle is-6">
                                @{{ currentUser.login.username }}
                            </p>
                        </div>
                    </div>

                    <div class="content">
                        <p>
                            <strong>{{ $t('views.currentUser.email') }}</strong>
                            {{ currentUser.email }}
                        </p>
                        <p>
                            <strong>{{ $t('views.currentUser.phone') }}</strong>
                            {{ currentUser.phone }}
                        </p>
                        <p>
                            <strong>{{ $t('views.currentUser.cell') }}</strong>
                            {{ currentUser.cell }}
                        </p>
                        <p>
                            <strong>
                                {{ $t('views.currentUser.gender') }}
                            </strong>
                            {{ currentUser.gender }}
                        </p>
                        <p>
                            <strong>{{
                                $t('views.currentUser.address')
                            }}</strong>
                            {{ currentUser.location.street.name }},
                            {{ currentUser.location.street.number }},
                            {{ currentUser.location.city }},
                            {{ currentUser.location.state }},
                            {{ currentUser.location.postcode }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import mainStore from '@/store/main-store/MainStore';

import { User } from '../webservices/models';

@Component({
    name: 'CurrentUser',
})
export default class CurrentUser extends Vue {
    private mainStore = mainStore.context(this.$store);

    private center: number[] = [0, 0];
    private centerCoordinate: number[] = [
        Number(this.currentUser.location.coordinates.longitude),
        Number(this.currentUser.location.coordinates.latitude),
    ];
    private zoom: number = 5;
    private rotation: number = 0;

    private get currentUser(): User {
        return this.mainStore.state.currentUser;
    }
    private get favUsers(): User[] {
        return this.mainStore.state.favUsers;
    }

    private addFavUser(user: User): void {
        this.mainStore.actions.updateFavUsers(user);
    }
}
</script>

<style lang="scss" scoped></style>
