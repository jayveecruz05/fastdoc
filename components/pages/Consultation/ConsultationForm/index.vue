<template>
  <v-container id="consultation-form" class="bg-tertiary-background fill-height align-start pt-12 pb-0" fluid>
    <v-row class="max-width ma-0">
      <v-col class="text-left pt-0" cols="12">
        <h1 class="text-h4 font-weight-bold text-primary mb-2">Consultation</h1>
        <p class="text-body-1 text-primary-text-color mb-4">Fill up the form below to start a consultation</p>
        <p class="text-primary-text-color mb-4">
          <span>&quot;</span>
          <span class="font-weight-bold text-error">&ast;</span>
          <span>&quot;</span>
          <span> Indicates required fields.</span>
        </p>
      </v-col>
      <v-col class="pa-0" cols="12">
        <v-form id="consultant-form" v-model="formData.status" ref="formDataRef" @submit.prevent>
          <v-container class="form-wrapper pa-0" fluid>
            <v-row class="ma-0">
              <v-col class="step-wrapper pa-0 pt-2 py-md-10 pr-md-5" md="3" cols="12">
                <div v-for="(stepData) in stepList" :key="`step-${stepData.name}`" :class="['step d-flex align-center pa-4 pr-md-2', { active: (new RegExp(`^(${stepData.name})`).test(step)) }]"> <!-- @click="() => { stepCount = stepData.count; }" -->
                  <div class="text mr-4">
                    <p class="text-body-1 font-weight-bold text-secondary-text-color">{{ stepData.title }}</p>
                    <p class="text-caption text-primary-text-color">{{ stepData.subTitle }}</p>
                  </div>
                  <component :is="stepData.icon" class="icon" />
                </div>
              </v-col>

              <v-col class="form-container d-flex flex-column flex-grow-1 pa-0 pb-10 py-md-10 pl-md-7" md="9" cols="12">
                <v-expand-transition>
                  <ConsultationStep1 v-if="(/^(basic-information)/.test(step))" v-model:form-data="formData" />
                </v-expand-transition>
                  
                <v-expand-transition>
                  <ConsultationStep2 v-if="(/^(your-symptoms)/.test(step))" v-model:form-data="formData" />
                </v-expand-transition>
                  
                <v-expand-transition>
                  <ConsultationStep3  v-if="(/^(booking-options)/.test(step))" v-model:form-data="formData" />
                </v-expand-transition>
                  
                <v-expand-transition>
                  <ConsultationStep4 v-if="(/^(additional-information)/.test(step))" v-model:form-data="formData" :step="step" />
                </v-expand-transition>

                <div class="action-wrapper d-flex flex-column-reverse flex-sm-row justify-end pa-4 pt-10 mt-md-auto">
                  <v-btn v-if="(stepCount !== 0)" class="flex-grow-1 flex-sm-grow-0 text-primary mt-4 mt-sm-0 mr-sm-4" size="large" rounded="lg" tabindex="50" @click="handleBack">
                    <span class="px-2">Back</span>
                  </v-btn>
                  <v-btn v-if="(stepCount !== (stepData.length - 1))" class="flex-grow-1 flex-sm-grow-0" size="large" rounded="lg" color="primary" tabindex="50" @click="handleNext">
                    <span class="px-4">Next</span>
                  </v-btn>
                  <v-btn v-else class="flex-grow-1 flex-sm-grow-0" size="large" rounded="lg" color="primary" tabindex="50" @click="handleSubmit">
                    <span class="px-4">Submit</span>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import BasicInformation from '@/public/images/pages/consultation/basic-information.svg';
  import YourSymptoms from '@/public/images/pages/consultation/your-symptoms.svg';
  import BookingOptions from '@/public/images/pages/consultation/booking-options.svg';
  import AdditionalInformation from '@/public/images/pages/consultation/additional-information.svg';

  // Type
  import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
  import type { ConsultationType } from '@/types/form-data';

  // Spacial Data
  const { isFullyLoggedIn } = useCookies();

  // Static Data
  const stepList = [
    { count: 0, name: 'basic-information', title: 'Basic Information', subTitle: 'Your complete name', icon: BasicInformation },
    { count: 1, name: 'your-symptoms', title: 'Your Symptoms', subTitle: 'Tell us about your concern', icon: YourSymptoms },
    { count: 2, name: 'booking-options', title: 'Booking Options', subTitle: 'Pick between a scheduled or instant consultation', icon: BookingOptions },
    { count: 3, name: 'additional-information', title: 'Additional Information', subTitle: 'Provide your insurance and other important information', icon: AdditionalInformation }
  ];

  const stepData = [
    'basic-information',
    'your-symptoms',
    'booking-options',
    ...((!isFullyLoggedIn.value) ? [
      'additional-information--personal',
      'additional-information--insurance',
      'additional-information--address'
    ] : [
      'additional-information'
    ])
  ];
  
  // Data
  const stepCount = ref<number>(0);
  const step = computed<string>(() => (stepData[stepCount.value]));
  const formDataRef = ref();
  const formData = reactive<ConsultationType>({
    status: true,
    loading: false,
    notification: null,
    hasChanges: false,
    data: {
      selectedProfile: 'myself',
      family: {
        firstName: { value: null },
        middleName: { value: null },
        lastName: { value: null },
        relationship: { value: null },
        birthDate: { value: null },
        gender: { value: null }
      },
      firstName: { value: null },
      middleName: { value: null },
      lastName: { value: null },
      email: { value: null },
      phoneNumber: { value: null },
      symptoms: { value: [] },
      thermometer: { value: null },
      temperature: { value: null },
      temperatureLocation: { value: null },
      traveled: { value: null },
      travelLocation: { value: null },
      modeOfTransport: { value: null },
      booking: { value: 1 },
      personalInformation: {
        birthDate: { value: null },
        gender: { value: null },
        race: { value: null },
        ethnicity: { value: null }
      },
      insuranceInformation: {
        myInsurance: { value: 'AARP - 123' }, // Select User's PrimaryInsurance
        haveInsurance:  { value: null },
        isPrimaryInsuranceMember:  { value: null },
        insuranceCompany:  { value: null },
        subscriberMemberID:  { value: null },
        groupNumber:  { value: null },
        insuranceIDImage:  {
          front: { value: null },
          back: { value: null }
        }
      },
      address: {
        myAddress: { value: 'New York' }, // Select User's Primary Address
        homeAddress: { value: null },
        apartmentSuiteOffice: { value: null },
        city: { value: null },
        state: { value: null },
        zip: { value: null }
      }
    }
  });

  // Methods
  const handleFormNavigation = (to: 'back' | 'next') => {
    const count = (to === 'next') ? 1 : -1;
    stepCount.value += count;
    window.scrollTo(0, 0);
  };

  const handleBack = async () => {
    handleFormNavigation('back');
  };

  const handleNext = async () => {
    const { valid } = await formDataRef.value.validate();
    if (valid && formData.status) {
      handleFormNavigation('next');
    }
  };

  const handleSubmit = async () => {
    const { valid } = await formDataRef.value.validate();
    if (valid && formData.status) {
      formData.hasChanges = false;
      navigateTo({ path: '/consultation/thank-you' });
    }
  };

  // Reset Values
  watchEffect(() => {
    if (formData.data.selectedProfile === 'myself') {
      formData.data.family.firstName.value = null;
      formData.data.family.middleName.value = null;
      formData.data.family.lastName.value = null;
      formData.data.family.relationship.value = null;
      formData.data.family.birthDate.value = null;
      formData.data.family.gender.value = null;
    }

    if (formData.data.thermometer.value === 'no') {
      formData.data.temperature.value = null;
      formData.data.temperatureLocation.value = null;
    }

    if (formData.data.traveled.value === 'no') {
      formData.data.travelLocation.value = null;
      formData.data.modeOfTransport.value = null;
    }

    if (formData.data.insuranceInformation.haveInsurance.value === 'no') {
      formData.data.insuranceInformation.isPrimaryInsuranceMember.value = null;
      formData.data.insuranceInformation.insuranceCompany.value = null
      formData.data.insuranceInformation.subscriberMemberID.value = null
      formData.data.insuranceInformation.groupNumber.value = null
      formData.data.insuranceInformation.insuranceIDImage =  {
        front: { value: null },
        back: { value: null }
      }
    }
  }, { flush: 'post' });

  watch(isFullyLoggedIn, () => { formData.hasChanges = false; }, { flush: 'post' });

  watch(() => (formData.data), () => { formData.hasChanges = true; }, { deep: true, flush: 'post' });

  // Check if the form has any changes.
  watch(() => (formData.hasChanges), (to) => { window.onbeforeunload = (to) ? (() => ('Are you sure you want to leave this page?')) : null; }, { flush: 'post' });

  onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (formData.hasChanges) {
      const confirm = window.confirm("Are you sure you want to navigate to another page?");
      window.onbeforeunload = (confirm) ? null : window.onbeforeunload;
      next(confirm);
    } else {
      next();
    }
  });

  // Event Bus
  eventBus.on('handle-form-navigation', (to: any) => { handleFormNavigation(to); });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #consultation-form {
    .form-wrapper {
      border-top: 1px solid rgb(var(--v-theme-tertiary-text-color));
      box-sizing: border-box;

      .step-wrapper {
        border-right: 1px solid rgb(var(--v-theme-tertiary-text-color));
        box-sizing: border-box;

        .step {
          &.active {
            display: flex !important;

            .text {
              .text-body-1 {
                color: rgb(var(--v-theme-primary)) !important;
              }
            }

            .icon {
              circle {
                fill: rgb(var(--v-theme-primary));
              }

              path {
                fill: rgb(var(--v-theme-white-text-color));
              }
            }
          }
          
          .text {
            width: 200px;
          }

          .icon {
            height: 80px;
          }
        }
      }

      .form-container {
        .v-divider {
          width: 100px;
        }

        .user-consult-wrapper {
          .content-wrapper {
            border: 2px solid transparent;
            box-sizing: border-box;
          }

          &.active {
            .content-wrapper {
              border: 2px solid rgb(var(--v-theme-primary));
            }
          }
        }
      }
    }
  }

  .mobileOrTabletView {
    #consultation-form {
      .step-wrapper {
        border-right: none;

        .step {
          display: none !important;
        }
      }
    }
  }
</style>