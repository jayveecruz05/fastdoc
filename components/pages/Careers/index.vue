<template>
  <v-container id="careers" class="bg-tertiary-background fill-height align-start py-12" fluid>
    <v-row class="max-width ma-0">
      <v-col class="text-left pt-0" cols="12">
        <h1 class="text-h4 font-weight-bold text-primary mb-5">Careers</h1>
        <p class="text-body-1 text-primary-text-color my-4">At FastDoc, we are dedicated to providing accessible, high-quality healthcare to patients across the country. Our team of healthcare professionals is passionate about using telemedicine technology to improve patient outcomes and make healthcare more convenient and affordable for everyone.</p>
        <p class="text-body-1 text-primary-text-color my-4">If you are looking to join a dynamic and innovative team that is revolutionizing the healthcare industry, FastDoc may be the perfect fit for you. We offer a collaborative and supportive work environment, opportunities for professional growth and development, and a chance to make a meaningful impact on the lives of patients and their families.</p>
        <p class="text-body-1 text-primary-text-color my-4">Check out our available positions below:</p>
      </v-col>
      <v-col v-for="(data, index) in dataList" :key="`data-${index}`" class="pa-0" cols="12">
        <v-container class="pa-0" fluid>
          <v-row class="ma-0">
            <v-col class="pb-0" cols="12">
              <h2 class="text-h5 text-capitalize font-weight-bold text-secondary-text-color">{{ data.career }}</h2>
            </v-col>
            <v-col v-for="(item, iIndex) in data.jobs" :key="`item-${iIndex}`" class="career-wrapper d-flex flex-column pb-5" sm="6" cols="12">
              <v-card class="d-flex flex-column flex-sm-row align-start align-sm-center justify-space-between fill-height text-primary pa-4" rounded="lg" color="primary-background">
                <v-card-text class="w-100 pa-0 pr-sm-4">
                  <h3 class="text-h6 text-capitalize font-weight-bold pb-1">{{ item.title }}</h3>
                  <p class="text-body-1 text-capitalize text-primary-text-color">{{ item.location }}</p>
                </v-card-text>
                <v-card-text class="d-flex justify-end w-100 w-sm-auto pa-0 pt-3 pb-2 py-sm-0">
                  <v-btn rounded="lg" color="primary" variant="elevated" :to="{ path: item.path }">Apply Now</v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  // Static Data
  const dataList = [
    {
      career: 'Doctors',
      jobs: [
        { title: 'Pediatrician', location: 'United states - california, new york - virtual', path: '/careers/pediatrician' },
        { title: 'Dermatologist', location: 'United states - all states - virtual', path: '/careers/dermatologist' }
      ]
    },
    {
      career: 'Medical',
      jobs: [
        { title: 'Nurse Practitioner', location: 'United states - all states - virtual', path: '/careers/nurse-practitioner' }
      ]
    },
    {
      career: 'Support',
      jobs: [
        { title: 'Customer Support', location: 'Worldwide - virtual', path: '/careers/customer-support' }
      ]
    }
  ];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  /* #careers {
    .career-wrapper {
      flex-grow: 1;
      max-width: 100%;
    }
  } */
</style>