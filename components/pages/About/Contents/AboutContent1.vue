<template>
  <v-col id="about-content-1" class="content pa-0" cols="12">
    <v-container class="max-width pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="d-flex align-center pa-5 pa-xl-0" align-self="center" md="6" cols="12">
          <div class="info-holder pt-14 pb-0 pb-md-14 px-0">
            <h1 class="tagline mb-5">Convenient and Accessible medical care</h1>
            <p class="text-body-1 text-primary-text-color">At FastDoc, we understand the importance of receiving timely medical care, and we aim to provide a seamless and hassle-free experience for all of our patients. Our platform is designed to connect patients with qualified healthcare providers who are ready to offer consultations and diagnoses through video, phone, or chat.</p>
          </div>
        </v-col>
        <v-col class="d-flex justify-end pa-0" align-self="end" md="6" cols="12">
          <NuxtImg class="person-with-phone" loading="lazy" width="640px" height="auto" src="/images/pages/about/content-1/person-with-phone.png" alt="person-with-phone-image" />
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script lang="ts" setup>
  import { VContainer, VRow, VCol } from 'vuetify/components';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #about-content-1 {
    position: relative;
    z-index: 1;
    /* min-height: 30em; */
    background-color: rgba(235, 244, 246, 1);

    .info-holder {
      position: relative;
      z-index: 3;
      color: rgb((var(--v-theme-primary)));

      .tagline {
        font-size: 2.5rem !important;
        font-weight: 700;
        line-height: 3rem;
      }
    }

    .person-with-phone {
      width: 100%;
      max-width: 40rem;
      height: auto;
    }
  }

  .mobileView {
    #about-content-1 {
      .person-with-phone {
        width: 80%;
      }
    }
  }
</style>