<template>
    <div>
        <top-navbar />
        <router-view />
        <github-button />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import Axios from 'axios';

import mainStore from '@/store/main-store/MainStore';

import TopNavbar from '@/components/navbar/TopNavbar.vue';
import GithubButton from '@/components/GithubButton.vue';

@Component({
    name: 'App',
    components: {
        TopNavbar,
        GithubButton,
    },
})
export default class App extends Vue {
    private mainStore = mainStore.context(this.$store);

    private get currentLanguage(): string {
        return this.mainStore.state.currentLanguage;
    }

    public async created(): Promise<void> {
        this.$i18n.locale = this.currentLanguage;
        Axios.defaults.headers.post['Accept-Language'] = this.currentLanguage;

        this.mainStore.actions.getUsers();
    }

    @Watch('currentLanguage')
    private onChangeLanguage() {
        this.$i18n.locale = this.currentLanguage;
    }
}
</script>

<style lang="scss" scoped></style>
