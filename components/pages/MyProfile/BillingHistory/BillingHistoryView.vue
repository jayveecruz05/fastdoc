<template>
  <v-container class="main-container rounded-lg pa-0" fluid>
    <v-row class="ma-0">
      <v-col class="pa-5 px-3" cols="12">
        <v-container class="pa-0" fluid>
          <v-row class="ma-0">
            <v-col class="text-center pa-0 pb-5" cols="12">
              <p class="text-body-1 font-weight-bold text-capitalize text-secondary-text-color pb-1">Explanation Of Benefits</p>
              <p class="text-body-2 font-weight-bold text-uppercase text-primary-text-color pb-1">This is not a bill</p>
            </v-col>

            <v-col class="pa-0 pb-5" cols="12">
              <v-container class="pa-0" fluid>
                <v-row class="ma-0">
                  <v-col class="text-left pa-0" md="6" cols="12">
                    <p class="text-body-1 text-capitalize text-primary-text-color pb-1">{{ data.insurance }}</p>
                    <p class="text-body-1 text-capitalize text-primary-text-color pb-1">{{ data.insuranceAddress }}</p>
                  </v-col>

                  <v-col class="text-left text-sm-right pa-0" md="6" cols="12">
                    <p class="pb-1">
                      <span class="text-body-1 text-capitalize font-weight-bold text-primary">Date Of Service:</span>
                      <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ getFullDate(data.dateOfService) }}</span>
                    </p>
                    <p class="pb-1">
                      <span class="text-body-1 text-capitalize font-weight-bold text-primary">Date Received:</span>
                      <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ getFullDate(data.dateReceived) }}</span>
                    </p>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <v-col class="pa-0 pb-5" cols="12">
              <v-container class="pa-0" fluid>
                <v-row class="ma-0">
                  <v-col class="text-left pa-0" md="6" cols="12">
                    <p class="pb-1">
                      <span class="text-body-1 text-capitalize font-weight-bold text-primary">Subscriber Name:</span>
                      <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.subscriberName }}</span>
                    </p>
                    <p class="pb-1">
                      <span class="text-body-1 text-capitalize font-weight-bold text-primary">Address:</span>
                      <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.address }}</span>
                    </p>
                    <p class="pb-1">
                      <span class="text-body-1 text-capitalize font-weight-bold text-primary">Member ID:</span>
                      <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.memberID }}</span>
                    </p>
                    <p class="pb-1">
                      <span class="text-body-1 text-capitalize font-weight-bold text-primary">Group Name:</span>
                      <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.groupName }}</span>
                    </p>
                  </v-col>

                  <v-col class="text-left text-sm-right pa-0" md="6" cols="12">
                    <p class="text-body-1 text-capitalize font-weight-bold text-primary pb-1">Provider Details</p>
                    <p class="text-body-1 text-capitalize text-primary-text-color pb-1">{{ data.providerDetails.name }} | {{ data.providerDetails.specialization }}</p>
                    <p class="text-body-1 text-capitalize text-primary-text-color pb-1">{{ data.providerDetails.address }}</p>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <v-col class="pa-0" cols="12">
              <v-container class="pa-0" fluid>
                <v-row class="ma-0">
                  <v-col class="text-left pa-0" md="6" cols="12">
                    <p class="pb-1">
                      <span class="text-body-1 text-capitalize font-weight-bold text-primary">Claim Number:</span>
                      <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.claimNumber }}</span>
                    </p>
                  </v-col>

                  <v-col class="text-left text-sm-right pa-0" md="6" cols="12">
                    <p class="pb-1">
                      <span class="text-body-1 text-capitalize font-weight-bold text-primary">Claim Status:</span>
                      <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.status }}</span>
                    </p>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col class="d-flex flex-column flex-sm-row justify-end pa-3 py-5" cols="12">
        <v-btn class="ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" color="primary" variant="elevated" @click="handleBack">Back</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  // Type
  type PropsType = {
    data: {
      id: string | number;
      insurance: string;
      insuranceAddress: string;
      dateOfService: string;
      dateReceived: string;
      subscriberName: string;
      address: string;
      memberID: string;
      groupName: string;
      claimNumber: string;
      status: string;
      providerDetails: {
        name: string;
        specialization: string;
        address: string;
      }
    };
  };

  // Props
  withDefaults(defineProps<PropsType>(), {
    data: () => ({
      id: '',
      insurance: '',
      insuranceAddress: '',
      dateOfService: '',
      dateReceived: '',
      subscriberName: '',
      address: '',
      memberID: '',
      groupName: '',
      claimNumber: '',
      status: '',
      providerDetails: {
        name: '',
        specialization: '',
        address: ''
      }
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
<style lang="scss" scoped></style>