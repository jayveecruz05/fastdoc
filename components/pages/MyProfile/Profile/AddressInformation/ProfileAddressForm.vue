<template>
  <v-form v-model="formData.status" ref="formDataRef" @submit.prevent>
    <v-container class="pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="py-0 px-4" cols="12">
          <v-switch v-model="formData.data.isPrimary.value" label="Set as primary" inset base-color="primary-text-color" color="primary" hide-details tabindex="1" />
        </v-col>

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
            tabindex="2"
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
            tabindex="3"
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
            tabindex="4"
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
            tabindex="5"
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
            tabindex="6"
            :disabled="(formData.loading)"
            type="tel"
            @keypress="numbersOnly"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col class="d-flex flex-column-reverse flex-sm-row justify-end pa-4 pb-5" cols="12">
          <v-btn v-if="(props.data)" class="ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" prepend-icon="mdi-delete" color="red-lighten-1" variant="elevated" tabindex="7" @click="handleRemove">
            <span>Remove</span>
          </v-btn>

          <v-btn class="text-primary ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" variant="elevated" tabindex="8" @click="handleCancel">
            <span>Cancel</span>
          </v-btn>

          <v-btn class="ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" color="primary" variant="elevated" tabindex="9" @click="handleSave">
            <span class="px-5">Save</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
  // Type
  import type { AddressCreationType } from '@/types/form-data';
  
  type Props = { data?: { [key: string]: any; } | null };

  // Props
  const props = withDefaults(defineProps<Props>(), { data: null });

  // Emits
  const emit = defineEmits([ 'cancel' ]);
  
  // Special Data
  const { rules, numbersOnly } = useValidate();

  // Static Data
  const stateList = [ 'New York', 'Chicago' ];

  // Data
  const formDataRef = ref();
  const formData = reactive<AddressCreationType>({
    status: false,
    loading: false,
    notification: null,
    data: {
      isPrimary: { value: props.data?.isPrimary || null },
      homeAddress: { value: props.data?.homeAddress || null },
      apartmentSuiteOffice: { value: props.data?.apartmentSuiteOffice || null },
      city: { value: props.data?.city || null },
      state: { value: props.data?.state || null },
      zip: { value: props.data?.zip || null }
    }
  });

  // Watcher
  watch(() => (props.data), (to) => {
    const { isPrimary, homeAddress, apartmentSuiteOffice, city, state, zip } = to || {};
    formData.data = {
      isPrimary: { value: isPrimary || null },
      homeAddress: { value: homeAddress || null },
      apartmentSuiteOffice: { value: apartmentSuiteOffice || null },
      city: { value: city || null },
      state: { value: state || null },
      zip: { value: zip || null }
    };
  }, { flush: 'post' });

  // Methods
  const handleSave = async () => {
    const { valid } = await formDataRef.value.validate();
    if (valid && formData.status) {}
  };

  const handleCancel = () => {
    emit('cancel');
  };

  const handleRemove = () => {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>