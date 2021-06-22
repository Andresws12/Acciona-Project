<template>
    <b-navbar data-cy="top-navbar">
        <template #start>
            <b-navbar-item tag="router-link" to="/">
                {{ $t('common.titles.home') }}
            </b-navbar-item>
            <b-navbar-item tag="router-link" to="/user">
                {{ $t('common.titles.user') }}
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-dropdown :label="$t('common.titles.translations')">
                <b-navbar-item
                    :disabled="currentLanguage === 'es'"
                    aria-role="listitem"
                    @click="changeLanguageToSpanish"
                >
                    {{ $t('common.titles.es') }}
                </b-navbar-item>
                <b-navbar-item
                    :disabled="currentLanguage === 'en'"
                    aria-role="listitem"
                    @click="changeLanguageToEnglish"
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
