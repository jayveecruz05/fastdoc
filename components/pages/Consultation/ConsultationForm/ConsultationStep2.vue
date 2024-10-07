<template>
  <v-container id="consultation-step-2" class="pa-0" fluid>
    <v-row class="ma-0">
      <v-col class="py-5 px-4" cols="12">
        <p class="text-body-2 font-weight-bold text-uppercase text-secondary-text-color">Step 2</p>
        <h2 class="text-h6 font-weight-bold text-primary pb-4">Your Symptoms</h2>
        <v-divider class="border-opacity-100" thickness="4" color="tertiary"/>
      </v-col>

      <v-col class="pa-0" cols="12">
        <v-container class="pa-0" fluid>
          <v-row class="ma-0">
            <v-col class="pb-0 px-4" cols="12">
              <p class="label text-primary-text-color mb-2">Tell us the reason for this visit. You can enter all your symptoms below</p>
              <label class="label required text-primary-text-color font-weight-bold mb-2">Symptoms</label>
              <v-combobox
                v-model="formData.data.symptoms.value"
                :items="symptomsList"
                id="symptoms"
                class="mb-2"
                placeholder="Symptoms"
                rounded="lg"
                variant="solo"
                bg-color="input-background-color"
                density="default"
                multiple
                chips
                closable-chips
                hide-selected
                :menu-props="{ offset: 10 }"
                clearable
                tabindex="1"
                :disabled="(formData.loading)"
                :rules="[rules.required, rules.requiredList]"
              >
                <template v-slot:chip="{ item, props }">
                  <v-chip v-bind="props" variant="flat" size="small" color="chip-color">{{ item.title }}</v-chip>
                </template>
              </v-combobox>

              <label class="label text-primary-text-color">Or choose from the top reasons below</label>
              <v-container class="pa-0" fluid>
                <v-row class="ma-0">
                  <v-col v-for="(symptom, index) in symptomsList" :key="`symptom-${index}`" class="pa-0" cols="auto">
                    <v-checkbox v-model="formData.data.symptoms.value" :label="symptom" :value="symptom" class="custom-checkbox text-primary" density="comfortable" hide-details tabindex="2" />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <v-col class="pb-0 px-4" cols="12">
              <label class="label required text-primary-text-color font-weight-bold mb-2">Do you have a thermometer?</label>
              <v-radio-group v-model="formData.data.thermometer.value" id="thermometer" color="primary" inline :rules="[rules.required]">
                <v-radio class="mr-5" label="No" value="no" tabindex="3" />
                <v-radio class="mr-5" label="Yes" value="yes" tabindex="3" />
              </v-radio-group>
            </v-col>

            <v-expand-transition>
              <v-col v-if="(formData.data.thermometer.value === 'yes')" class="pb-0 px-4" sm="6" md="6" cols="12">
                <label class="label required text-primary-text-color font-weight-bold mb-2">Temperature</label>
                <v-text-field
                  v-model="formData.data.temperature.value"
                  id="temperature"
                  class="mb-2"
                  placeholder="Temperature"
                  rounded="lg"
                  variant="solo"
                  bg-color="input-background-color"
                  density="default"
                  type="number"
                  clearable
                  tabindex="4"
                  :disabled="(formData.loading)"
                  :rules="[rules.required]"
                >
                  <template v-slot:append-inner>
                    <span class="font-weight-bold text-primary px-2">&#8457;</span>
                  </template>
                </v-text-field>
              </v-col>
            </v-expand-transition>

            <v-expand-transition>
              <v-col v-if="(formData.data.thermometer.value === 'yes')" class="pb-0 px-4" sm="6" md="6" cols="12">
                <label class="label required text-primary-text-color font-weight-bold mb-2">Where was the temperature taken?</label>
                <v-select
                  v-model="formData.data.temperatureLocation.value"
                  :items="temperatureLocationList"
                  id="temperature-taken"
                  class="mb-2"
                  placeholder="Where was the temperature taken?"
                  rounded="lg"
                  variant="solo"
                  bg-color="input-background-color"
                  color="primary"
                  density="default"
                  :menu-props="{ offset: 10 }"
                  clearable
                  tabindex="5"
                  :disabled="(formData.loading)"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-expand-transition>

            <v-col class="pb-0 px-4" cols="12">
              <label class="label required text-primary-text-color font-weight-bold mb-2">Have you traveled anywhere in the past 2 weeks?</label>
              <v-radio-group v-model="formData.data.traveled.value" id="traveled" color="primary" inline :rules="[rules.required]">
                <v-radio class="mr-5" label="No" value="no" tabindex="6" />
                <v-radio class="mr-5" label="Yes" value="yes" tabindex="6" />
              </v-radio-group>
            </v-col>

            <v-expand-transition>
              <v-col v-if="(formData.data.traveled.value === 'yes')" class="pb-0 px-4" sm="6" md="6" cols="12">
                <label class="label required text-primary-text-color font-weight-bold mb-2">Travel Location</label>
                <v-text-field
                  v-model="formData.data.travelLocation.value"
                  id="travel-location"
                  class="mb-2"
                  placeholder="Travel Location"
                  rounded="lg"
                  variant="solo"
                  bg-color="input-background-color"
                  density="default"
                  clearable
                  tabindex="7"
                  :disabled="(formData.loading)"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-expand-transition>

            <v-expand-transition>
              <v-col v-if="(formData.data.traveled.value === 'yes')" class="pb-0 px-4" sm="6" md="6" cols="12">
                <label class="label required text-primary-text-color font-weight-bold mb-2">Mode Of Transport</label>
                <v-select
                  v-model="formData.data.modeOfTransport.value"
                  :items="transportList"
                  id="mode-of-transport"
                  class="mb-2"
                  placeholder="Mode Of Transport"
                  rounded="lg"
                  variant="solo"
                  bg-color="input-background-color"
                  color="primary"
                  density="default"
                  :menu-props="{ offset: 10 }"
                  clearable
                  tabindex="8"
                  :disabled="(formData.loading)"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-expand-transition>
          </v-row>
        </v-container>
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
  const { temperatureLocationList, transportList } = useCommonData();

  // Static Data
  const symptomsList = ['Back Pain', 'Soreness', 'Fever', 'Fatigue', 'Cough', 'Headache', 'Nausea', 'Vomiting', 'Diarrhea', 'Dizziness', 'Shortness Of Breath', 'Rashes'];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>