<template>
  <v-col id="featured-content-4" class="content pa-0" cols="12">
    <div class="info-holder d-flex flex-column justify-center max-width pa-5 py-14 pr-xl-10 pa-xl-0">
      <h1 class="tagline font-weight-bold text-secondary-text-color mt-10 mb-2">Don't wait for your health to take a backseat.</h1>
      <h2 class="text-h6 font-weight-bold text-primary-text-color mb-7">Get the care you deserve, when you deserve it. Sign up for FastDoc today!</h2>
      <div class="d-flex flex-wrap justify-center justify-sm-start mb-10">
        <v-btn color="primary" size="large" rounded="lg" :to="{ path: '/consultation/form' }">Book a consultation</v-btn>
      </div>
    </div>
  </v-col>
</template>

<script lang="ts" setup></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #featured-content-4 {
    min-height: 35em;
    background-color: rgba(var(--v-theme-secondary-background));

    .info-holder {
      height: 100%;
      color: rgb((var(--v-theme-primary)));
      background-image: url('@/public/images/pages/featured/content-4/content-image.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: right center;

      .tagline {
        font-size: 3rem !important;
        font-weight: 700;
        line-height: 3.5rem;
      }
    }
  }
</style>