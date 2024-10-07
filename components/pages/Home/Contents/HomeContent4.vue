<template>
  <v-col id="home-content-4" class="content pa-0" cols="12">
    <TopDivider class="top-divider" />
    <div class="content-wrapper">
      <v-container class="max-width fill-height pa-0" fluid>
        <v-row class="ma-0 my-10" align="center">
          <v-col class="pa-0" md="6">
            <NuxtImg class="laptop-phone" loading="lazy" width="840px" height="560px" src="/images/pages/home/content-4/laptop-phone.webp" alt="laptop-phone" />
          </v-col>
          <v-col class="d-flex flex-column pa-5" md="6" cols="12">
            <h2 class="text-body-1 text-primary-text-color font-weight-bold text-uppercase">FastDoc Telemedicine</h2>
            <h1 class="tagline mb-2">Download our App to get the full features</h1>
            <p class="text-body-1 text-primary-text-color mb-4">FastDoc is a medical diagnostic laboratory that offers a full range of bio analytical testing and telemedicine services. Our doctors have certifications for New York and provide accurate diagnosis on your needs.</p>
            <p class="text-body-1 text-primary-text-color mb-4">We also provide a wide variety of tests, as well as fast, efficient COVID-19 testing for travel, symptoms and precautionary measures.</p>
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
    </div>
  </v-col>
</template>

<script lang="ts" setup>
  import IosButton from '@/public/images/common/ios-button.svg';
  import AndroidButton from '@/public/images/common/android-button.svg';
  import TopDivider from '@/public/images/pages/home/content-4/top-divider.svg';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #home-content-4 {
    position: relative;
    z-index: 1;
    background-color: rgba(var(--v-theme-secondary-background));

    .top-divider {
      position: relative;
      top: 1px;
      display: block;
      width: 100%;
      height: 5em;
      z-index: 2;
    }

    .content-wrapper {
      background-color: rgba(var(--v-theme-primary-background));

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

      .laptop-phone {
        margin-left: -10em;
        height: 35em;
      }
    }
  }

  .mobileOrTabletView {
    #home-content-4 {
      .laptop-phone {
        display: block;
        height: 15em;
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