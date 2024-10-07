<template>
  <v-container id="consultation-step-4" class="pa-0" fluid>
    <v-row class="ma-0">
      <v-col class="py-5 px-4" cols="12">
        <p class="text-body-2 font-weight-bold text-uppercase text-secondary-text-color">Step 4</p>
        <h2 class="text-h6 font-weight-bold text-primary pb-4">Additional Information</h2>
        <v-divider class="border-opacity-100" thickness="4" color="tertiary"/>
      </v-col>

      <v-col v-if="(isFullyLoggedIn)" class="pa-0" cols="12">
        <ConsultationStep4UserForm v-model:form-data="formData" />
      </v-col>
      
      <template v-else>
        <v-stepper :model-value="step" class="d-none d-sm-block" alt-labels flat width="100%" bg-color="transparent">
          <v-stepper-header>
            <template v-for="(stepper, index) in stepperList" :key="`stepper-${stepper.title}`">
              <v-stepper-item :value="stepper.value" :icon="stepper.icon" color="primary">
                <template v-slot:title>
                  <span class="text-capitalize text-primary-text-color">{{ stepper.title }}</span>
                </template>
              </v-stepper-item>
              <v-divider v-if="(index < (stepperList.length - 1))" class="border-opacity-100" color="primary" />
            </template>
          </v-stepper-header>
        </v-stepper>

        <v-expand-transition>
          <v-col v-if="(/^(additional-information--personal)$/.test(step))" class="pa-0" cols="12">
            <ConsultationStep4PersonalForm v-model:form-data="formData" />
          </v-col>
        </v-expand-transition>

        <v-expand-transition>
          <v-col v-if="(/^(additional-information--insurance)$/.test(step))" class="pa-0" cols="12">
            <ConsultationStep4InsuranceForm v-model:form-data="formData" />
          </v-col>
        </v-expand-transition>

        <v-expand-transition>
          <v-col v-if="(/^(additional-information--address)$/.test(step))" class="pa-0" cols="12">
            <ConsultationStep4AddressForm v-model:form-data="formData" />
          </v-col>
        </v-expand-transition>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  // Type
  import type { ConsultationType } from '@/types/form-data';
  
  type PropsType = { step: string };

  // Props
  withDefaults(defineProps<PropsType>(), { step: 'additional-information--personal' });

  // Model
  const formData = defineModel<ConsultationType>('formData', { required: true });

  // Special Data
  const { isFullyLoggedIn } = useCookies();

  // Static Data
  const stepperList = [
    { title: 'Personal', icon: 'mdi-account', value: 'additional-information--personal' },
    { title: 'Insurance', icon: 'mdi-card-account-details', value: 'additional-information--insurance' },
    { title: 'Address', icon: 'mdi-map-marker', value: 'additional-information--address' }
  ];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>