<template>
  <v-col id="featured-content-5" class="content pa-0" cols="12">
    <v-container class="max-width pa-0" fluid>
      <v-row class="ma-0 my-14 pa-3" align="center">
        <v-col class="pr-md-16" :md="((specializationList.length > 0) ? 6 : false)" cols="12">
          <h2 class="text-body-1 text-primary-text-color font-weight-bold text-uppercase">We Are Here For You</h2>
          <h1 class="tagline mb-2">Find the Right Specialist for you</h1>
          <p class="text-body-1 text-primary-text-color mb-4">Choosing a doctor is like choosing is like choosing an engineer. It’s not ideal to hire an automotive engineer to work on a building. It is important to find the right doctor with the right specialization for your needs, so we made it easy to find the right one for you.</p>
          <p class="text-body-1 text-primary-text-color mb-7">Find a doctor today at affordable prices and you don’t have to wait long in queues!</p>
          <div class="d-flex flex-wrap justify-center justify-sm-start mb-4">
            <v-btn class="mx-4 ml-md-0" color="primary" size="large" rounded="lg" :to="{ path: '/find-a-doctor' }">Find a Doctor</v-btn>
          </div>
        </v-col>
        <v-col v-if="(specializationList.length > 0)" class="pa-0 py-4" md="6" cols="12">
          <v-container class="pa-0" fluid>
            <v-row class="ma-0">
              <v-col v-for="(specialization) in specializationList" :key="`specialization-${specialization.slug}`" sm="6" lg="4" cols="6">
                <NuxtLink class="text-decoration-none" :to="{ path: '/find-a-doctor', query: { specialization: specialization.slug } }" tag="div">
                  <v-card class="d-flex flex-column align-start fill-height text-left" rounded="lg" color="specialization-color" hover>
                    <component :is="getIcon(specialization.name!)" class="icon specialization-icon mt-3 mx-3" />
                    <!-- <NuxtImg v-if="(specialization.icon)" class="icon specialization-icon mt-3 mx-3" loading="lazy" width="67px" height="67px" :src="specialization.icon" :lazy-src="specialization.icon" :alt="specialization.slug" /> -->
                    <v-card-title tag="h2" class="font-weight-bold text-body-1 text-secondary-text-color px-3">{{ specialization.name }}</v-card-title>
                    <v-card-text tag="h3" class="text-primary-text-color pb-3 px-3">{{ specialization.description }}</v-card-text>
                    <v-icon class="mb-3 mx-3" icon="mdi-arrow-right" color="primary" />
                  </v-card>
                </NuxtLink>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script lang="ts" setup>
  // Type
  import type { SpecializationType } from '@/types/api';

  // Special Data
  const { specialization } = useStore();
  const { getIcon } = useSpecializationIcons();

  // Data
  const specializationList = ref<SpecializationType[]>([
    // { id: 1, icon: 'Cardiology', slug: 'cardiology', name: 'Cardiology', description: 'Care for the heart and blood vessels.' },
    // { id: 2, icon: 'Dermatology', slug: 'dermatology', name: 'Dermatology', description: 'Treatment for skin, hair, and nail conditions.' },
    // { id: 3, icon: 'Endocrinology', slug: 'endocrinology', name: 'Endocrinology', description: 'Treatment of diseases related to hormones.' },
    // { id: 4, icon: 'Gastroenterology', slug: 'gastroenterology', name: 'Gastroenterology', description: 'Care for the stomach, intestines, colon, etc.' },
    // { id: 5, icon: 'Gynecology', slug: 'gynecology', name: 'Gynecology', description: 'Treatment of women who are not pregnant.' },
    // { id: 6, icon: 'Neurology', slug: 'neurology', name: 'Neurology', description: 'Treatment of disorders of the nervous system.' },
    // { id: 7, icon: 'Oncology', slug: 'oncology', name: 'Oncology', description: 'Diagnosis and treatment of cancer.' },
    // { id: 8, icon: 'Pathology', slug: 'pathology', name: 'Pathology', description: 'Treatment of illness and diseases.' },
    // { id: 9, icon: 'Pediatrics', slug: 'pediatrics', name: 'Pediatrics', description: 'Medical care of infants, children, & adolescents.' }
  ]);

  // API Requestor
  const specializationData = specialization.fetchList();
  await specializationData.suspense();
  if (specializationData.isSuccess.value) {
    specializationList.value = [ ...specializationData.data.value.data.slice(0, 9) ];
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #featured-content-5 {
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
      width: 67px;
      height: 67px;
    }
  }

  .mobileOrTabletView {
    #featured-content-5 {
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