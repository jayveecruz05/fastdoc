<template>
  <LazyNuxtPwaManifest />
  <LazyNuxtLayout>
    <LazyNuxtPage />
  </LazyNuxtLayout>
  <VueQueryDevtools />
</template>

<script lang="ts" setup>
  import schema from '@/assets/json/schema.json';
  import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

  // Special Data
  const { isLoggedIn, accessToken, isFullyLoggedIn } = useCookies();
  const { authentication } = useStore();
  const router = useRouter();
  const route = useRoute();

  // Watch
  watch(isFullyLoggedIn, (to) => {
    if (to && !!route.meta?.notAuthenticated) {
      router.push({ path: '/my-profile' });
    } else if (!to && !!route.meta?.requiresAuthentication) {
      router.push({ path: '/login' });
    }
  });

  watch(accessToken, (to) => { mainAPI.api.setAuthorization((!!to) ? to : null); }); // Watch and check if the user have API access token, if yes set API Authorization

  eventBus.on('logout', () => {
    isLoggedIn.value = false;
    accessToken.value = null;
    mainAPI.api.setAuthorization(null);
    setTimeout(() => { router.push({ path: '/login' }); }, 10);
  });

  // Global API Requestor
  if (isFullyLoggedIn.value) {
    const authenticationData = authentication.fetchUserDetails();
    await authenticationData.suspense();
  }

  useSchemaOrg(schema);
  useSeoMeta({ titleTemplate: (titleChunk) => ((titleChunk) ? `${titleChunk} | ${import.meta.env.VITE_APP_NAME || 'FastDoc'}` : import.meta.env.VITE_APP_NAME || 'FastDoc') });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import url('@/assets/style/main.scss');
</style>