<template>
  <v-container class="pa-0" fluid>
    <v-expand-transition>
      <v-container v-if="(!viewedData)" class="pa-0" fluid>
        <v-row class="pa-4 pt-0 pb-5 ma-0">
          <v-col v-for="(data) in medicationList" :key="`medication-${data.id}`" cols="12">
            <v-card class="d-flex flex-column align-start text-left" rounded="lg" color="tertiary-background" variant="flat" hover @click="() => { handleViewData(data); }">
              <v-container class="pa-4 pb-3 px-5" fluid>
                <v-row class="ma-0">
                  <v-col class="text-left pa-0" md="6" cols="12">
                    <p class="pb-1">
                      <span class="text-body-1 text-capitalize font-weight-bold text-primary">Patient:</span>
                      <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.patient }}</span>
                    </p>
                    <p class="pb-1">
                      <span class="text-body-1 text-capitalize font-weight-bold text-primary">Issued By:</span>
                      <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.issuedBy }}</span>
                    </p>
                  </v-col>
                  <v-col class="text-left text-md-right pa-0" md="6" cols="12">
                    <p class="pb-1">
                      <span class="text-body-1 text-capitalize font-weight-bold text-primary">Issued Date:</span>
                      <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ getFullDate(data.issuedDate) }}</span>
                    </p>
                    <p class="pb-1">
                      <span class="text-body-1 text-capitalize font-weight-bold text-primary">Expiry Date:</span>
                      <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ getFullDate(data.expiryDate) }}</span>
                    </p>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-expand-transition>

    <v-expand-transition>
      <v-container v-if="(!!viewedData)" class="pa-0" fluid>
        <v-row class="pa-4 pt-0 ma-0">
          <v-col class="pa-0" cols="12">
            <MedicationRecords :data="viewedData" @back="() => { handleViewData(null); }" />
          </v-col>
        </v-row>
      </v-container>
    </v-expand-transition>
  </v-container>
</template>

<script lang="ts" setup>
  // Special Data
  const { getFullDate } = useDate();

  // Static Data
  const medicationList = [
    { id: 1, issuedBy: 'Dr. Lisa Parker', issuedDate: '2024/01/01', expiryDate: '2024/02/01', patient: 'John Doe', snNumber: '123456789', medications: [{ id: 1, name: '(Galvus) Vildagliptin 50mg', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }, { id: 2, name: '(Besprin) Aspirin 100mg', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }, { id: 3, name: '(Duodart) Dutasteride + Tamsulosin HCI 0.5/0.4mg', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }, { id: 4, name: '(Plavix) Clopidogrel 75mg	', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }] },
    { id: 2, issuedBy: 'Dr. Lisa Parker', issuedDate: '2024/01/01', expiryDate: '2024/02/01', patient: 'John Doe', snNumber: '123456789', medications: [{ id: 1, name: '(Galvus) Vildagliptin 50mg', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }, { id: 2, name: '(Besprin) Aspirin 100mg', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }, { id: 3, name: '(Duodart) Dutasteride + Tamsulosin HCI 0.5/0.4mg', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }] },
    { id: 3, issuedBy: 'Dr. Lisa Parker', issuedDate: '2024/01/01', expiryDate: '2024/02/01', patient: 'John Doe', snNumber: '123456789', medications: [{ id: 1, name: '(Galvus) Vildagliptin 50mg', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }, { id: 2, name: '(Besprin) Aspirin 100mg', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }] },
    { id: 4, issuedBy: 'Dr. Lisa Parker', issuedDate: '2024/01/01', expiryDate: '2024/02/01', patient: 'John Doe', snNumber: '123456789', medications: [{ id: 1, name: '(Galvus) Vildagliptin 50mg', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }] },
    { id: 5, issuedBy: 'Dr. Lisa Parker', issuedDate: '2024/01/01', expiryDate: '2024/02/01', patient: 'John Doe', snNumber: '123456789', medications: [{ id: 1, name: '(Galvus) Vildagliptin 50mg', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }, { id: 2, name: '(Besprin) Aspirin 100mg', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }] },
    { id: 6, issuedBy: 'Dr. Lisa Parker', issuedDate: '2024/01/01', expiryDate: '2024/02/01', patient: 'John Doe', snNumber: '123456789', medications: [{ id: 1, name: '(Galvus) Vildagliptin 50mg', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }, { id: 2, name: '(Besprin) Aspirin 100mg', dosage: '1 Tablet', frequency: '1 Daily', duration: '12 Weeks' }] }
  ];

  // Data
  const viewedData = ref<any>(null);

  // Methods
  const handleViewData = (data: any) => {
    viewedData.value = data;
    window.scrollTo(0, 0);
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>