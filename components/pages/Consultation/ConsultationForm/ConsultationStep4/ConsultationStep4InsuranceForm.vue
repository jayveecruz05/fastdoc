<template>
  <v-container class="pa-0" fluid>
    <v-row class="ma-0">
      <v-col class="pb-0 px-4" cols="12">
        <h2 class="label text-h6 text-secondary-text-color font-weight-bold">Insurance Information</h2>
      </v-col>

      <v-col class="pb-0 px-4" :md="((formData.data.insuranceInformation.haveInsurance.value === 'yes') ? 6 : 12)" cols="12">
        <label class="label required text-primary-text-color font-weight-bold mb-2">Do you have insurance?</label>
        <v-radio-group v-model="formData.data.insuranceInformation.haveInsurance.value" id="insurance" color="primary" inline :rules="[rules.required, haveInsuranceRule]">
          <v-radio class="mr-5" label="No" value="no" tabindex="1"></v-radio>
          <v-radio class="mr-5" label="Yes" value="yes" tabindex="1"></v-radio>
        </v-radio-group>
      </v-col>

      <v-expand-transition>
        <v-col v-if="(formData.data.insuranceInformation.haveInsurance.value === 'yes')" class="pb-0 px-4" md="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Are you the primary insurance member?</label>
          <v-radio-group v-model="formData.data.insuranceInformation.isPrimaryInsuranceMember.value" id="primary-insurance-member" color="primary" inline :rules="[rules.required]">
            <v-radio class="mr-5" label="No" value="no" tabindex="2"></v-radio>
            <v-radio class="mr-5" label="Yes" value="yes" tabindex="2"></v-radio>
          </v-radio-group>
        </v-col>
      </v-expand-transition>

      <v-expand-transition>
        <v-col v-if="(formData.data.insuranceInformation.haveInsurance.value === 'yes')" class="pb-0 px-4" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Insurance Company</label>
          <v-autocomplete
            v-model="formData.data.insuranceInformation.insuranceCompany.value"
            :items="insuranceCompany"
            id="insurance-company"
            class="mb-2"
            placeholder="Insurance Company"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            color="primary"
            :menu-props="{ offset: 10 }"
            clearable
            tabindex="3"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
          />
        </v-col>
      </v-expand-transition>

      <v-expand-transition>
        <v-col v-if="(formData.data.insuranceInformation.haveInsurance.value === 'yes')" class="pb-0 px-4" md="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Subscriber / Member ID</label>
          <v-text-field
            v-model="formData.data.insuranceInformation.subscriberMemberID.value"
            id="subscriber-member-id"
            class="mb-2"
            placeholder="Subscriber / Member ID"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            clearable
            tabindex="4"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
          />
        </v-col>
      </v-expand-transition>

      <v-expand-transition>
        <v-col v-if="(formData.data.insuranceInformation.haveInsurance.value === 'yes')" class="pb-0 px-4" md="6" cols="12">
          <label class="label text-primary-text-color font-weight-bold mb-2">Group Number</label>
          <v-text-field
            v-model="formData.data.insuranceInformation.groupNumber.value"
            id="group-number"
            class="mb-2"
            placeholder="Group Number"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            clearable
            tabindex="5"
            :disabled="(formData.loading)"
          />
        </v-col>
      </v-expand-transition>

      <v-expand-transition>
        <v-col v-if="(formData.data.insuranceInformation.haveInsurance.value === 'yes')" class="pb-0 px-4" md="6" cols="12">
          <p class="label text-primary-text-color font-weight-bold mb-2">Insurance ID</p>
          <label class="label text-primary-text-color mb-2">Front</label>
          <FileField v-model="formData.data.insuranceInformation.insuranceIDImage.front.value" id="insurance-id-front" image-file color="primary" tabindex="6" :disabled="(formData.loading)" />
        </v-col>
      </v-expand-transition>

      <v-expand-transition>
        <v-col v-if="(formData.data.insuranceInformation.haveInsurance.value === 'yes')" class="pb-0 px-4" md="6" cols="12">
          <p class="label d-none d-md-block text-primary-text-color font-weight-bold mb-2">&nbsp;</p>
          <label class="label text-primary-text-color mb-2">Back</label>
          <FileField v-model="formData.data.insuranceInformation.insuranceIDImage.back.value" id="insurance-id-back" image-file color="primary" tabindex="7" :disabled="(formData.loading)" />
        </v-col>
      </v-expand-transition>
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
  const insuranceCompany = [ 'AARP', 'Banner Aetna' ];
  
  // Rules
  const haveInsuranceRule = (value: any) => (value === 'yes' || 'Apologies, at the moment we can only accommodate patients with insurance coverage.');
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>