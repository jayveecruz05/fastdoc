<template>
  <v-container id="blog" class="bg-tertiary-background fill-height align-start py-12" fluid>
    <v-row class="max-width ma-0">
      <v-col class="text-left pt-0" cols="12">
        <h1 class="text-h4 font-weight-bold text-primary mb-5">Blog</h1>
      </v-col>
      <template v-for="(data, index) in dataList" :key="`data-${index}`">
        <v-col class="d-flex flex-column pb-5" sm="6" md="4" cols="12">
          <NuxtLink class="text-decoration-none" :to="{ path: data.path }" tag="div">
            <v-card class="fill-height" rounded="lg" color="primary-background" hover>
              <NuxtImg class="image" loading="lazy" width="429px" height="250px" densities="x1 x2" :src="data.image" :lazy-src="data.image" :alt="data.title" cover position="50% 35%" />
            </v-card>
          </NuxtLink>
          <p class="text-body-1 text-secondary-text-color font-weight-bold pa-3 pb-5">{{ data.title }}</p>
          <p class="d-flex align-center justify-space-between mt-auto px-3">
            <span class="bg-primary-background rounded-xl text-body-2 text-primary-text-color py-2 px-4">Recent News</span>
            <span class="text-body-1 text-primary-text-color ml-3">{{ getFullDate(data.date) }}</span>
          </p>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { VContainer, VRow, VCol, VCard } from 'vuetify/components';

  // Static Data
  const dataList = [
    { title: 'Telehealth vs In-person Consultations: What are the pros and cons?', image: '/images/pages/blog/blog-1-image.webp', date: '2024/01/01', path: '/blog/telehealth-vs-in-person-consultations' },
    { title: 'Telehealth in the Present', image: '/images/pages/blog/blog-2-image.webp', date: '2024/02/01', path: '/blog/telehealth-in-the-present' }
  ];

  // Special Data
  const { getFullDate } = useDate();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #blog {
    .v-card {
      min-height: 250px;
      max-height: 250px;

      .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 35%;
      }
    }
  }
</style>