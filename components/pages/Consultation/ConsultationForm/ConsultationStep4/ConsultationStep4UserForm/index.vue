<template>
  <v-container class="pa-0" fluid>
    <v-row class="ma-0">
      <v-col class="pb-0 px-4" md="8" cols="12">
        <label class="label required text-primary-text-color font-weight-bold mb-2">Select your insurance here</label>
        <v-select
          v-model="formData.data.insuranceInformation.myInsurance.value"
          :items="insuranceList"
          id="insurance"
          class="mb-2"
          placeholder="Insurance Company"
          rounded="lg"
          variant="solo"
          bg-color="input-background-color"
          density="default"
          color="primary"
          :menu-props="{ offset: 10 }"
          clearable
          tabindex="1"
          :disabled="(formData.loading)"
          :rules="[rules.required]"
        />
      </v-col>

      <v-col class="pa-0 px-4 pb-10 pt-md-4 pb-md-0 px-md-0" md="4" cols="auto" align-self="center">
        <ConsultationStep4UserInsuranceForm>
          <template v-slot:activator="{ activatorProps }">
            <v-btn v-bind="activatorProps" prepend-icon="mdi-plus" size="large" variant="text" color="primary">Add New</v-btn>
          </template>
        </ConsultationStep4UserInsuranceForm>
      </v-col>

      <v-col class="pb-0 px-4" md="8" cols="12">
        <label class="label required text-primary-text-color font-weight-bold mb-2">Select your address here</label>
        <v-select
          v-model="formData.data.address.myAddress.value"
          :items="addressList"
          id="address"
          class="mb-2"
          placeholder="Address"
          rounded="lg"
          variant="solo"
          bg-color="input-background-color"
          density="default"
          color="primary"
          :menu-props="{ offset: 10 }"
          clearable
          tabindex="2"
          :disabled="(formData.loading)"
          :rules="[rules.required]"
        />
      </v-col>

      <v-col class="pa-0 px-4 pb-10 pt-md-4 pb-md-0 px-md-0" md="4" cols="auto" align-self="center">
        <ConsultationStep4UserAddressForm>
          <template v-slot:activator="{ activatorProps }">
            <v-btn v-bind="activatorProps" prepend-icon="mdi-plus" size="large" variant="text" color="primary">Add New</v-btn>
          </template>
        </ConsultationStep4UserAddressForm>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  // Type
  import type { ConsultationType } from '@/types/form-data';

  // Model
  const formData = defineModel<ConsultationType>('formData', { required: true });

  // Special Data
  const { rules } = useValidate();

  // Static Data
  const insuranceList = [ 'AARP - 123', 'Banner Aetna - 456' ];
  
  const addressList = [ 'New York', 'Chicago' ];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>