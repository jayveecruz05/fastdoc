<template>
  <v-form v-model="formData.status" ref="formDataRef" @submit.prevent>
    <v-container class="pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="py-0 px-4" cols="12">
          <v-switch v-model="formData.data.isPrimary.value" label="Set as primary" inset base-color="primary-text-color" color="primary" hide-details tabindex="1" />
        </v-col>

        <v-col class="pb-0 px-4" md="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Are you the primary insurance member?</label>
          <v-radio-group v-model="formData.data.isPrimaryInsuranceMember.value" id="insurance-member" color="primary" inline :rules="[rules.required]">
            <v-radio class="mr-5" label="No" value="no" tabindex="2"></v-radio>
            <v-radio class="mr-5" label="Yes" value="yes" tabindex="2"></v-radio>
          </v-radio-group>
        </v-col>
        
        <v-col class="pb-0 px-4" md="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Insurance Company</label>
          <v-autocomplete
            v-model="formData.data.insuranceCompany.value"
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
        
        <v-col class="pb-0 px-4" md="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Subscriber / Member ID</label>
          <v-text-field
            v-model="formData.data.subscriberMemberID.value"
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
        
        <v-col class="pb-0 px-4" md="6" cols="12">
          <label class="label text-primary-text-color font-weight-bold mb-2">Group Number</label>
          <v-text-field
            v-model="formData.data.groupNumber.value"
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
          
        <v-col class="pb-0 px-4" lg="6" cols="12">
          <p class="label text-primary-text-color font-weight-bold mb-2">Insurance ID</p>
          <label class="label text-primary-text-color mb-2">Front</label>
          <FileField v-model="formData.data.insuranceIDImage.front.value" id="insurance-id-front" image-file color="primary" tabindex="6" :disabled="(formData.loading)" />
        </v-col>

        <v-col class="pb-0 px-4" lg="6" cols="12">
          <p class="label d-none d-md-block text-primary-text-color font-weight-bold mb-2">&nbsp;</p>
          <label class="label text-primary-text-color mb-2">Back</label>
          <FileField v-model="formData.data.insuranceIDImage.back.value" id="insurance-id-back" image-file color="primary" tabindex="7" :disabled="(formData.loading)" />
        </v-col>

        <v-col class="d-flex flex-column-reverse flex-sm-row justify-end pa-4 pb-5" cols="12">
          <v-btn v-if="(props.data)" class="ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" prepend-icon="mdi-delete" color="red-lighten-1" variant="elevated" tabindex="8" @click="handleRemove">
            <span>Remove</span>
          </v-btn>

          <v-btn class="text-primary ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" variant="elevated" tabindex="9" @click="handleCancel">
            <span>Cancel</span>
          </v-btn>

          <v-btn class="ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" color="primary" variant="elevated" tabindex="10" @click="handleSave">
            <span class="px-5">Save</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
  // Type
  import type { InsuranceCreationType } from '@/types/form-data';
  
  type Props = { data?: { [key: string]: any; } | null };

  // Props
  const props = withDefaults(defineProps<Props>(), { data: null });

  // Emits
  const emit = defineEmits([ 'cancel' ]);
  
  // Special Data
  const { rules } = useValidate();

  // Static Data
  const insuranceCompany = [ 'AARP', 'Banner Aetna' ];

  // Data
  const formDataRef = ref();
  const formData = reactive<InsuranceCreationType>({
    status: false,
    loading: false,
    notification: null,
    data: {
      isPrimary: { value: props.data?.isPrimary || null },
      isPrimaryInsuranceMember: { value: props.data?.isPrimaryInsuranceMember || null },
      insuranceCompany: { value: props.data?.insuranceCompany || null },
      subscriberMemberID: { value: props.data?.subscriberMemberID || null },
      groupNumber: { value: props.data?.groupNumber || null },
      insuranceIDImage: {
        front: { value: props.data?.insuranceIDImage?.front || null },
        back: { value: props.data?.insuranceIDImage?.back || null }
      }
    }
  });

  // Watcher
  watch(() => (props.data), (to) => {
    const { isPrimary, isPrimaryInsuranceMember, insuranceCompany, subscriberMemberID, groupNumber, insuranceIDImage } = to || {};
    formData.data = {
      isPrimary: { value: isPrimary || null },
      isPrimaryInsuranceMember: { value: isPrimaryInsuranceMember || null },
      insuranceCompany: { value: insuranceCompany || null },
      subscriberMemberID: { value: subscriberMemberID || null },
      groupNumber: { value: groupNumber || null },
      insuranceIDImage: {
        front: { value: insuranceIDImage?.front || null },
        back: { value: insuranceIDImage?.back || null }
      }
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