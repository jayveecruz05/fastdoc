<template>
  <v-container id="specializations" class="bg-tertiary-background fill-height align-start py-12" fluid>
    <v-row class="max-width ma-0">
      <v-col class="text-left pt-0" cols="12">
        <h1 class="text-h4 font-weight-bold text-primary mb-5">{{ (specializationList.length > 0) ? 'I\'m looking for a doctor in:' : 'No available specializations' }}</h1>
      </v-col>
      <v-col v-for="(specialization) in specializationList" :key="`specialization-${specialization.slug}`" sm="4" md="4" lg="2" cols="6">
        <NuxtLink class="text-decoration-none" :to="{ path: '/find-a-doctor', query: { specialization: specialization.slug } }" tag="div">
          <v-card class="d-flex flex-column align-start fill-height text-left" rounded="lg" color="specialization-color" hover>
            <!-- <component :is="getIcon(specialization.icon)" class="icon specialization-icon mt-3 mx-3" /> -->
            <NuxtImg v-if="(specialization.icon)" class="icon specialization-icon mt-3 mx-3" loading="lazy" width="67px" height="67px" :src="specialization.icon" :alt="specialization.slug" />
            <v-card-title tag="h2" class="font-weight-bold text-body-1 text-secondary-text-color px-3">{{ specialization.name }}</v-card-title>
            <v-card-text tag="h3" class="text-primary-text-color pb-3 px-3">{{ specialization.description }}</v-card-text>
            <v-icon class="mb-3 mx-3" icon="mdi-arrow-right" color="primary" />
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  // Type
  import type { SpecializationType } from '@/types/api';

  // Special Data
  const { specialization } = useStore();
  // const { getIcon } = useSpecializationIcons();

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
    // { id: 9, icon: 'Pediatrics', slug: 'pediatrics', name: 'Pediatrics', description: 'Medical care of infants, children, & adolescents.' },
    // { id: 10, icon: 'PrimaryCare', slug: 'primary-care', name: 'Primary Care', description: 'For general concerns and illnesses.' },
    // { id: 11, icon: 'Psychiatry', slug: 'psychiatry', name: 'Psychiatry', description: 'Care for the mental health and disorders.' }
  ]);

  // API Requestor
  const specializationData = specialization.fetchList();
  await specializationData.suspense();
  if (specializationData.isSuccess.value) {
    specializationList.value = [ ...specializationData.data.value.data ];
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #specializations {
    .specialization-icon {
      width: 67px;
      height: 67px;
    }
  }

  .mobileOrTabletView {
    #specializations {
      .v-col-6 {
        flex: 1 0 49%;
        max-width: 100%;
      }
    }
  }
</style>