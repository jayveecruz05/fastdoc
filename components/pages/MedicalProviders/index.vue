<template>
  <v-container id="medical-providers" class="pa-0" fluid>
    <v-row class="ma-0">
      <LazyMedicalProvidersContent1 />
      <LazyMedicalProvidersContent2 />
      <LazyMedicalProvidersContent3 />
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { VContainer, VRow } from 'vuetify/components';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>