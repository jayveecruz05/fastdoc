<template>
  <v-col id="home-content-2" class="content pa-0" cols="12">
    <v-container class="max-width pa-0" fluid>
      <v-row class="ma-0 my-10" align="center">
        <v-col class="pa-0" md="6">
          <NuxtImg class="phone" loading="lazy" width="505px" height="640px" src="/images/pages/home/content-2/phone.png" alt="phone" />
        </v-col>
        <v-col class="d-flex flex-column pa-5" md="6" cols="12">
          <h2 class="text-body-1 text-primary-text-color font-weight-bold text-uppercase">Why Choose</h2>
          <h1 class="tagline mb-2">FastDoc Telehealth</h1>
          <p class="text-body-1 text-primary-text-color mb-4">FastDoc is a leading telehealth company committed to providing convenient and affordable healthcare services to people. We believe that healthcare should be accessible to everyone, regardless of their location, and that’s why we offer our services through an innovative telehealth platform.</p>
          <p class="text-body-1 text-primary-text-color mb-4">At FastDoc, we leverage the latest technology to deliver high-quality healthcare services that are convenient, secure, and accessible from anywhere. Our team of experienced healthcare professionals is dedicated to providing personalized care to each of our patients, ensuring that they receive the best possible treatment for their medical needs.</p>
          <p class="text-body-1 text-primary-text-color mb-7">You can download our app now to get started or sign-up here!</p>
          <div class="app-buttons-wrapper d-flex flex-wrap flex-md-nowrap" cols="12">
            <NuxtLink class="d-inline-block mb-2 mr-4" href="https://www.apple.com/app-store" target="_blank">
              <IosButton class="icon" />
            </NuxtLink>
            <NuxtLink class="d-inline-block mb-2 mr-4" href="https://play.google.com" target="_blank">
              <AndroidButton class="icon" />
            </NuxtLink>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script lang="ts" setup>
  import IosButton from '@/public/images/common/ios-button.svg';
  import AndroidButton from '@/public/images/common/android-button.svg';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #home-content-2 {
    position: relative;
    z-index: 1;
    background-color: rgba(var(--v-theme-primary-background));
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% top;

    .tagline {
      font-size: 2rem !important;
      font-weight: 700;
      line-height: normal;
      color: rgb((var(--v-theme-primary)));
    }

    .app-buttons-wrapper {
      .icon {
        width: 190px;
      }
    }

    .phone {
      height: 40em;
    }
  }

  .mobileOrTabletView {
    #home-content-2 {
      .phone {
        display: block;
        height: 25em;
        margin: 0 auto;
      }

      .app-buttons-wrapper {
        .icon {
          width: 150px;
        }
      }
    }
  }
</style>