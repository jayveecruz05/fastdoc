<template>
  <v-dialog v-model="dialog" :max-width="((mobileOrTabletView) ? 'auto' : 1024)" transition="slide-y-reverse-transition" scrollable persistent :fullscreen="mobileOrTabletView">
    <template v-slot:activator="{ props: activatorProps }">
      <slot name="activator" v-bind="{ activatorProps }">
        <v-btn v-bind="activatorProps" prepend-icon="mdi-plus" size="large" variant="text" color="primary">Add New</v-btn>
      </slot>
    </template>

    <v-card class="pa-4" rounded="lg" color="primary-background">
      <v-card-title tag="h2" class="d-flex align-center text-secondary-text-color">
        <v-icon size="30" icon="mdi-map-marker" />
        <span class="px-2">Address</span>
      </v-card-title>

      <v-card-text class="pa-0">
        <v-form v-model="formData.status" ref="formDataRef" @submit.prevent>
          <v-container class="pa-0" fluid>
            <v-row class="ma-0">
              <v-col class="pb-0 px-4" md="6" cols="12">
                <label class="label required text-primary-text-color font-weight-bold mb-2">Home Address</label>
                <v-text-field
                  v-model="formData.data.homeAddress.value"
                  id="home-address"
                  class="mb-2"
                  placeholder="Home Address"
                  rounded="lg"
                  variant="solo"
                  bg-color="input-background-color"
                  density="default"
                  clearable
                  tabindex="3"
                  :disabled="(formData.loading)"
                  :rules="[rules.required]"
                />
              </v-col>

              <v-col class="pb-0 px-4" md="6" cols="12">
                <label class="label required text-primary-text-color font-weight-bold mb-2">Apartment, Suite, Office</label>
                <v-text-field
                  v-model="formData.data.apartmentSuiteOffice.value"
                  id="apartment-suite-office"
                  class="mb-2"
                  placeholder="Apartment, Suite, Office"
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

              <v-col class="pb-0 px-4" md="4" cols="12">
                <label class="label required text-primary-text-color font-weight-bold mb-2">City</label>
                <v-text-field
                  v-model="formData.data.city.value"
                  id="city"
                  class="mb-2"
                  placeholder="City"
                  rounded="lg"
                  variant="solo"
                  bg-color="input-background-color"
                  density="default"
                  clearable
                  tabindex="5"
                  :disabled="(formData.loading)"
                  :rules="[rules.required]"
                />
              </v-col>

              <v-col class="pb-0 px-4" md="4" cols="12">
                <label class="label required text-primary-text-color font-weight-bold mb-2">State</label>
                <v-autocomplete
                  v-model="formData.data.state.value"
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
                  tabindex="6"
                  :disabled="(formData.loading)"
                  :rules="[rules.required]"
                />
              </v-col>

              <v-col class="pb-0 px-4" md="4" cols="12">
                <label class="label required text-primary-text-color font-weight-bold mb-2">Zip</label>
                <v-text-field
                  v-model="formData.data.zip.value"
                  id="zip"
                  class="mb-2"
                  placeholder="Zip"
                  rounded="lg"
                  variant="solo"
                  bg-color="input-background-color"
                  density="default"
                  clearable
                  tabindex="7"
                  :disabled="(formData.loading)"
                  type="tel"
                  @keypress="numbersOnly"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions class="d-flex flex-column-reverse flex-sm-row pt-4 px-4">
        <v-spacer />
        
        <v-btn class="w-100 w-sm-auto text-primary" rounded="lg" size="large" tabindex="8" @click="handleCancel">
          <span class="px-5">Cancel</span>
        </v-btn>

        <v-btn class="w-100 w-sm-auto ma-0 mb-2 mx-0 mb-sm-0 ml-sm-2" rounded="lg" size="large" color="primary" variant="elevated" tabindex="9" @click="handleSave">
          <span class="px-5">Save</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  // Type
  import type { AddressCreationType } from '@/types/form-data';

  // Special Data
  const { mobileOrTabletView } = useViewPort();
  const { rules, numbersOnly } = useValidate();

  // Static Data
  const stateList = [ 'New York', 'Chicago' ];

  // Data
  const dialog = ref<boolean>(false);
  const formDataRef = ref();
  const formData = reactive<AddressCreationType>({
    status: false,
    loading: false,
    notification: null,
    data: {
      isPrimary: { value: null },
      homeAddress: { value: null },
      apartmentSuiteOffice: { value: null },
      city: { value: null },
      state: { value: null },
      zip: { value: null }
    }
  });

  // Methods
  const resetForm = () => {
    formDataRef.value.resetValidation();
    formData.data = {
      isPrimary: { value: null },
      homeAddress: { value: null },
      apartmentSuiteOffice: { value: null },
      city: { value: null },
      state: { value: null },
      zip: { value: null }
    };
  };

  const handleCancel = () => {
    dialog.value = false;
    resetForm();
  };

  const handleSave = async () => {
    const { valid } = await formDataRef.value.validate();
    if (valid && formData.status) {
      dialog.value = false;
      resetForm();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>