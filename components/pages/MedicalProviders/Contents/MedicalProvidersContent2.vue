<template>
  <v-col id="medical-providers-content-2" class="content pa-0" cols="12">
    <v-container class="max-width pa-0" fluid>
      <v-row class="ma-0 my-10" align="center">
        <v-col class="text-center my-5 px-5" cols="12">
          <h1 class="tagline mb-4">Why Join Us?</h1>
          <p class="text-body-1 text-primary-text-color">By joining our team, you can expand your patient base and increase your revenue, without the need for additional overhead costs.</p>
        </v-col>

        <v-col class="px-2" cols="12">
          <v-container class="pa-0" fluid>
            <v-row class="ma-0">
              <v-col v-for="(content, index) in contentList" :key="`content-${index}`" md="4" cols="12">
                <v-card class="content-card fill-height text-center cursor-default pa-5" rounded="lg" variant="flat" hover>
                  <component class="content-icon ma-3 mt-6" :is="content.image" />
                  <v-card-title tag="h2" class="font-weight-bold text-secondary-text-color px-2 pb-5">{{ content.title }}</v-card-title>
                  <v-card-text tag="p" class="text-body-1 text-primary-text-color px-3">{{ content.text }}</v-card-text>
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
  import ContentIcon1 from '@/public/images/pages/medical-providers/content-2/content-icon-1.svg';
  import ContentIcon2 from '@/public/images/pages/medical-providers/content-2/content-icon-2.svg';
  import ContentIcon3 from '@/public/images/pages/medical-providers/content-2/content-icon-3.svg';

  import { VContainer, VRow, VCol, VCard, VCardTitle, VCardText } from 'vuetify/components';

  // Data
  const contentList = [
    { title: 'Expanded patient reach', image: ContentIcon1, text: 'With FastDoc, you can provide care to patients who may not have access to in-person services, including those in rural or remote areas.' },
    { title: 'Enhanced practice efficiency', image: ContentIcon2, text: 'Our platform is designed to streamline the telehealth process, allowing you to see more patients in less time and reducing administrative burdens.' },
    { title: 'Improved patient convenience', image: ContentIcon3, text: 'Patients can receive care from the comfort of their own homes, saving time and money on travel and reducing exposure to illness.' }
  ];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #medical-providers-content-2 {
    background-color: rgba(var(--v-theme-primary-background));
    
    .tagline {
      font-size: 2rem !important;
      font-weight: 700;
      line-height: normal;
      color: rgb((var(--v-theme-primary)));
    }

    .content-card {
      &:hover {
        box-shadow: 0px 5px 5px -3px rgba(var(--v-theme-primary), 0.2), 0px 8px 10px 1px rgba(var(--v-theme-primary), 0.14), 0px 3px 14px 2px rgba(var(--v-theme-primary), 0.12);
      }

      .content-icon {
        width: 130px;
        height: 130px;
      }
    }
  }
</style>