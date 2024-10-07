<template>
  <v-col id="featured-content-1" class="content pa-0" cols="12">
    <v-container class="max-width pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="d-flex align-center pa-5 pr-xl-10 pa-xl-0" md="6" cols="12">
          <div class="info-holder py-14 px-0">
            <h2 class="text-h6 font-weight-bold text-primary mb-2">Skip the Wait</h2>
            <h1 class="tagline text-secondary-text-color mb-5">Get Fast & Convenient Telehealth for You!</h1>
            <p class="text-body-1 text-primary-text-color mb-7">At FastDoc, we believe getting the healthcare you need shouldn't be a hassle. That's why we offer easy and convenient telehealth appointments, connecting you directly with licensed doctors instantly, from the comfort of your own home.</p>
            <div class="d-flex flex-wrap justify-center justify-sm-start mb-4">
              <v-btn color="primary" size="large" rounded="lg" :to="{ path: '/consultation/form' }">Get Started</v-btn>
            </div>
          </div>
        </v-col>
        <v-col class="d-none d-md-flex justify-end pa-0" md="6">
          <NuxtImg class="content-image" loading="lazy" width="788px" height="656px" densities="x1" src="/images/pages/featured/content-1/content-image.png" alt="content-image" />
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script lang="ts" setup></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #featured-content-1 {
    min-height: 35em;
    background-color: rgba(var(--v-theme-primary-background));

    .info-holder {
      position: relative;
      z-index: 3;
      color: rgb((var(--v-theme-primary)));

      .tagline {
        font-size: 3rem !important;
        font-weight: 700;
        line-height: 3.5rem;
      }
    }

    .content-image {
      height: 41em;
      object-position: 7rem 0;
    }
  }
</style>