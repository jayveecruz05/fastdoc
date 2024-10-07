<template>
  <v-col id="medical-providers-content-3" class="content pa-0" cols="12">
    <v-container class="max-width pa-0" fluid>
      <v-row class="ma-0">
        <v-spacer />
        <v-col class="py-16 px-5" md="7" cols="12">
          <v-card rounded="lg" elevation="5">
            <v-card-text class="info-holder pa-10">
              <h1 class="tagline mb-5">We strive to continuously improve and provide a better experience for everyone</h1>

              <h2 class="text-h6 font-weight-bold text-secondary-text-color mb-2">Make healthcare services more accessible</h2>
              <p class="text-body-1 text-primary-text-color mb-5">We strive to make healthcare services more accessible to everyone, regardless of their location or circumstances. We believe that everyone deserves access to high-quality healthcare services, and we’re committed to using technology to break down the barriers that prevent many people from accessing the care they need.</p>
              
              <h2 class="text-h6 font-weight-bold text-secondary-text-color mb-2">Enhance patient experience</h2>
              <p class="text-body-1 text-primary-text-color mb-5">We understand that the healthcare experience can be stressful and overwhelming at times, which is why our goal is to provide you with a seamless and stress-free experience when using our telehealth platform.</p>

              <h2 class="text-h6 font-weight-bold text-secondary-text-color mb-2">Foster strong provider-patient relationships</h2>
              <p class="text-body-1 text-primary-text-color">We believe that building trust and communication between providers and patients is critical to delivering effective and personalized care, and we’re committed to facilitating these relationships through our platform.</p>

              <v-btn class="mt-7" color="primary" size="large" rounded="lg" :to="{ path: '/careers' }">Join Now</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script lang="ts" setup>
  import { VContainer, VRow, VCol, VCard, VCardText, VBtn, VSpacer } from 'vuetify/components';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #medical-providers-content-3 {
    position: relative;
    z-index: 1;
    background-color: rgba(var(--v-theme-primary-background));
    background-image: url('@/public/images/pages/medical-providers/content-3/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: calc(50% - 100px) top;

    .info-holder {
      position: relative;
      z-index: 3;
      color: rgb((var(--v-theme-primary)));

      .tagline {
        font-size: 2rem !important;
        font-weight: 700;
        line-height: 2.5rem;
      }
    }

    .person-with-phone {
      width: 100%;
      max-width: 40rem;
      height: auto;
    }
  }

  .mobileOrTabletView, .tabletOrDesktopView {
    #medical-providers-content-3 {
      background-position: calc(37% - 100px) top;
    }
  }

  .mobileView {
    #medical-providers-content-3 {
      background-position: calc(25% - 100px) top;
      
      .person-with-phone {
        width: 80%;
      }
    }
  }
</style>