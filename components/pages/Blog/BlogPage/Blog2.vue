<template>
  <v-container class="blog bg-tertiary-background fill-height align-start py-12" fluid>
    <v-row class="max-width ma-0">
      <v-col cols="12">
        <NuxtImg class="image rounded-lg" loading="lazy" src="/images/pages/blog/blog-2-image.webp" lazy-src="/images/pages/blog/blog-2-image.webp" alt="Telehealth in the Present" />
      </v-col>
      <v-col class="text-left" cols="12">
        <h1 class="text-h4 font-weight-bold text-secondary-text-color mb-5">Telehealth in the Present</h1>
        <p class="d-flex align-center justify-space-between mt-auto mb-8">
          <span class="bg-primary-background rounded-xl text-body-2 text-primary-text-color py-2 px-4">Recent News</span>
          <span class="text-body-1 text-primary-text-color ml-3">{{ getFullDate('2024/02/01') }}</span>
        </p>
        <p class="text-body-1 text-primary-text-color my-4">Telehealth has become an increasingly important tool in the healthcare industry, especially since the onset of the COVID-19 pandemic. The pandemic has accelerated the adoption of telehealth as a means of providing medical care to patients who cannot access in-person appointments. One recent development in the telehealth field is the use of wearable technology to remotely monitor patient’s health.</p>
        <p class="text-body-1 text-primary-text-color my-4">Wearable technology, such as smartwatches, fitness trackers, and health monitors, has become increasingly popular over the past few years. These devices can track various health metrics, such as heart rate, blood pressure, and sleep quality. With the help of telehealth, these devices can now be used to remotely monitor patient’s health and alert healthcare providers to any potential health issues.</p>
        <p class="text-body-1 text-primary-text-color my-4">One example of how wearable technology is being used in telehealth is in the management of chronic conditions such as diabetes. Patients with diabetes need to monitor their blood sugar levels regularly, which can be done using a continuous glucose monitor (CGM). With the help of telehealth, patients can share their CGM data with their healthcare providers, who can monitor the data remotely and make adjustments to the patient’s treatment plan as needed.</p>
        <p class="text-body-1 text-primary-text-color my-4">Another example of how wearable technology is being used in telehealth is in the monitoring of patients with heart disease. Patients with heart disease can wear a smartwatch that can track their heart rate and rhythm, as well as detect any irregularities. The data from the smartwatch can be shared with the patient’s healthcare provider, who can monitor the data and intervene if necessary.</p>
        <p class="text-body-1 text-primary-text-color my-4">The use of wearable technology in telehealth has several benefits. First, it allows for remote monitoring of patients’ health, which can be especially important for patients who live in remote areas or who have difficulty traveling to in-person appointments. Second, it can help healthcare providers detect potential health issues before they become serious, allowing for earlier intervention and better outcomes. Finally, it can help patients become more engaged in their own healthcare, as they can track their own health data and share it with their healthcare providers.</p>
        <p class="text-body-1 text-primary-text-color my-4">Despite these benefits, there are still some challenges to the widespread adoption of wearable technology in telehealth. One challenge is the cost of the devices, which can be prohibitive for some patients. Another challenge is the need for healthcare providers to have the technology and infrastructure in place to receive and monitor patient data remotely.</p>
        <p class="text-body-1 text-primary-text-color mt-4">In conclusion, the use of wearable technology in telehealth has the potential to revolutionize the way healthcare is delivered. By allowing for remote monitoring of patient’s health, wearable technology can help healthcare providers detect potential health issues before they become serious, leading to better outcomes for patients. However, there are still challenges to overcome before wearable technology becomes a widely adopted tool in telehealth.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { VContainer, VRow, VCol } from 'vuetify/components';

  // Special Data
  const { getFullDate } = useDate();

  useSeoMeta({ title: 'Telehealth in the Present', description: 'Telehealth has become an increasingly important tool in the healthcare industry, especially since the onset of the COVID-19 pandemic. The pandemic has accelerated the adoption of telehealth as a means of providing medical care to patients who cannot access in-person appointments. One recent development in the telehealth field is the use of wearable technology to remotely monitor patient’s health.' });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>