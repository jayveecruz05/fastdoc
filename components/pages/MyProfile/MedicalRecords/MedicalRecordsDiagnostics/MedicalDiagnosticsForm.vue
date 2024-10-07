<template>
  <v-form v-model="formData.status" ref="formDataRef" @submit.prevent>
    <v-container class="pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="pb-0 px-4" md="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Laboratory</label>
          <v-text-field
            v-model="formData.data.laboratory.value"
            id="laboratory"
            class="mb-2"
            placeholder="Laboratory"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            clearable
            tabindex="1"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col class="pb-0 px-4" md="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Date</label>
          <DatePicker
            v-model="formData.data.date.value"
            id="date"
            min="1920/01/01"
            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
            :view-mode="((formData.data.date.value) ? 'month' : 'year')"
            placeholder="Date"
            color="primary"
            clearable
            tabindex="2"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
          />
        </v-col>
        
        <v-col class="pb-0 px-4" md="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Request For</label>
          <v-text-field
            v-model="formData.data.requestFor.value"
            id="request-for"
            class="mb-2"
            placeholder="Request For"
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
          <label class="label required text-primary-text-color font-weight-bold mb-2">Request By</label>
          <v-text-field
            v-model="formData.data.requestBy.value"
            id="request-by"
            class="mb-2"
            placeholder="Request By"
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

        <v-col class="pb-0 px-4" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Findings</label>
          <v-textarea v-model="formData.data.findings.value" id="findings" class="mb-2" placeholder="Findings" rounded="lg" variant="solo" bg-color="input-background-color" density="default" rows="10" tabindex="5" :rules="[rules.required]" />
        </v-col>
          
        <v-col class="pb-0 px-4" cols="12">
          <label class="label text-primary-text-color font-weight-bold mb-2">Attachments</label>
          <FileField v-model="formData.data.files.value" id="attachments" color="primary" multiple height="200px" tabindex="6" :disabled="(formData.loading)" />
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
  import type { DiagnosticsCreationType } from '@/types/form-data';
  
  type Props = { data?: { [key: string]: any; } | null };

  // Props
  const props = withDefaults(defineProps<Props>(), { data: null });

  // Emits
  const emit = defineEmits([ 'cancel' ]);
  
  // Special Data
  const { rules } = useValidate();

  // Data
  const formDataRef = ref();
  const formData = reactive<DiagnosticsCreationType>({
    status: false,
    loading: false,
    notification: null,
    data: {
      laboratory: { value: props.data?.laboratory || null },
      date: { value: ((!isNaN(Date.parse(props?.data?.date))) ? new Date(props?.data?.date) : null) },
      requestFor: { value: props.data?.requestFor || null },
      requestBy: { value: props.data?.requestBy || null },
      findings: { value: props.data?.findings || null },
      files: { value: ((props?.data?.files) ? { model: props?.data?.files.map((name: string) => ({ name })), content: props?.data?.files?.toLocaleString()?.replace(/,/ig, ', ') } : null) }
    }
  });

  // Watcher
  watch(() => (props.data), (to) => {
    const { laboratory, date, requestFor, requestBy, findings, files } = to || {};
    formData.data = {
      laboratory: { value: laboratory || null },
      date: { value: ((!isNaN(Date.parse(date))) ? new Date(date) : null) },
      requestFor: { value: requestFor || null },
      requestBy: { value: requestBy || null },
      findings: { value: findings || null },
      files: { value: ((files) ? { model: files.map((name: string) => ({ name })), content: files?.toLocaleString()?.replace(/,/ig, ', ') } : null) }
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