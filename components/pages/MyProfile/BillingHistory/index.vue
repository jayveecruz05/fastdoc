<template>
  <ProfileLayout>
    <v-container class="pa-0" fluid>
      <v-expand-transition>
        <v-container v-if="(!viewedData)" class="pa-0" fluid>
          <v-row class="pa-4 pb-5 ma-0">
            <v-col class="pb-1" cols="12">
              <p class="text-body-1 text-capitalize font-weight-bold text-secondary-text-color">Billing History:</p>
            </v-col>

            <v-col v-for="(data) in medicationList" :key="`medication-${data.id}`" cols="12">
              <v-card class="d-flex flex-column align-start text-left" rounded="lg" color="tertiary-background" variant="flat" hover @click="() => { handleViewData(data); }">
                <v-container class="pa-4 pb-3 px-5" fluid>
                  <v-row class="ma-0">
                    <v-col class="text-left pa-0" md="6" cols="12">
                      <p class="pb-1">
                        <span class="text-body-1 text-capitalize font-weight-bold text-primary">Claim Number:</span>
                        <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.claimNumber }}</span>
                      </p>
                      <p class="pb-1">
                        <span class="text-body-1 text-capitalize font-weight-bold text-primary">Claim Status:</span>
                        <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.status }}</span>
                      </p>
                    </v-col>
                    <v-col class="text-left text-md-right pa-0" md="6" cols="12">
                      <p class="pb-1">
                        <span class="text-body-1 text-capitalize font-weight-bold text-primary">Date Of Service:</span>
                        <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ getFullDate(data.dateOfService) }}</span>
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
          <v-row class="pa-4 pt-5 ma-0">
            <v-col class="pa-0" cols="12">
              <BillingHistoryView :data="viewedData" @back="() => { handleViewData(null); }" />
            </v-col>
          </v-row>
        </v-container>
      </v-expand-transition>
    </v-container>
  </ProfileLayout>
</template>

<script lang="ts" setup>
  // Special Data
  const { getFullDate } = useDate();

  // Static Data
  const medicationList = [
    { id: 1, claimNumber: '123456789', status: 'pending', dateOfService: '2024/01/01', dateReceived: '2024/02/01', insurance: 'AARP', insuranceAddress: '554 St. Florida, 12345', subscriberName: 'John Doe', address: '123 ABC Drive, NY New York 10001', memberID: '123456789', groupName: 'Group 1', providerDetails: { name: 'Dr. Lisa Parker', specialization: 'geriatrician', address: '321 Brooklyn New York 10001' } },
    { id: 2, claimNumber: '123456789', status: 'pending', dateOfService: '2024/01/01', dateReceived: '2024/02/01', insurance: 'AARP', insuranceAddress: '554 St. Florida, 12345', subscriberName: 'John Doe', address: '123 ABC Drive, NY New York 10001', memberID: '123456789', groupName: 'Group 1', providerDetails: { name: 'Dr. Lisa Parker', specialization: 'geriatrician', address: '321 Brooklyn New York 10001' } },
    { id: 3, claimNumber: '123456789', status: 'pending', dateOfService: '2024/01/01', dateReceived: '2024/02/01', insurance: 'AARP', insuranceAddress: '554 St. Florida, 12345', subscriberName: 'John Doe', address: '123 ABC Drive, NY New York 10001', memberID: '123456789', groupName: 'Group 1', providerDetails: { name: 'Dr. Lisa Parker', specialization: 'geriatrician', address: '321 Brooklyn New York 10001' } },
    { id: 4, claimNumber: '123456789', status: 'pending', dateOfService: '2024/01/01', dateReceived: '2024/02/01', insurance: 'AARP', insuranceAddress: '554 St. Florida, 12345', subscriberName: 'John Doe', address: '123 ABC Drive, NY New York 10001', memberID: '123456789', groupName: 'Group 1', providerDetails: { name: 'Dr. Lisa Parker', specialization: 'geriatrician', address: '321 Brooklyn New York 10001' } },
    { id: 5, claimNumber: '123456789', status: 'pending', dateOfService: '2024/01/01', dateReceived: '2024/02/01', insurance: 'AARP', insuranceAddress: '554 St. Florida, 12345', subscriberName: 'John Doe', address: '123 ABC Drive, NY New York 10001', memberID: '123456789', groupName: 'Group 1', providerDetails: { name: 'Dr. Lisa Parker', specialization: 'geriatrician', address: '321 Brooklyn New York 10001' } },
    { id: 6, claimNumber: '123456789', status: 'pending', dateOfService: '2024/01/01', dateReceived: '2024/02/01', insurance: 'AARP', insuranceAddress: '554 St. Florida, 12345', subscriberName: 'John Doe', address: '123 ABC Drive, NY New York 10001', memberID: '123456789', groupName: 'Group 1', providerDetails: { name: 'Dr. Lisa Parker', specialization: 'geriatrician', address: '321 Brooklyn New York 10001' } }
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