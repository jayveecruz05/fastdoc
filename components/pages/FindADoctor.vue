<template>
  <ClientOnly>
    <v-navigation-drawer id="filter-drawer" v-model="filterDrawer" location="left" floating temporary touchless width="350">
      <v-container id="filter-wrapper" class="bg-background align-start" fluid>
        <v-row class="ma-0">
          <v-col cols="12">
            <p class="text-body-2 font-weight-bold text-uppercase text-primary-text-color">Search Doctor</p>
            <v-text-field v-model="filtersData.search" class="mt-3" placeholder="Doctor Name" rounded="lg" variant="solo" bg-color="input-background-color" density="compact" hide-details clearable />
          </v-col>
          <v-col v-for="(filters, key) in filtersList" :key="`filter-wrapper-${key}`" cols="12">
            <p class="text-body-2 font-weight-bold text-uppercase text-primary-text-color">{{ String(key).replace(/-/g, ' ') }}</p>
            <template v-if="(Array.isArray(filters))">
              <v-btn v-for="(value, index) in filters" :key="`filter-${index}`" :class="`mt-3 mr-3 text-uppercase ${(filtersData[key] === value) ? 'text-white bg-primary' : 'text-primary bg-tertiary-background'}`" size="small" rounded="lg" @click="() => { handleFilter({ key, value }); }">{{ String(value).replace(/-/g, ' ') }}</v-btn>
            </template>
            <div v-else-if="(key === 'rating')" class="d-inline-flex align-center cursor-pointer mt-3">
              <v-rating v-model="filtersData[key]" class="mr-1" color="yellow-darken-3" density="compact" hover />
              <span>&nbsp;{{ `${filtersData[key]} ${(filtersData[key] <= 1) ? 'Star' : 'Stars'}` }}&nbsp;</span>
              <span v-if="(Number(filtersData[key]) < 5)">&amp; Up</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div class="d-flex justify-end ma-4">
        <v-btn class="text-primary mr-4" rounded="lg" size="large" @click="handleFilterReset">Reset</v-btn>
        <v-btn rounded="lg" size="large" color="primary" append-icon="mdi-filter" @click="handleFilterSave">Filter</v-btn>
      </div>
    </v-navigation-drawer>
  </ClientOnly>

  <v-container id="find-a-doctor" class="bg-tertiary-background fill-height align-start py-10" fluid>
    <v-row class="max-width ma-0">
      <v-col class="pt-0 pb-3 px-3" cols="12">
        <v-btn class="text-primary" rounded="lg" size="large" append-icon="mdi-filter" @click="() => { filterDrawer = !filterDrawer; }">Filter Doctor's</v-btn>
      </v-col>

      <v-col v-for="(doctor) in doctorsList.data" :key="`doctor-${doctor.id}`" md="6" cols="12">
        <NuxtLink class="text-decoration-none" :to="{ path: `/doctor/${doctor.id}` }" tag="div">
          <v-card class="d-flex flex-column align-start fill-height text-left" rounded="lg" color="primary-background" hover>
            <v-container class="fill-height pa-0" fluid>
              <v-row class="fill-height ma-0">
                <v-col class="pa-0" cols="12">
                  <v-container class="pa-0" fluid>
                    <v-row class="ma-0">
                      <v-col class="pa-0" cols="12">
                        <v-container class="pa-5 pb-0" fluid>
                          <v-row class="ma-0" align="start">
                            <v-col class="pa-0 pb-3 pr-3" sm="auto" md="auto" cols="12">
                              <v-avatar v-if="(doctor?.image)" size="80">
                                <v-img loading="lazy" :src="doctor.image" :lazy-src="doctor.image" :alt="doctor.display_name" />
                              </v-avatar>
                              <v-avatar v-else size="80" color="secondary-background">
                                <v-icon icon="mdi-doctor" color="secondary-text-color" size="60" />
                              </v-avatar>
                            </v-col>

                            <v-col class="pa-0 pb-4 pb-sm-6" sm="auto" md="auto" cols="12">
                              <v-card-title tag="h2" class="text-body-1 font-weight-bold text-primary pa-0 pl-1">{{ doctor.display_name }}</v-card-title>
                              <v-card-text tag="p" class="text-primary-text-color pa-0 pl-1">{{ doctor.specialization }}</v-card-text>
                              <v-card-text class="d-flex align-center flex-wrap text-primary-text-color pa-0">
                                <v-rating :model-value="doctor.rating" color="yellow-darken-3" density="compact" half-increments readonly />
                                <span class="pt-1 px-1">{{ `${doctor?.rating || 0} ${(doctor?.rating && doctor?.rating <= 1) ? 'star' : 'stars'}` }} &lpar;{{ `${doctor?.reviews || 0}&nbsp;${(doctor?.reviews && doctor?.reviews <= 1) ? 'review' : 'reviews'}` }}&rpar;</span>
                              </v-card-text>
                            </v-col>

                            <v-spacer />

                            <v-col class="pa-0 pb-4" sm="auto" md="auto" cols="12" align-self="start">
                              <v-btn append-icon="mdi-book" size="default" rounded="lg" color="primary">Book Consultation</v-btn>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-col>

                      <v-col class="pa-0 pb-2" cols="12">
                        <v-card-text v-if="(doctor.bio)" class="text-body-2 text-primary-text-color px-5 pt-0 pb-2">{{ doctor.bio }}</v-card-text>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </NuxtLink>
      </v-col>
      
      <v-col class="pt-12 px-0" cols="12">
        <v-pagination v-model="doctorsList.meta.current_page" :length="doctorsList.meta.last_page" density="comfortable" color="primary" @update:modelValue="handlePagination" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  // import doctorPhoto from '@/public/images/common/doctor-photo.png';

  // Type
  import type { DoctorsType } from '@/types/api';

  // Special Data
  const { specialization, provider } = useStore();
  const { mobileOrTabletView } = useViewPort();
  // const { getDayNow } = useDate();

  // Data
  const filterDrawer = ref<boolean>(false);
  const filtersData = reactive<any>({ 'search': '', 'specializations': 'all', 'availability': 'any', 'credentials': 'any', 'gender': 'any', 'rating': 1 });
  const filtersList = {
    'specializations': [ 'all' ],
    'availability': [ 'any', 'next-2-hours', 'today' ],
    'credentials': [ 'any', 'md', 'do' ],
    'gender': [ 'any', 'male', 'female' ],
    'rating': null
  };

  const filter = reactive<{ per_page: number; page: number }>({ per_page: 10, page: 1 });
  const doctorsList = reactive<DoctorsType>({
    data: [
      // { id: 1, image: doctorPhoto, display_name: 'Dr. Lisa Parker', specialization: 'Geriatrician', rating: 5, reviews: 1, bio: 'Dr. Lisa is a Geriatrician based in New York with over 5 years of experience. She has practiced her specialization at NY General Hospital.' },
      // { id: 2, image: doctorPhoto, display_name: 'Dr. Lisa Parker', specialization: 'Geriatrician', rating: 3, reviews: 4, bio: 'Dr. Lisa is a Geriatrician based in New York with over 5 years of experience. She has practiced her specialization at NY General Hospital.'},
      // { id: 3, image: doctorPhoto, display_name: 'Dr. Lisa Parker', specialization: 'Geriatrician', rating: 4.5, reviews: 53, bio: 'Dr. Lisa is a Geriatrician based in New York with over 5 years of experience. She has practiced her specialization at NY General Hospital.' },
      // { id: 4, image: doctorPhoto, display_name: 'Dr. Lisa Parker', specialization: 'Geriatrician', rating: 4, reviews: 23, bio: 'Dr. Lisa is a Geriatrician based in New York with over 5 years of experience. She has practiced her specialization at NY General Hospital.' },
      // { id: 5, image: doctorPhoto, display_name: 'Dr. Lisa Parker', specialization: 'Geriatrician', rating: 3.5, reviews: 2, bio: 'Dr. Lisa is a Geriatrician based in New York with over 5 years of experience. She has practiced her specialization at NY General Hospital.'},
      // { id: 6, image: doctorPhoto, display_name: 'Dr. Lisa Parker', specialization: 'Geriatrician', rating: 0, reviews: 0, bio: 'Dr. Lisa is a Geriatrician based in New York with over 5 years of experience. She has practiced her specialization at NY General Hospital.' }
    ],
    meta: { current_page: 1, last_page : 1, per_page : 0, total: 0 }
  });

  // Methods
  const setDoctorsList = (response: DoctorsType) => {
    const { data, meta } = response;
    doctorsList.data = [ ...data ];
    doctorsList.meta = { ...meta };
  };

  const handlePagination = (page: number) => {
    filter.page = page;
    window.scrollTo(0, 0);
  };

  const handleFilter = ({ key, value }: { key: string, value: string | number }) => {
    filtersData[key] = value;
  };

  const filterReset = () => {
    filtersData['search'] = '';
    filtersData['specializations'] = 'all';
    filtersData['availability'] = 'any';
    filtersData['credentials'] = 'any';
    filtersData['gender'] = 'any';
    filtersData['rating'] = 1;
  };

  const handleFilterReset = () => {
    filterReset();
    filterDrawer.value = !filterDrawer.value;
  };

  const handleFilterSave = () => {
    filterDrawer.value = !filterDrawer.value;
  };

  // Watch
  watch(mobileOrTabletView, () => { filterDrawer.value = false; }, { flush: 'post' });

  // API Requestor
  const specializationData = specialization.fetchList();
  await specializationData.suspense();
  if (specializationData.isSuccess.value) {
    filtersList.specializations = [ ...filtersList.specializations, ...specializationData.data.value.data.map((item: any) => (item?.slug)) ];
  }

  const providerList = provider.fetchList({ params: filter });
  await providerList.suspense();
  if (providerList.isSuccess.value) {
    setDoctorsList(providerList.data.value);
  }

  // Watch API
  watch(providerList.data, (to) => { if (!!to) { setDoctorsList(to); } }, { flush: 'post' });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #filter-drawer {
    .v-navigation-drawer__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    #filter-wrapper {
      flex-grow: 1;
      overflow-y: auto;
    }
  }
</style>