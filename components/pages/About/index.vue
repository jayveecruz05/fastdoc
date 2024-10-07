<template>
  <v-container id="about" class="pa-0" fluid>
    <v-row class="ma-0">
      <LazyAboutContent1 />
      <LazyAboutContent2 />
      <LazyAboutContent3 />
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { VContainer, VRow } from 'vuetify/components';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>