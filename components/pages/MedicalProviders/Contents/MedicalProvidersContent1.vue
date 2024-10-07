<template>
  <v-col id="medical-providers-content-1" class="content pa-0" cols="12">
    <v-container class="max-width pa-0" fluid>
      <v-row class="ma-0 my-14" align="center">
        <v-col class="image-wrapper" sm="6" cols="12">
          <NuxtImg class="medical-team-image" loading="lazy" width="590px" height="auto" src="/images/pages/medical-providers/content-1/medical-team-image.png" alt="medical-team-image" />
        </v-col>
        <v-col class="d-flex flex-column pa-5" sm="6" cols="12">
          <h1 class="tagline mb-4">Join us and become a provider at FastDoc today!</h1>
          <p class="text-body-1 text-primary-text-color mb-5">Become part of our growing team to provide convenient healthcare to people all over the USA. We offer a flexible and user-friendly platform that enables you to provide healthcare services to your patients from anywhere in the world. As a telehealth provider, you can provide virtual consultations, diagnose and treat common illnesses, prescribe medication, and much more.</p>
          <div class="d-flex flex-wrap justify-center justify-sm-start mb-4">
            <v-btn color="primary" size="large" rounded="lg" :to="{ path: '/careers' }">Join Now</v-btn>
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
  #medical-providers-content-1 {
    position: relative;
    z-index: 1;
    background-color: rgba(var(--v-theme-secondary-background));
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% top;

    .tagline {
      font-size: 2rem !important;
      font-weight: 700;
      line-height: 2.5rem;
      color: rgb((var(--v-theme-primary)));
    }
    
    .medical-team-image {
      display: block;
      margin-right: auto;
      width: 90%;
    }
  }

  .mobileView {
    #medical-providers-content-1 {
      .medical-team-image {
        width: 80%;
        height: auto;
        margin: 0 auto;
      }
    }
  }
</style>