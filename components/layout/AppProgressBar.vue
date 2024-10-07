<template>
  <v-fade-transition>
    <v-progress-linear v-if="(progress.loading)" id="app-progress-bar" indeterminate location="top" :color="((progress.status != 'initiate') ? ((progress.status == 'success') ? 'green darken-2' : 'red darken-2') : 'primary-light')"/>
  </v-fade-transition>
</template>

<script lang="ts" setup>
  import { VProgressLinear, VFadeTransition } from 'vuetify/components';

  // Data
  let progressTimeout: any;
  const progress = reactive({ loading: false, status: 'initiate' });

  // Methods
  const handleProgress = (status: any) => {
    // console.log('Status:', status);
    clearTimeout(progressTimeout);
    switch (status) {
      case 'initiate':
        setTimeout(() => { progress.loading = true; progress.status = status; });
        break;
      case 'stop':
        progress.loading = false;
        break;
      default:
        progress.status = status;
        progressTimeout = setTimeout(() => { progress.loading = false; }, 3000);
    }
  };

  // Event Bus
  eventBus.on('progress', handleProgress);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #app-progress-bar {
    &.v-progress-linear {
      position: fixed;
      top: 0;
      z-index: 1050;
    }
  }
</style>