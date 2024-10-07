<template>
  <v-col id="home-content-3" class="content pa-0" cols="12">
    <TopDivider class="top-divider" />
    <div class="content-wrapper">
      <v-container class="max-width fill-height pa-0" fluid>
        <v-row class="ma-0 my-10" align="center">
          <v-col class="text-center mt-10" cols="12">
            <h2 class="text-body-1 text-primary-text-color font-weight-bold text-uppercase">What We Offer</h2>
            <h1 class="tagline mb-2">Check Out Our Key Services</h1>
          </v-col>

          <v-col class="text-center" cols="12">
            <v-container class="pa-0" fluid>
              <v-row class="ma-0">
                <v-col sm="4" md="4" cols="12">
                  <v-card class="fill-height text-center pa-5" rounded="lg">
                    <PreventiveHealth class="mt-4" />
                    <v-card-title tag="h2" class="font-weight-bold text-primary px-5 pb-5">Preventive Health</v-card-title>
                    <v-card-text tag="p" class="text-primary-text-color px-3">Our medical team partners with you to support your day-to-day health and self-care routines. From healthy eating to preventive lab tests, we bring you solutions that actually work in the real world.</v-card-text>
                  </v-card>
                </v-col>
                <v-col sm="4" md="4" cols="12">
                  <v-card class="fill-height text-center pa-5" rounded="lg">
                    <UrgentCare class="mt-4" />
                    <v-card-title tag="h2" class="font-weight-bold text-primary px-5 pb-5">Urgent Care</v-card-title>
                    <v-card-text tag="p" class="text-primary-text-color px-3">When you’re sick and need care, our team is standing by around the clock. Our providers can help get you on track. We’ll take the hassle and guesswork out of feeling better.</v-card-text>
                  </v-card>
                </v-col>
                <v-col sm="4" md="4" cols="12">
                  <v-card class="fill-height text-center pa-5" rounded="lg">
                    <GeneralConsultations class="mt-4" />
                    <v-card-title tag="h2" class="font-weight-bold text-primary px-5 pb-5">General Consultations</v-card-title>
                    <v-card-text tag="p" class="text-primary-text-color px-3">No more waiting for hours in a walk-in clinic, or weeks to see your family doctor. Get an appointment at your preferred schedule! Available Monday - Saturday 9:00 AM to 4:00 PM.</v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <v-btn class="my-5" color="primary" size="large" rounded="lg" :to="{ path: '/consultation/form' }">Book a Consultation</v-btn>
          </v-col>

          <v-col class="mb-5" cols="12">
            <v-container class="pa-0" fluid>
              <v-row class="ma-0" align="center">
                <v-col class="pr-md-16" md="6" cols="12">
                  <h2 class="text-body-1 text-primary-text-color font-weight-bold text-uppercase">We Are Here For You</h2>
                  <h1 class="tagline mb-2">Find the Right Specialist for you</h1>
                  <p class="text-body-1 text-primary-text-color mb-4">Choosing a doctor is like choosing is like choosing an engineer. It’s not ideal to hire an automotive engineer to work on a building. It is important to find the right doctor with the right specialization for your needs, so we made it easy to find the right one for you.</p>
                  <p class="text-body-1 text-primary-text-color mb-7">Find a doctor today at affordable prices and you don’t have to wait long in queues!</p>
                  <div class="d-flex flex-wrap justify-center justify-sm-start mb-4">
                    <v-btn class="mx-4 ml-md-0 mb-4" color="primary" size="large" rounded="lg" :to="{ path: '/consultation/form' }">Consult A Doctor Now</v-btn>
                    <v-btn class="text-primary mx-4 ml-md-0 mb-4" size="large" rounded="lg" :to="{ path: '/specializations' }">Choose A Doctor</v-btn>
                  </div>
                </v-col>
                <v-col class="pa-0" md="6" cols="12">
                  <v-container class="pa-0" fluid>
                    <v-row class="ma-0">
                      <template v-for="(specialization) in specializationList" :key="specialization.key">
                        <v-col v-if="(!!getIcon(specialization.key))" sm="6" lg="4" cols="6">
                          <NuxtLink class="text-decoration-none" :to="{ path: '/' }" tag="div">
                            <v-card class="d-flex flex-column align-start fill-height text-left" rounded="lg" color="specialization-color" hover>
                              <component :is="getIcon(specialization.key)" class="icon specialization-icon mt-3 mx-3" />
                              <v-card-title tag="h2" class="font-weight-bold text-body-1 text-secondary-text-color px-3">{{ specialization.name }}</v-card-title>
                              <v-card-text tag="h3" class="text-primary-text-color pb-3 px-3">{{ specialization.text }}</v-card-text>
                              <v-icon class="mb-3 mx-3" icon="mdi-arrow-right" color="primary" />
                            </v-card>
                          </NuxtLink>
                        </v-col>
                      </template>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-col>
</template>

<script lang="ts" setup>
  import PreventiveHealth from '@/public/images/pages/home/content-3/preventive-health.svg';
  import UrgentCare from '@/public/images/pages/home/content-3/urgent-care.svg';
  import GeneralConsultations from '@/public/images/pages/home/content-3/general-consultations.svg';
  import TopDivider from '@/public/images/pages/home/content-3/top-divider.svg';

  // Special Data
  const { getIcon } = useSpecializationIcons();

  // Data
  const specializationList = [
    { key: 'Cardiology', name: 'Cardiology', text: 'Care for the heart and blood vessels.' },
    { key: 'Dermatology', name: 'Dermatology', text: 'Treatment for skin, hair, and nail conditions.' },
    { key: 'Endocrinology', name: 'Endocrinology', text: 'Treatment of diseases related to hormones.' },
    { key: 'Gastroenterology', name: 'Gastroenterology', text: 'Care for the stomach, intestines, colon, etc.' },
    { key: 'Gynecology', name: 'Gynecology', text: 'Treatment of women who are not pregnant.' },
    { key: 'Neurology', name: 'Neurology', text: 'Treatment of disorders of the nervous system.' },
    { key: 'Oncology', name: 'Oncology', text: 'Diagnosis and treatment of cancer.' },
    { key: 'Pathology', name: 'Pathology', text: 'Treatment of illness and diseases.' },
    { key: 'Pediatrics', name: 'Pediatrics', text: 'Medical care of infants, children, & adolescents.' }
  ];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #home-content-3 {
    position: relative;
    z-index: 1;
    background-color: rgba(var(--v-theme-primary-background));

    .top-divider {
      position: relative;
      top: 1px;
      display: block;
      width: 100%;
      height: 5em;
      z-index: 2;
      background-color: rgba(var(--v-theme-secondary-background));
    }

    .content-wrapper {
      background-color: rgba(var(--v-theme-secondary-background));

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
        height: 35em;
      }

      .specialization-icon {
        width: auto;
        height: 67px;
      }
    }
  }

  .mobileOrTabletView {
    #home-content-3 {
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

      .v-col-6 {
        flex: 1 0 49%;
        max-width: 100%;
      }
    }
  }
</style>