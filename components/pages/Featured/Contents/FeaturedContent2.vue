<template>
  <v-col id="featured-content-2" class="content pa-0" cols="12">
    <v-container class="max-width pa-0" fluid>
      <v-row class="ma-0 my-10" align="center">
        <v-col class="text-center mt-5" cols="12">
          <h1 class="tagline text-secondary-text-color mb-2">Why FastDoc is your perfect choice</h1>
        </v-col>

        <v-col class="mb-10" cols="12">
          <v-container class="pa-0" fluid>
            <v-row class="ma-0">
              <v-col v-for="(content, index) in contentList" :key="`content-${index}`" sm="6" cols="12">
                <v-card class="fill-height" rounded="lg">
                  <v-container class="fill-height pa-0" fluid>
                    <v-row class="fill-height ma-0">
                      <v-col class="pa-0" md="3" lg="4" cols="12">
                        <NuxtImg class="card-image d-block w-100" loading="lazy" :src="content.image" :alt="content.title" />
                      </v-col>
                      <v-col class="pa-2" md lg cols="12" align-self="center">
                        <v-card-title tag="h2" class="font-weight-bold text-primary">{{ content.title }}</v-card-title>
                        <v-card-text tag="p" class="text-body-1 text-primary-text-color">{{ content.text }}</v-card-text>
                        <v-btn class="mx-4 mb-4" color="primary" rounded="lg" :to="{ path: content.path }">{{ content.buttonText }}</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script lang="ts" setup>
  // Data
  const contentList = [
    { title: 'See a doctor instantly', image: '/images/pages/featured/content-2/content-image-1.webp', text: 'No more waiting weeks for an appointment! With FastDoc, you can connect with a doctor in minutes, 24/7.', buttonText: 'Find a Doctor', path: '/find-a-doctor' },
    { title: 'Skip long queues', image: '/images/pages/featured/content-2/content-image-2.webp', text: 'Avoid crowded waiting rooms and potential exposure to illness. Get the care you need from the comfort of your home.', buttonText: 'Sign-Up', path: '/sign-up' },
    { title: 'Save time and money', image: '/images/pages/featured/content-2/content-image-3.webp', text: 'No travel time or expensive co-pays. FastDoc leverages your existing health insurance (if covered by your plan) to keep your care affordable.', buttonText: 'Get Started', path: '/consultation/form' },
    { title: 'Quality care, anywhere', image: '/images/pages/featured/content-2/content-image-4.webp', text: 'Our network consists of licensed, board-certified doctors ready to diagnose your condition, prescribe medication, and recommend follow-up care, all virtually.', buttonText: 'Learn More', path: '/blog' }
  ];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #featured-content-2 {
    background-color: rgba(var(--v-theme-secondary-background));
    
    .tagline {
      font-size: 2rem !important;
      font-weight: 700;
      line-height: normal;
      color: rgb((var(--v-theme-primary)));
    }

    .card-image {
      height: 100%;
      max-height: 270px;
      object-fit: cover;
      object-position: 70% 10%;
    }
  }
</style>