<template>
  <v-container class="pa-0" fluid>
    <v-row class="ma-0">
      <v-col class="pb-0 px-4" cols="12">
        <h2 class="label text-h6 text-secondary-text-color font-weight-bold">Personal Information</h2>
      </v-col>

      <v-col class="pb-0 px-4" md="6" cols="12">
        <label class="label required text-primary-text-color font-weight-bold mb-2">Date Of Birth</label>
        <DatePicker
          v-model="formData.data.personalInformation.birthDate.value"
          id="date-of-birth"
          min="1920/01/01"
          :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
          :view-mode="((formData.data.personalInformation.birthDate.value) ? 'month' : 'year')"
          placeholder="Date Of Birth"
          color="primary"
          clearable
          tabindex="1"
          :rules="[rules.required]"
        />
      </v-col>

      <v-col class="pb-0 px-4" md="6" cols="12">
        <label class="label required text-primary-text-color font-weight-bold mb-2" id="gender">Gender</label>
        <v-select
          v-model="formData.data.personalInformation.gender.value"
          :items="genderList"
          id="gender"
          class="mb-2"
          placeholder="Gender"
          rounded="lg"
          variant="solo"
          bg-color="input-background-color"
          color="primary"
          density="default"
          :menu-props="{ offset: 10 }"
          clearable
          tabindex="2"
          :disabled="(formData.loading)"
          :rules="[rules.required]"
        />
      </v-col>

      <v-col class="pb-0 px-4" md="6" cols="12">
        <label class="label required text-primary-text-color font-weight-bold mb-2" id="race">Race</label>
        <v-select
          v-model="formData.data.personalInformation.race.value"
          :items="raceList"
          id="race"
          class="mb-2"
          placeholder="Race"
          rounded="lg"
          variant="solo"
          bg-color="input-background-color"
          color="primary"
          density="default"
          :menu-props="{ offset: 10 }"
          clearable
          tabindex="3"
          :disabled="(formData.loading)"
          :rules="[rules.required]"
        />
      </v-col>

      <v-col class="pb-0 px-4" md="6" cols="12">
        <label class="label required text-primary-text-color font-weight-bold mb-2">Ethnicity</label>
        <v-select
          v-model="formData.data.personalInformation.ethnicity.value"
          :items="ethnicityList"
          id="ethnicity"
          class="mb-2"
          placeholder="Ethnicity"
          rounded="lg"
          variant="solo"
          bg-color="input-background-color"
          color="primary"
          density="default"
          :menu-props="{ offset: 10 }"
          clearable
          tabindex="4"
          :disabled="(formData.loading)"
          :rules="[rules.required]"
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
  const { rules } = useValidate();
  const { genderList, raceList, ethnicityList } = useCommonData();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>