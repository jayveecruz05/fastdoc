<template>
  <v-container class="pa-0" fluid>
    <v-expand-transition>
      <v-row v-if="(!viewedData)" class="ma-0">
        <v-col v-for="(data) in appointmentList" :key="`appointment-${data.id}`" class="pb-5 px-7" cols="12">
          <AppointmentTemplate :data="data" @view="() => { handleViewData(data); }" />
        </v-col>
        <v-col class="pb-7 px-7" cols="12">
          <v-pagination :length="4" density="comfortable" color="primary" />
        </v-col>
      </v-row>
    </v-expand-transition>

    <v-expand-transition>
      <v-row v-if="(!!viewedData)" class="ma-0">
        <v-col class="pb-10 px-7" cols="12">
          <AppointmentTemplate action="view" :data="viewedData" @back="() => { handleViewData(null); }" />
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-container>
</template>

<script lang="ts" setup>
  import doctorPhoto from '@/public/images/common/doctor-photo.png';

  // Static Data
  const appointmentList = [
    { id: 1, image: doctorPhoto, name: 'Dr. Lisa Parker', patient: 'Jane Doe', specialization: 'Geriatrician', symptoms: ['Cough', 'Flu', 'Fever'], date: '2024/01/01', status: 'pending' },
    { id: 2, image: doctorPhoto, name: 'Dr. Lisa Parker', patient: 'Jane Doe', specialization: 'Geriatrician', symptoms: ['Constant lower back pain', 'insomnia'], date: '2024/01/01', status: 'closed', findings: 'Inflammation on right Lumborum muscle caused by physical strain', recommended: 'Rest for 3-5 days, take anti-inflammatory drugs twice a day', npi: '123456789' },
    { id: 3, image: doctorPhoto, name: 'Dr. Lisa Parker', patient: 'Jane Doe', specialization: 'Geriatrician', symptoms: ['Cough', 'Flu', 'Fever'], date: '2024/01/01', status: 'pending' },
    { id: 4, image: doctorPhoto, name: 'Dr. Lisa Parker', patient: 'Jane Doe', specialization: 'Geriatrician', symptoms: ['Constant lower back pain', 'insomnia'], date: '2024/01/01', status: 'closed', findings: 'Inflammation on right Lumborum muscle caused by physical strain', recommended: 'Rest for 3-5 days, take anti-inflammatory drugs twice a day', npi: '123456789' },
    { id: 5, image: doctorPhoto, name: 'Dr. Lisa Parker', patient: 'Jane Doe', specialization: 'Geriatrician', symptoms: ['Cough', 'Flu', 'Fever'], date: '2024/01/01', status: 'pending' },
    { id: 6, image: doctorPhoto, name: 'Dr. Lisa Parker', patient: 'Jane Doe', specialization: 'Geriatrician', symptoms: ['Constant lower back pain', 'insomnia'], date: '2024/01/01', status: 'closed', findings: 'Inflammation on right Lumborum muscle caused by physical strain', recommended: 'Rest for 3-5 days, take anti-inflammatory drugs twice a day', npi: '123456789' }
  ];

  // Data
  const viewedData = ref<any>(null);

  // Methods
  const handleViewData = (data: any) => {
    viewedData.value = data;
    window.scrollTo(0, 0);
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>