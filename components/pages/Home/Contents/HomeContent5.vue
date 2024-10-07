<template>
  <v-col id="home-content-5" class="content pa-0" cols="12">
    <TopDivider class="top-divider" />
  </v-col>
</template>

<script lang="ts" setup>
  import TopDivider from '@/public/images/pages/home/content-5/top-divider.svg';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #home-content-5 {
    position: relative;
    z-index: 1;
    min-height: calc(100vh - 136.5px);
    background-color: rgba(var(--v-theme-primary-background));
    background-image: url('@/public/images/pages/home/content-5/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    .top-divider {
      position: relative;
      top: -1px;
      display: block;
      width: 100%;
      height: 5em;
      z-index: 2;
    }
  }

  .mobileOrTabletView {
    #home-content-5 {
      min-height: 20em;
    }
  }
</style>