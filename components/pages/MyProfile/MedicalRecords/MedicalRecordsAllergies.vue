<template>
  <v-form v-model="formData.status" ref="formDataRef" @submit.prevent>
    <v-container class="pa-0" fluid>
      <v-row class="pa-4 pt-0 ma-0">
        <v-col v-if="(action.view)" class="d-flex flex-column-reverse flex-sm-row justify-end pa-4 py-2" cols="12">
          <v-btn class="flex-grow-1 flex-md-grow-0 text-primary mb-4 mb-lg-0" prepend-icon="mdi-pencil" size="large" rounded="lg" @click="handleEdit">
            <span>Edit Allergies</span>
          </v-btn>
        </v-col>

        <v-col class="pt-2 pb-4 px-4" cols="12">
          <label class="label text-primary-text-color font-weight-bold">Food Allergies</label>
          <v-container id="food-allergies" class="pa-0" fluid>
            <v-row class="ma-0">
              <v-col v-for="(allergy, index) in allergiesList" :key="`allergy-${index}`" class="pa-0" cols="auto">
                <v-checkbox v-model="formData.data.foodAllergies.value" :label="allergy" :value="allergy" class="custom-checkbox text-primary" density="comfortable" hide-details :readonly="(action.view)" />
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col class="pb-4 px-4" cols="12">
          <label class="label text-primary-text-color font-weight-bold mb-2">Other Allergies</label>
          <v-textarea v-model="formData.data.otherAllergies.value" id="other-allergies" class="mb-2" placeholder="Ex: Drugs, other food, etc..." rounded="lg" variant="solo" bg-color="input-background-color" density="default" rows="10" hide-details :readonly="(action.view)" />
        </v-col>
  
        <v-col v-if="(action.edit)" class="d-flex flex-column-reverse flex-sm-row justify-end pa-4 pb-5" cols="12">
          <v-btn class="text-primary ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" variant="elevated" @click="handleCancel">
            <span>Cancel</span>
          </v-btn>

          <v-btn class="ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" color="primary" variant="elevated" @click="handleSave">
            <span class="px-5">Save</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
  // Type
  import type { MedicalAllergiesType } from '@/types/form-data';
  
  // Static Data
  const allergiesList = ['Milk', 'Egg', 'Fish', 'Shellfish', 'Tree Nuts', 'Peanuts', 'Wheat', 'Soybean', 'Sesame'];

  // Data
  const formDataRef = ref();
  const formData = reactive<MedicalAllergiesType>({
    status: false,
    loading: false,
    notification: null,
    action: 'view',
    data: {
      foodAllergies: { value: [] },
      otherAllergies: { value: null }
    }
  });
  const action = computed(() => ({ view: (formData.action === 'view'), edit: (formData.action === 'edit') }));

  // Methods
  const handleSave = async () => {
    const { valid } = await formDataRef.value.validate();
    if (valid && formData.status) {}
  };

  const handleCancel = () => {
    formData.action = 'view';
    window.scrollTo(0, 0);
  };

  const handleEdit = () => {
    formData.action = 'edit';
    window.scrollTo(0, 0);
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>