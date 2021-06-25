<template>
    <b-navbar data-cy="top-navbar">
        <template #start>
            <b-navbar-item
                tag="router-link"
                to="/"
                :active="$route.path === '/'"
            >
                <font-awesome-icon icon="home" />
            </b-navbar-item>
            <b-navbar-item
                tag="router-link"
                to="/user"
                :active="$route.path === '/user'"
            >
                <font-awesome-icon icon="user" />
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-dropdown>
                <template #label>
                    <font-awesome-icon icon="language" />
                </template>
                <b-navbar-item
                    aria-role="listitem"
                    @click="changeLanguageToSpanish"
                    :active="currentLanguage === 'es'"
                >
                    {{ $t('common.titles.es') }}
                </b-navbar-item>
                <b-navbar-item
                    aria-role="listitem"
                    @click="changeLanguageToEnglish"
                    :active="currentLanguage === 'en'"
                >
                    {{ $t('common.titles.en') }}
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
    </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import mainStore from '@/store/main-store/MainStore';

@Component({
    name: 'TopNavbar',
})
export default class TopNavbar extends Vue {
    private mainStore = mainStore.context(this.$store);

    private get currentLanguage(): string {
        return this.mainStore.state.currentLanguage;
    }

    private changeLanguageToSpanish(): void {
        this.mainStore.actions.changeLanguajeToSpanish();
    }

    private changeLanguageToEnglish(): void {
        this.mainStore.actions.changeLanguajeToEnglish();
    }
}
</script>

<style lang="scss" scoped></style>
