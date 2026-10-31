<script setup lang="ts">
    import * as sdk from '@janishutz/oidc-login-sdk-browser';
    import {
        onMounted,
        ref
    } from 'vue';
    import router from '@/router';
    import {
        useAuthStore
    } from '@/stores/authstore';

    const isLoggingIn = ref( true );
    const isUnowned = ref( false );
    const store = useAuthStore();

    const check = async ( force?: boolean ) => {
        isLoggingIn.value = true;

        try {
            store.isAuth = await sdk.auth.check( force ? 'force=true' : undefined );

            if ( store.isAuth )
                isAuthorizedHandler();
        } catch ( e ) {
            if ( e instanceof sdk.request.AuthError ) {
                throw e;
            } else if ( ( e as Error ).message === 'ERR_402' ) {
                isUnowned.value = true;
                console.log( 'Error' );
            }
        }

        isLoggingIn.value = false;
    };

    const isAuthorizedHandler = () => {
        if ( localStorage.getItem( 'close-tab' ) === 'true' ) {
            localStorage.setItem( 'reauth-ok', 'true' );
            localStorage.removeItem( 'close-tab' );

            return window.close();
        }

        router.push( '/app' );
    };

    const login = () => {
        if ( isLoggingIn.value ) return;

        isLoggingIn.value = true;
        sdk.auth.login();
        isLoggingIn.value = false;
    };

    const version = ( import.meta.env.VITE_GIT_REF ? ( import.meta.env.VITE_GIT_REF as string ).slice( 0, 10 ) : 'dev' ) + ( import.meta.env.PROD ? '-prod' : '-dev' );
    const gitRef = import.meta.env.VITE_GIT_REF;

    onMounted( check );
</script>

<template>
    <div class="home-page">
        <UnownedPopup v-model="isUnowned" @recheck="check" />
        <div class="side-container">
            <h1>HCI Project Frontend</h1>
            <p>
                Tagline
            </p>
            <button :class="['fancy-button', isLoggingIn ? 'inactive' : undefined]" @click="login">
                Log in / Sign up
            </button>
            <i>Functional cookies will be used to provide login</i>
        </div>
        <div class="side-container">
            <img src="https://cdn.janishutz.com/logo.jpg" alt="janishutz Logo">
        </div>

        <div class="version">
            <a :href="gitRef ? 'https://github.com/hci-group-15/frontend/compare/' + gitRef + '...main' : 'https://github.com/hci-group-15/frontend'" target="_blank">
                <i class="fa-solid fa-code-branch"></i>
                frontend {{ version }}
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @use '@/scss/pages/home.scss';
</style>
