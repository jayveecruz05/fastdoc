<template>
  <v-container id="consultation-step-3" class="pa-0" fluid>
    <v-row class="ma-0">
      <v-col class="py-5 px-4" cols="12">
        <p class="text-body-2 font-weight-bold text-uppercase text-secondary-text-color">Step 3</p>
        <h2 class="text-h6 font-weight-bold text-primary pb-4">Booking Options</h2>
        <v-divider class="border-opacity-100" thickness="4" color="tertiary"/>
      </v-col>

      <!-- <v-col class="d-flex flex-column align-center py-5 px-4" cols="12" align-self="center">
        <v-progress-circular indeterminate :size="80" :width="5" color="primary" />
        <p class="label text-primary font-weight-bold mt-4">Finding a medical provider for you...</p>
      </v-col> -->

      <v-col class="pa-0" cols="12">
        <v-container class="pa-0" fluid>
          <v-row class="ma-0">
            <v-col class="pb-0 px-1 pb-5" cols="12">
              <label class="label text-primary-text-color mx-3 mb-2">We have pre-selected a recommended provider for you. You can choose to proceed or pick another provider</label>
              <v-container class="pa-0" fluid>
                <v-row class="ma-0">
                  <v-col v-for="(doctor) in doctorList.recommended" :key="`doctor-${doctor.id}`" class="pa-0" :md="(doctorList.recommended.length > 1) ? 6 : 12" cols="12">
                    <DoctorTemplate :class="[{ active: (formData.data.booking.value === doctor.id) }]" :data="doctor" recommended @click="() => { formData.data.booking.value = doctor.id; }" />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <v-col class="pb-0 px-1 pb-5" cols="12">
              <label class="label text-primary-text-color font-weight-bold mx-3 mb-2">Suggested for you</label>
              <v-container class="pa-0" fluid>
                <v-row class="ma-0">
                  <v-col v-for="(doctor) in doctorList.suggested" :key="`doctor-${doctor.id}`" class="pa-0" :md="(doctorList.suggested.length > 1) ? 6 : 12" cols="12">
                    <DoctorTemplate :class="[{ active: (formData.data.booking.value === doctor.id) }]" :data="doctor" @click="() => { formData.data.booking.value = doctor.id; }" />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <v-col class="pb-0 px-1 pb-5" cols="12">
              <label class="label text-primary-text-color font-weight-bold mx-3 mb-2">From your past consultations</label>
              <v-container class="pa-0" fluid>
                <v-row class="ma-0">
                  <v-col v-for="(doctor) in doctorList.previous" :key="`doctor-${doctor.id}`" class="pa-0" :md="(doctorList.previous.length > 1) ? 6 : 12" cols="12">
                    <DoctorTemplate :class="[{ active: (formData.data.booking.value === doctor.id) }]" :data="doctor" @click="() => { formData.data.booking.value = doctor.id; }" />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import doctorPhoto from '@/public/images/common/doctor-photo.png';
  
  // Type
  import type { ConsultationType } from '@/types/form-data';

  // Model
  const formData = defineModel<ConsultationType>('formData', { required: true });

  // Static Data
  const doctorList = {
    recommended: [
      { id: 1, image: doctorPhoto, name: 'Dr. Lisa Parker', specialization: 'Geriatrician', rating: 5, reviews: 1, bio: 'Dr. Lisa is a Geriatrician based in New York with over 5 years of experience. She has practiced her specialization at NY General Hospital.' }
    ],
    suggested: [
      { id: 2, image: doctorPhoto, name: 'Dr. Lisa Parker', specialization: 'Geriatrician', rating: 5, reviews: 1, bio: 'Dr. Lisa is a Geriatrician based in New York with over 5 years of experience. She has practiced her specialization at NY General Hospital.' },
      { id: 3, image: doctorPhoto, name: 'Dr. Lisa Parker', specialization: 'Geriatrician', rating: 5, reviews: 1, bio: 'Dr. Lisa is a Geriatrician based in New York with over 5 years of experience. She has practiced her specialization at NY General Hospital.' }
    ],
    previous: [
      { id: 4, image: doctorPhoto, name: 'Dr. Lisa Parker', specialization: 'Geriatrician', rating: 5, reviews: 1, bio: 'Dr. Lisa is a Geriatrician based in New York with over 5 years of experience. She has practiced her specialization at NY General Hospital.' },
      { id: 5, image: doctorPhoto, name: 'Dr. Lisa Parker', specialization: 'Geriatrician', rating: 5, reviews: 1, bio: 'Dr. Lisa is a Geriatrician based in New York with over 5 years of experience. She has practiced her specialization at NY General Hospital.' }
    ]
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>