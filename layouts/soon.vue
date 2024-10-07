<template>
  <v-app :class="{ [`${breakpoint}Breakpoint`]: true, mobileView, mobileOrTabletView, tabletView, tabletOrDesktopView, desktopView }">
    <LazyAppProgressBar />
    <LazyAppHeader :navigation-list="navigationList" />
    <LazyAppNavigation :navigation-list="navigationList" />
    <v-main :style="{ '--v-layout-top': ((mobileOrTabletView) ? '140px' : '136.5px') }">
      <slot />
    </v-main>
    <LazyAppFooter />
  </v-app>
</template>

<script lang="ts" setup>
  import { VApp, VMain } from 'vuetify/components';

  // Special Data
  const { breakpoint, mobileView, mobileOrTabletView, tabletView, tabletOrDesktopView, desktopView } = useViewPort();

  // Static Data
  const navigationList = [
    { title: 'Home', value: 'index' },
    { title: 'About', value: 'about' },
    { title: 'Blog', value: 'blog' }
  ];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .v-application {
    &.mobileOrTabletView {
      .max-width {
        max-width: 100%;
      }
    }

    .max-width {
      max-width: 1360px;
      margin-left: auto !important;
      margin-right: auto !important;
    }
  }
</style>