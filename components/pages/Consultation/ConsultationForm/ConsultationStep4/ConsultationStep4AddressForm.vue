<template>
  <v-container class="pa-0" fluid>
    <v-row class="ma-0">
      <v-col class="pb-0 px-4" cols="12">
        <h2 class="label text-h6 text-secondary-text-color font-weight-bold">Address</h2>
      </v-col>

      <v-col class="pb-0 px-4" md="6" cols="12">
        <label class="label text-primary-text-color font-weight-bold mb-2">Home Address</label>
        <v-text-field
          v-model="formData.data.address.homeAddress.value"
          id="home-address"
          class="mb-2"
          placeholder="Home Address"
          rounded="lg"
          variant="solo"
          bg-color="input-background-color"
          density="default"
          clearable
          tabindex="1"
          :disabled="(formData.loading)"
        />
      </v-col>

      <v-col class="pb-0 px-4" md="6" cols="12">
        <label class="label text-primary-text-color font-weight-bold mb-2">Apartment, Suite, Office</label>
        <v-text-field
          v-model="formData.data.address.apartmentSuiteOffice.value"
          id="apartment-suite-office"
          class="mb-2"
          placeholder="Apartment, Suite, Office"
          rounded="lg"
          variant="solo"
          bg-color="input-background-color"
          density="default"
          clearable
          tabindex="2"
          :disabled="(formData.loading)"
        />
      </v-col>

      <v-col class="pb-0 px-4" md="4" cols="12">
        <label class="label text-primary-text-color font-weight-bold mb-2">City</label>
        <v-text-field
          v-model="formData.data.address.city.value"
          id="city"
          class="mb-2"
          placeholder="City"
          rounded="lg"
          variant="solo"
          bg-color="input-background-color"
          density="default"
          clearable
          tabindex="3"
          :disabled="(formData.loading)"
        />
      </v-col>

      <v-col class="pb-0 px-4" md="4" cols="12">
        <label class="label text-primary-text-color font-weight-bold mb-2">State</label>
        <v-autocomplete
          v-model="formData.data.address.state.value"
          :items="stateList"
          id="state"
          class="mb-2"
          placeholder="State"
          rounded="lg"
          variant="solo"
          bg-color="input-background-color"
          color="primary"
          density="default"
          :menu-props="{ offset: 10 }"
          clearable
          tabindex="4"
          :disabled="(formData.loading)"
        />
      </v-col>

      <v-col class="pb-0 px-4" md="4" cols="12">
        <label class="label text-primary-text-color font-weight-bold mb-2">Zip</label>
        <v-text-field
          v-model="formData.data.address.zip.value"
          id="zip"
          class="mb-2"
          placeholder="Zip"
          rounded="lg"
          variant="solo"
          bg-color="input-background-color"
          density="default"
          clearable
          :disabled="(formData.loading)"
          type="tel"
          tabindex="5"
          @keypress="numbersOnly"
        />
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
  const { rules, numbersOnly } = useValidate();

  // Static Data
  const stateList = [ 'New York', 'Chicago' ];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>