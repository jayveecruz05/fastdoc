<template>
  <v-card class="appointment-template d-flex flex-column align-start text-left" rounded="lg" :color="((dataStatus.isClosed) ? 'tertiary-background' : 'primary')" :variant="((dataStatus.isClosed) ? 'flat' : 'outlined')">
    <v-container class="main-container rounded-lg pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="pa-0" cols="12">
          <v-container class="pa-5 pb-0" fluid>
            <v-row class="ma-0" align="start">
              <v-col class="pa-0 pb-3 pr-3" sm="auto" md="auto" cols="12">
                <v-avatar v-if="(data?.image)" size="80">
                  <v-img loading="lazy" :src="data.image" :lazy-src="data.image" :alt="data.name" />
                </v-avatar>
                <v-avatar v-else size="80" color="secondary-background">
                  <v-icon icon="mdi-doctor" color="secondary-text-color" size="60" />
                </v-avatar>
              </v-col>

              <v-col class="d-flex flex-column flex-md-row justify-space-between flex-grow-1 pa-0 pb-4 pb-sm-6" sm="auto" md="auto" cols="12">
                <v-container class="pa-0" fluid>
                  <v-row class="ma-0">
                    <v-col class="text-left pa-0 pl-1" md="8" cols="12">
                      <p class="pb-1">
                        <span class="text-body-1 text-capitalize font-weight-bold text-secondary-text-color">{{ data.name }}</span>
                        <span class="text-body-1 text-capitalize font-italic text-primary-text-color pl-2">{{ data.specialization }}</span>
                      </p>
                      <p v-if="(actionStatus.isView)" class="pb-1">
                        <span class="text-body-1 text-uppercase font-italic text-primary-text-color">NPI:</span>
                        <span class="text-body-1 text-capitalize font-italic text-primary-text-color pl-2">{{ (data?.npi || '') }}</span>
                      </p>
                      <template v-if="(actionStatus.isDefault)">
                        <p v-if="(!!data.patient)" class="pb-1">
                          <span class="text-body-1 text-capitalize font-weight-bold text-primary">Patient:</span>
                          <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.patient }}</span>
                        </p>
                        <p class="pb-1">
                          <span class="text-body-1 text-capitalize font-weight-bold text-primary">Symptoms:</span>
                          <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.symptoms.toLocaleString().replace(/,/ig, ', ') }}</span>
                        </p>
                      </template>
                    </v-col>

                    <v-col class="text-left text-sm-right pa-0 pl-1" md="4" cols="12">
                      <p class="pb-1">
                        <span class="text-body-1 text-capitalize font-weight-bold text-primary">Date:</span>
                        <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ getFullDate(data.date) }}</span>
                      </p>
                      <p class="pb-1">
                        <span class="text-body-1 font-weight-bold text-primary">Status:</span>
                        <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.status }}</span>
                      </p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col v-if="(actionStatus.isView)" class="pa-5 pt-0" cols="12">
          <p v-if="(!!data.patient)" class="pb-1 pl-1">
            <span class="text-body-1 text-capitalize font-weight-bold text-primary">Patient:</span>
            <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.patient }}</span>
          </p>
          <p class="pb-1 pl-1">
            <span class="text-body-1 text-capitalize font-weight-bold text-primary">Symptoms:</span>
            <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.symptoms.toLocaleString().replace(/,/ig, ', ') }}</span>
          </p>
          <p class="pb-1 pl-1">
            <span class="text-body-1 text-capitalize font-weight-bold text-primary">Findings:</span>
            <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.findings }}</span>
          </p>
          <p class="pb-1 pl-1">
            <span class="text-body-1 text-capitalize font-weight-bold text-primary">Recommended Actions:</span>
            <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.recommended }}</span>
          </p>
        </v-col>
        
        <v-col :class="`d-flex flex-sm-row justify-end pa-0 ${(actionStatus.isDefault) ? 'flex-column-reverse' : 'flex-column'}`" cols="12">
          <v-tooltip v-if="(dataStatus.isPending)" text="Cancel Appointment" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="ma-4 mr-sm-0 mt-0" prepend-icon="mdi-close-circle" size="default" rounded="lg" color="red-lighten-1" @click="handleCancelAppointment">Cancel</v-btn>
            </template>
          </v-tooltip>
          <v-tooltip v-if="(dataStatus.isPending)" text="Re-Schedule Appointment" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="text-primary ma-4 mr-sm-0 mt-0" prepend-icon="mdi-calendar-month" size="default" rounded="lg" @click="handleReScheduleAppointment">Re-Schedule</v-btn>
            </template>
          </v-tooltip>
          <v-tooltip v-if="(dataStatus.isClosed)" text="Download Prescription" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="text-primary ma-4 mr-sm-0 mt-0" prepend-icon="mdi-prescription" size="default" rounded="lg" @click="handleDownloadPrescription">Download</v-btn>
            </template>
          </v-tooltip>
          <v-tooltip v-if="(dataStatus.isPending)" text="Join Consultation" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="ma-4 mt-0" prepend-icon="mdi-video" size="default" rounded="lg" color="primary" @click="handleJoinAppointment">Join</v-btn>
            </template>
          </v-tooltip>
          <v-tooltip v-if="(actionStatus.isDefault && dataStatus.isClosed)" text="Appointment Details" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="ma-4 mt-0" prepend-icon="mdi-information-variant-circle" size="default" rounded="lg" color="primary" @click="handleAppointmentDetails">Details</v-btn>
            </template>
          </v-tooltip>
          <v-tooltip v-if="(actionStatus.isView)" text="Back" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="ma-4 mt-0" size="default" rounded="lg" color="primary" @click="handleBack">Back</v-btn>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts" setup>
  // Type
  type PropsType = {
    action?: 'default' | 'view';
    data: {
      id: string | number;
      image?: string;
      name: string;
      specialization: string;
      patient?: string;
      symptoms: string[];
      date: string;
      status: string;
      findings?: string;
      recommended?: string;
      npi?: string;
    };
  };

  // Props
  const props = withDefaults(defineProps<PropsType>(), {
    action: 'default',
    data: () => ({
      id: '',
      image: '',
      name: '',
      specialization: '',
      patient: '',
      symptoms: [],
      date: '',
      status: '',
      findings: '',
      recommended: '',
      npi: '',
    })
  });

  // Emits
  const emit = defineEmits([ 'view', 'back' ]);

  // Special Data
  const { getFullDate } = useDate();

  // Data
  const actionStatus = computed(() => ({ isDefault: /^(default)$/ig.test(props.action), isView: /^(view)$/ig.test(props.action) }));
  const dataStatus = computed(() => ({ isPending: /^(pending)$/ig.test(props.data.status), isClosed: /^(closed)$/ig.test(props.data.status) }));

  // Methods
  const handleCancelAppointment = () => {};

  const handleReScheduleAppointment = () => {};

  const handleDownloadPrescription = () => {};

  const handleJoinAppointment = () => {};

  const handleAppointmentDetails = () => {
    emit('view');
  };

  const handleBack = () => {
    emit('back');
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .appointment-template {
    &.v-card--variant-outlined {
      border-width: 2px;
    }
    
    .v-card {
      position: relative;
      overflow: visible;
      
      .main-container {
        border: 2px solid transparent;
        box-sizing: border-box;
      }
    }

    &.active {
      .v-card {
        .main-container {
          border: 2px solid rgb(var(--v-theme-primary));
        }
      }
    }
  }
</style>