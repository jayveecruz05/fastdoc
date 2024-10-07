<template>
  <v-container class="main-container rounded-lg pa-0" fluid>
    <v-row class="ma-0">
      <v-col class="pa-0 pt-2 px-3" cols="12">
        <v-container class="pa-0" fluid>
          <v-row class="ma-0">
            <v-col class="text-left pa-0" md="7" cols="12">
              <p class="pb-1">
                <span class="text-body-1 text-capitalize font-weight-bold text-primary">Patient:</span>
                <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.patient }}</span>
              </p>
              <p class="pb-1">
                <span class="text-body-1 text-capitalize font-weight-bold text-primary">Issued By:</span>
                <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.issuedBy }}</span>
              </p>
              <p class="pb-1">
                <span class="text-body-1 text-capitalize font-weight-bold text-primary">S/N:</span>
                <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.snNumber }}</span>
              </p>
            </v-col>

            <v-col class="text-left text-sm-right pa-0" md="5" cols="12">
              <p class="pb-1">
                <span class="text-body-1 text-capitalize font-weight-bold text-primary">Date Issued:</span>
                <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ getFullDate(data.issuedDate) }}</span>
              </p>
              <p class="pb-1">
                <span class="text-body-1 text-capitalize font-weight-bold text-primary">Expiry Date:</span>
                <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ getFullDate(data.expiryDate) }}</span>
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col v-for="(medication) in data.medications" :key="`medication-${medication.id}`" class="medication-wrapper d-flex" sm="6" cols="12">
        <v-card class="flex-grow-1" rounded="lg" color="primary" variant="outlined">
          <v-card-text>
            <template v-for="(value, key) in medication" :key="`item-${medication.id}`">
              <p v-if="(key !== 'id')" class="pb-1">
                <span class="text-body-1 text-capitalize font-weight-bold text-secondary-text-color">{{ key }}:</span>
                <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ value }}</span>
              </p>
            </template>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="d-flex flex-column flex-sm-row justify-end pa-3 py-5" cols="12">
        <v-tooltip text="Order via CVS" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="text-primary ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" prepend-icon="mdi-heart" rounded="lg" size="large" variant="elevated">Order via CVS</v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Download Prescription" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="text-primary ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" prepend-icon="mdi-prescription" rounded="lg" size="large" variant="elevated">Download</v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Back" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" color="primary" variant="elevated" @click="handleBack">Back</v-btn>
          </template>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  // Type
  type PropsType = {
    data: {
      id: string | number;
      issuedBy: string;
      issuedDate: string;
      expiryDate: string;
      patient: string;
      snNumber: string;
      medications: [{ [key: string]: any; }];
    };
  };

  // Props
  withDefaults(defineProps<PropsType>(), {
    data: () => ({
      id: '',
      issuedBy: '',
      issuedDate: '',
      expiryDate: '',
      patient: '',
      snNumber: '',
      medications: [{}]
    })
  });

  // Emits
  const emit = defineEmits([ 'back' ]);

  // Special Data
  const { getFullDate } = useDate();

  // Methods
  const handleBack = () => {
    emit('back');
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .medication-wrapper {
    flex-grow: 1;
    max-width: 100%;
  }
</style>