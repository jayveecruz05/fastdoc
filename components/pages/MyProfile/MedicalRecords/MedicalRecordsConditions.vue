<template>
  <v-form v-model="formData.status" ref="formDataRef" @submit.prevent>
    <v-container class="pa-0" fluid>
      <v-row class="pa-4 pt-0 ma-0">
        <v-col v-if="(action.view)" class="d-flex flex-column-reverse flex-sm-row justify-end pa-4 py-2" cols="12">
          <v-btn class="flex-grow-1 flex-md-grow-0 text-primary mb-4 mb-lg-0" prepend-icon="mdi-pencil" size="large" rounded="lg" @click="handleEdit">
            <span>Edit Conditions</span>
          </v-btn>
        </v-col>

        <v-col class="pt-2 px-2" cols="12">
          <label class="label text-primary-text-color font-weight-bold mx-2">Medical Conditions</label>
          <v-container id="medical-conditions" class="pa-0" fluid>
            <v-row class="ma-0">
              <v-col v-for="(item, index) in formData.data.conditions.value" :key="`item-${index}`" class="pt-2 pb-4 px-2" cols="12">
                <v-container class="border-md border-primary border-opacity-100 rounded-lg pa-3" fluid>
                  <v-row class="ma-0">
                    <v-col class="flex-grow-1 pa-0" md="auto" cols="12">
                      <v-container class="pa-0" fluid>
                        <v-row class="ma-0">
                          <template v-for="(condition, key) in item" :key="`condition-${key}`">
                            <v-col v-if="(key === 'remarks')" class="pb-2 px-2" cols="12">
                              <v-textarea v-model="formData.data.conditions.value[index][key]" class="mb-2" :placeholder="placeHolderList[key]" rounded="lg" variant="solo" bg-color="input-background-color" density="default" rows="5" :tabindex="(index + 1)" :disabled="(formData.loading)" :readonly="(action.view)" hide-details />
                            </v-col>
                            <v-col v-else class="pb-0 px-2" md="6" cols="12">
                              <v-text-field v-model="formData.data.conditions.value[index][key]" class="mb-2" :placeholder="placeHolderList[key]" rounded="lg" variant="solo" bg-color="input-background-color" density="default" :clearable="(action.edit)" :tabindex="(index + 1)" :disabled="(formData.loading)" :readonly="(action.view)" hide-details />
                            </v-col>
                          </template>
                        </v-row>
                      </v-container>
                    </v-col>

                    <v-col v-if="(action.edit)" class="d-flex justify-end pa-0 px-2 px-sm-0" md="auto" cols="12" align-self="center">
                      <v-btn class="text-red-lighten-1 ma-0" icon="mdi-delete" variant="text" :tabindex="(index + 1)" @click="() => { handleDeleteCondition(index); }" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>

              <v-col v-if="(action.edit)" class="d-flex justify-end py-0 px-2" cols="12">
                <v-btn class="text-primary ma-0" prepend-icon="mdi-plus" size="large" variant="text" :tabindex="(formData.data.conditions.value.length)" @click="handleAddCondition">Add New</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
  
        <v-col v-if="(action.edit)" class="d-flex flex-column-reverse flex-sm-row justify-end pa-4 pb-5" cols="12">
          <v-btn class="text-primary ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" variant="elevated" :tabindex="(formData.data.conditions.value.length)" @click="handleCancel">
            <span>Cancel</span>
          </v-btn>

          <v-btn class="ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" color="primary" variant="elevated" :tabindex="(formData.data.conditions.value.length)" @click="handleSave">
            <span class="px-5">Save</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
  // Type
  import type { MedicalConditionsType } from '@/types/form-data';
  
  // Static Data
  const placeHolderList = { name: 'Condition Name', year: 'Year Diagnosed', remarks: 'Remarks' };

  // Data
  const formDataRef = ref();
  const formData = reactive<MedicalConditionsType>({
    status: false,
    loading: false,
    notification: null,
    action: 'view',
    data: {
      conditions: { value: [ { name: '', year: '', remarks: '' } ] }
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

  const handleAddCondition = () => {
    formData.data.conditions.value.push({ name: '', year: '', remarks: '' });
  };

  const handleDeleteCondition = (index: number) => {
    if (formData.data.conditions.value.length === 1) {
      formData.data.conditions.value = [ { name: '', year: '', remarks: '' } ];
    } else {
      formData.data.conditions.value.splice(index, 1);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>