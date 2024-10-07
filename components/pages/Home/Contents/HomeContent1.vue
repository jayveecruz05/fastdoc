<template>
  <v-col id="home-content-1" class="content pa-0" cols="12">
    <v-container class="max-width pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="d-flex align-center pa-5 pa-xl-0" md="6" cols="12">
          <div class="info-holder py-14 px-0">
            <h1 class="tagline mb-5">Where Technology Meets Healthcare</h1>
            <p class="text-body-2 text-primary-text-color">Talk to a certified Medical Doctor wherever you are. Available 7:00 AM &#8722; 12:00 AM EST</p>
            <v-text-field class="search-box mt-3 mb-7" rounded="lg" variant="solo" bg-color="input-background-color" density="default" placeholder="Search for symptoms, doctors, specializations, etc." hide-details clearable append-inner-icon="mdi-magnify" @click:append-inner="handleSearchBox" @keyup.enter="handleSearchBox" />
            <div class="d-flex flex-wrap justify-center justify-sm-start mb-4">
              <v-btn class="mx-4 ml-md-0 mb-4" color="primary" size="large" rounded="lg" :to="{ path: '/consultation/form' }">Get Started</v-btn>
              <v-btn class="text-primary mx-4 ml-md-0 mb-4" size="large" rounded="lg" :to="{ path: '/specializations' }">Choose A Doctor</v-btn>
            </div>
            <p class="d-flex align-center justify-center justify-sm-start mt-7">
              <DocIcon />
              <span class="text-body-2 text-primary-text-color mx-2">Online Doctors:</span>
              <span class="text-primary font-weight-bold">23</span>
            </p>
          </div>
        </v-col>
        <v-col class="d-none d-md-flex justify-end pa-0" md="6">
          <NuxtImg class="person" loading="lazy" width="517px" height="560px" src="/images/pages/home/content-1/person.webp" alt="doctor-image" />
        </v-col>
      </v-row>
    </v-container>
    <BottomDivider class="bottom-divider" />
  </v-col>
</template>

<script lang="ts" setup>
  import DocIcon from '@/public/images/pages/home/content-1/doc-icon.svg';
  import BottomDivider from '@/public/images/pages/home/content-1/bottom-divider.svg';
  const handleSearchBox = () => {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #home-content-1 {
    position: relative;
    z-index: 1;
    min-height: 35em;
    background-color: rgba(var(--v-theme-primary-background));
    background-image: url('@/public/images/pages/home/content-1/background.webp');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% top;

    .info-holder {
      position: relative;
      z-index: 3;
      color: rgb((var(--v-theme-primary)));

      .tagline {
        font-size: 3rem !important;
        font-weight: 700;
        line-height: 3.5rem;
      }

      .search-box {
        .v-field {
          padding: 0;
        }

        .v-field__append-inner {
          background-color: rgb((var(--v-theme-primary)));
          color: rgb((var(--v-theme-surface)));

          .v-icon {
            padding: 28px 30px;
            opacity: 1;
          }
        }
      }
    }

    .person {
      height: 35em;
    }

    .bottom-divider {
      position: absolute;
      bottom: -1px;
      display: block;
      width: 100%;
      height: 5em;
      z-index: 2;
    }
  }

  .mobileOrTabletView {
    #home-content-1 {
      background-position: 90% top;
    }
  }
</style>