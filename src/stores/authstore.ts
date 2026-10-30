import {
    defineStore
} from 'pinia';
import {
    ref
} from 'vue';

export const useAuthStore = defineStore( 'authstore', () => {
    const isAuth = ref( import.meta.env.PROD ? false : ( import.meta.env.VITE_BACKENDLESS == 'true' ? true : false ) );

    return {
        isAuth
    };
} );
