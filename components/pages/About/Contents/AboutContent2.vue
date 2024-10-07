<template>
  <v-col id="about-content-2" class="content pa-0" cols="12">
    <v-container class="max-width pa-0" fluid>
      <v-row class="ma-0 my-14" align="center">
        <v-col sm="6" cols="12">
          <NuxtImg class="image" loading="lazy" width="590px" height="auto" src="/images/pages/about/content-2/image.png" alt="image" />
        </v-col>
        <v-col class="d-flex flex-column pa-5" sm="6" cols="12">
          <h1 class="tagline mb-5">Expert Healthcare Providers for your every Medical Concerns</h1>
          <p class="text-body-1 text-primary-text-color mb-5">Our team of healthcare professionals is comprised of licensed physicians, nurse practitioners, and physician assistants who are available to address a wide range of medical concerns. Whether you need a quick prescription refill, have questions about a new medication, or require a diagnosis for a non-emergency medical issue, our healthcare providers are here to help.</p>
          <div class="d-flex flex-wrap justify-center justify-sm-start mb-4">
            <v-btn color="primary" size="large" rounded="lg" :to="{ path: '/' }">Get Started</v-btn> <!-- :to="{ path: '/consultation/form' }" -->
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script lang="ts" setup>
  import { VContainer, VRow, VCol, VBtn } from 'vuetify/components';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #about-content-2 {
    position: relative;
    z-index: 1;
    background-color: rgba(var(--v-theme-primary-background));
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% top;

    .tagline {
      font-size: 2rem !important;
      font-weight: 700;
      line-height: 2.5rem;
      color: rgb((var(--v-theme-primary)));
    }
    
    .image {
      display: block;
      margin-right: auto;
      width: 90%;
    }
  }

  .mobileView {
    #about-content-2 {
      .image {
        width: 80%;
        height: auto;
        margin: 0 auto;
      }
    }
  }
</style>