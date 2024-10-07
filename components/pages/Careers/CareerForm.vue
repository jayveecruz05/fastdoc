<template>
  <v-form id="career-form" v-model="formData.status" ref="formDataRef" @submit.prevent>
    <v-container class="pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="pt-5 pb-2" cols="12">
          <h1 class="text-h5 font-weight-bold text-secondary-text-color">Apply Now</h1>
        </v-col>

        <v-col class="pt-0" cols="12">
          <p class="text-primary-text-color">
            <span>&quot;</span>
            <span class="font-weight-bold text-error">&ast;</span>
            <span>&quot;</span>
            <span> Indicates required fields.</span>
          </p>
        </v-col>

        <v-col class="pb-0" sm="4" md="4" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">First Name</label>
          <v-text-field
            v-model="formData.data.firstName.value"
            id="first-name"
            class="mb-2"
            placeholder="First Name"
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

        <v-col class="pb-0" sm="4" md="4" cols="12">
          <label class="label text-primary-text-color font-weight-bold mb-2">Middle Name</label>
          <v-text-field
            v-model="formData.data.middleName.value"
            id="middle-name"
            class="mb-2"
            placeholder="Middle Name"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            clearable
            tabindex="2"
            :disabled="(formData.loading)"
          />
        </v-col>

        <v-col class="pb-0" sm="4" md="4" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Last Name</label>
          <v-text-field
            v-model="formData.data.lastName.value"
            id="last-name"
            class="mb-2"
            placeholder="Last Name"
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

        <v-col class="pb-0" sm="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Resume / CV</label>
          <p class="text-caption text-primary-text-color mb-2">Accepted file types: pdf, doc, docx, Max. file size: 10 MB, Max. files: 2.</p>
          <FileField v-model="formData.data.resumeCV.value" id="resume-cv" color="primary" multiple accept=".pdf, .doc, .docx" :max-file-size="10485760" :max-file-count="2" height="200px" tabindex="4" :disabled="(formData.loading)" :rules="[rules.required, rules.requiredList]" />
        </v-col>

        <v-col class="pb-0" sm="6" cols="12">
          <label class="label text-primary-text-color font-weight-bold mb-2">Cover Letter</label>
          <p class="text-caption text-primary-text-color mb-2">Accepted file types: pdf, doc, docx, Max. file size: 10 MB, Max. files: 2.</p>
          <FileField v-model="formData.data.coverLetter.value" id="cover-letter" color="primary" multiple accept=".pdf, .doc, .docx" :max-file-size="10485760" :max-file-count="2" height="200px" tabindex="5" :disabled="(formData.loading)" />
        </v-col>

        <v-col v-if="(formTypeStatus.isMedical)" class="pb-0" sm="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Medical Specialization</label>
          <v-autocomplete
            v-model="formData.data.medicalSpecialization.value"
            :items="['Cardiology', 'Dermatology']"
            id="medical-specialization"
            class="mb-2"
            placeholder="Medical Specialization"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            color="primary"
            density="default"
            :menu-props="{ offset: 10 }"
            clearable
            tabindex="6"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col class="pb-0" :sm="((formTypeStatus.isMedical) ? 6 : undefined)" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Where is your primary residence?</label>
          <v-autocomplete
            v-model="formData.data.primaryResidence.value"
            :items="['Alabama', 'New York']"
            id="primary-residence"
            class="mb-2"
            placeholder="Where is your primary residence?"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            color="primary"
            density="default"
            :menu-props="{ offset: 10 }"
            clearable
            tabindex="7"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col class="pb-0" sm="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Email</label>
          <v-text-field
            v-model="formData.data.email.value"
            id="email"
            class="mb-2"
            placeholder="Email"
            autocomplete="off"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            clearable
            tabindex="8"
            :disabled="(formData.loading)"
            :rules="[rules.required, rules.email]"
          />
        </v-col>

        <v-col class="pb-0" sm="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Phone Number</label>
          <v-text-field
            v-model="formData.data.phoneNumber.value"
            id="phone-number"
            class="mb-2"
            placeholder="Ex. +744284879652"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            clearable
            tabindex="9"
            :disabled="(formData.loading)"
            :rules="[rules.required, rules.phoneNumber]"
            @update:model-value="(value) => {
              formData.data.phoneNumber.value = formatPhoneNumber(value);
            }"
            type="tel"
            maxlength="13"
            @keypress="numbersOnly"
          />
        </v-col>

        <v-col v-if="(formTypeStatus.isMedical)" class="pb-0" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Do you have an active state license?</label>
          <v-radio-group v-model="formData.data.haveAnActiveStateLicense.value" id="active-state-license" color="primary" inline :rules="[rules.required]">
            <v-radio class="mr-5" label="No" value="no" tabindex="10" />
            <v-radio class="mr-5" label="Yes" value="yes" tabindex="10" />
          </v-radio-group>
        </v-col>
        
        <v-col v-if="(formTypeStatus.isMedical)" class="pb-0" sm="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Do you hold an active Federal DEA certificate/number?</label>
          <v-radio-group v-model="formData.data.haveAnActiveFederalDEACertificateNumber.value" id="active-federal-dea-certificate-number" color="primary" inline :rules="[rules.required]">
            <v-radio class="mr-5" label="No" value="no" tabindex="11" />
            <v-radio class="mr-5" label="Yes" value="yes" tabindex="11" />
          </v-radio-group>
        </v-col>

        <v-col v-if="(formTypeStatus.isMedical)" class="pb-0" sm="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Do you have board certified by ABMS or AOA?</label>
          <v-radio-group v-model="formData.data.haveBoardCertifiedByABMSOrAOA.value" id="board-certified" color="primary" inline :rules="[rules.required]">
            <v-radio class="mr-5" label="No" value="no" tabindex="12" />
            <v-radio class="mr-5" label="Yes" value="yes" tabindex="12" />
          </v-radio-group>
        </v-col>

        <v-col v-if="(formTypeStatus.isMedical)" class="pb-0" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">How many years of clinical experience do you have? (education + experience)</label>
          <v-text-field
            v-model="formData.data.educationAndExperience.value"
            id="clinical-experience"
            class="mb-2"
            placeholder="How many years of clinical experience do you have? (education + experience)"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            clearable
            tabindex="13"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col v-if="(formTypeStatus.isMedical)" class="pb-0" sm="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Do you have more than one open malpractice claim?</label>
          <v-radio-group v-model="formData.data.haveMoreThanOneOpenMalPracticeClaim.value" id="malpractice-claim" color="primary" inline :rules="[rules.required]">
            <v-radio class="mr-5" label="No" value="no" tabindex="14" />
            <v-radio class="mr-5" label="Yes" value="yes" tabindex="14" />
          </v-radio-group>
        </v-col>

        <v-col v-if="(formTypeStatus.isMedical)" class="pb-0" sm="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Do you have any open licensing board complaints or probated or restricted licensure?</label>
          <v-radio-group v-model="formData.data.haveOpenLicensingBoardComplaints.value" id="licensing" color="primary" inline :rules="[rules.required]">
            <v-radio class="mr-5" label="No" value="no" tabindex="15" />
            <v-radio class="mr-5" label="Yes" value="yes" tabindex="15" />
          </v-radio-group>
        </v-col>

        <v-col v-if="(formTypeStatus.isMedical)" class="pb-0" sm="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Are you currently a Medicaid or Medicare Provider?</label>
          <v-select
            v-model="formData.data.currentlyMedicaidProvider.value"
            :items="['Medicaid', 'Medicare', 'Both', 'None']"
            id="provider"
            class="mb-2"
            placeholder="Are you currently a Medicaid or Medicare Provider?"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            color="primary"
            density="default"
            :menu-props="{ offset: 10 }"
            clearable
            tabindex="16"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col v-if="(formTypeStatus.isMedical)" class="pb-0" sm="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">What is your 10-digit NPI number?</label>
          <v-text-field
            v-model="formData.data.npiNumber.value"
            id="npi-number"
            class="mb-2"
            placeholder="What is your 10-digit NPI number?"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            clearable
            tabindex="17"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
            type="tel"
            @keypress="numbersOnly"
          />
        </v-col>

        <v-col class="pb-0" sm="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">What is your preferred work arrangement?</label>
          <v-radio-group v-model="formData.data.preferredWorkArrangement.value" id="work-arrangement" color="primary" inline :rules="[rules.required]">
            <v-radio class="mr-5" label="Full-Time" value="full-time" tabindex="18" />
            <v-radio class="mr-5" label="Part-Time" value="part-time" tabindex="18" />
          </v-radio-group>
        </v-col>

        <v-col class="pb-0" sm="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Are you subject to an active Non-Compete/Non-Solicitation agreement with your current or previous employer?</label>
          <v-radio-group v-model="formData.data.subjectToAnActiveEmployer.value" id="employer" color="primary" inline :rules="[rules.required]">
            <v-radio class="mr-5" label="No" value="no" tabindex="19" />
            <v-radio class="mr-5" label="Yes" value="yes" tabindex="19" />
          </v-radio-group>
        </v-col>

        <v-col class="pb-0" sm="6" md="4" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Gender</label>
          <v-select
            v-model="formData.data.gender.value"
            :items="genderList"
            id="gender"
            class="mb-2"
            placeholder="Gender"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            color="primary"
            density="default"
            :menu-props="{ offset: 10 }"
            clearable
            tabindex="20"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col class="pb-0" sm="6" md="4" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Race</label>
          <v-select
            v-model="formData.data.race.value"
            :items="raceList"
            id="race"
            class="mb-2"
            placeholder="Race"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            color="primary"
            density="default"
            :menu-props="{ offset: 10 }"
            clearable
            tabindex="21"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col class="pb-0" md="4" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Ethnicity</label>
          <v-select
            v-model="formData.data.ethnicity.value"
            :items="ethnicityList"
            id="ethnicity"
            class="mb-2"
            placeholder="Ethnicity"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            color="primary"
            density="default"
            :menu-props="{ offset: 10 }"
            clearable
            tabindex="22"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col cols="12">
          <p class="text-body-1 text-primary-text-color font-weight-bold mb-2">ADA Voluntary Disclosure</p>
          <p class="text-body-1 text-primary-text-color mb-2">A disability is a condition that substantially limits one or more of your “major life activities.” If you have or have ever had such a condition, you are a person with a disability. Disabilities include, but are not limited to:</p>
          <v-container class="pa-0" fluid>
            <v-row class="ma-0">
              <v-col v-for="(list, lIndex) in adaVoluntaryDisclosureList" :key="`ada-voluntary-disclosure-list-${lIndex}`" class="pa-0" md="4" cols="12">
                <ul class="text-body-1 text-primary-text-color ml-10 mr-5">
                  <li v-for="(item, iIndex) in list" :key="`ada-voluntary-disclosure-item-${iIndex}`" class="my-1">{{ item }}</li>
                </ul>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col class="pb-0" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Do you have any disabilities?</label>
          <v-select
            v-model="formData.data.disabilities.value"
            :items="['No, I do not have a disability', 'Yes, I currently have or had a previous disability', 'Prefer not to answer']"
            id="disabilities"
            class="mb-2"
            placeholder="Do you have any disabilities?"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            color="primary"
            density="default"
            :menu-props="{ offset: 10 }"
            clearable
            tabindex="23"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col class="pb-0" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Are you able to perform all functions and responsibilities listed in the job description of the position in which you are applying for, with or without reasonable accommodation?</label>
          <v-radio-group v-model="formData.data.ableToPerformAllFunctions.value" id="perform-all-functions" color="primary" inline :rules="[rules.required]">
            <v-radio class="mr-5" label="No" value="no" tabindex="24" />
            <v-radio class="mr-5" label="Yes" value="yes" tabindex="24" />
          </v-radio-group>
        </v-col>

        <v-col class="pb-0" cols="12">
          <label class="label text-primary-text-color font-weight-bold mb-2">How did you learn about FastDoc?</label>
          <v-text-field
            v-model="formData.data.howDidYouLearn.value"
            id="learn"
            class="mb-2"
            placeholder="How did you learn about FastDoc?"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            clearable
            tabindex="25"
            :disabled="(formData.loading)"
          />
        </v-col>
        
        <v-col class="pb-0" cols="12">
          <v-checkbox v-model="formData.data.agreePrivacyPolicy.value" class="text-primary-text-color" color="primary" density="default" hide-details tabindex="26" :disabled="(formData.loading)" :rules="[rules.required]">
            <template v-slot:label>
              <span>I agree to the&nbsp;</span>
              <NuxtLink class="link-to text-primary" :to="{ path: '/privacy-policy' }" target="_blank">privacy policy</NuxtLink>
              <span>.</span>
            </template>
          </v-checkbox>
        </v-col>

        <v-col class="d-flex flex-column pt-0" cols="12">
          <v-btn class="mt-5 mx-sm-auto" color="primary" size="large" :loading="(formData.loading)" rounded="lg" tabindex="27" @click="handleSubmit">
            <span class="px-5">Submit</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
  // Type
  import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
  import type { CareerFormType } from '@/types/form-data';
  type PropsType = {
    formType?: 'default' | 'medical'
  };

  // Props
  const props = withDefaults(defineProps<PropsType>(), {
    formType: 'default'
  });

  // Special Data
  const { isFullyLoggedIn } = useCookies();
  const { rules, numbersOnly } = useValidate();
  const { formatPhoneNumber } = useFormat();
  const { genderList, raceList, ethnicityList } = useCommonData();

  // Static Data
  const adaVoluntaryDisclosureList = [
    [
      'Alcohol or other substance use disorder (not currently using drugs illegally)',
      'Autoimmune disorder, for example, lupus, fibromyalgia, rheumatoid arthritis, HIV/AIDS',
      'Blind or low vision',
      'Cancer (past or present)',
      'Cardiovascular or heart disease',
      'Celiac disease',
      'Cerebral palsy',
      'Deaf or serious difficulty hearing',
      'Diabetes'
    ],
    [
      'Disfigurement, for example, disfigurement caused by burns, wounds, accidents, or congenital disorders',
      'Epilepsy or other seizure disorder',
      'Gastrointestinal disorders, for example, Crohn\'s Disease, irritable bowel syndrome',
      'Intellectual or developmental disability',
      'Mental health conditions, for example, depression, bipolar disorder, anxiety disorder, schizophrenia, PTSD',
      'Missing limbs or partially missing limbs',
      'Mobility impairment, benefiting from the use of a wheelchair, scooter, walker, leg brace(s) and/or other supports'
    ],
    [
      'Nervous system condition, for example, migraine headaches, Parkinson’s disease, multiple sclerosis (MS)',
      'Neurodivergence, for example, attention-deficit/hyperactivity disorder (ADHD), autism spectrum disorder, dyslexia, dyspraxia, other learning disabilities',
      'Partial or complete paralysis (any cause)',
      'Pulmonary or respiratory conditions, for example, tuberculosis, asthma, emphysema',
      'Short stature (dwarfism)',
      'Traumatic brain injury'
    ]
  ];

  // Data
  const formTypeStatus = computed(() => ({ isDefault: /^(default)$/ig.test(props.formType), isMedical: /^(medical)$/ig.test(props.formType) }));
  const formDataRef = ref();
  const formData = reactive<CareerFormType>({
    status: false,
    loading: false,
    notification: null,
    hasChanges: false,
    data: {
      firstName: { value: null },
      middleName: { value: null },
      lastName: { value: null },
      resumeCV: { value: null },
      coverLetter: { value: null },
      medicalSpecialization: { value: null },
      primaryResidence: { value: null },
      email: { value: null },
      phoneNumber: { value: null },
      haveAnActiveStateLicense: { value: null },
      haveAnActiveFederalDEACertificateNumber: { value: null },
      haveBoardCertifiedByABMSOrAOA: { value: null },
      educationAndExperience: { value: null },
      haveMoreThanOneOpenMalPracticeClaim: { value: null },
      haveOpenLicensingBoardComplaints: { value: null },
      currentlyMedicaidProvider: { value: null },
      npiNumber: { value: null },
      preferredWorkArrangement: { value: null },
      subjectToAnActiveEmployer: { value: null },
      gender: { value: null },
      race: { value: null },
      ethnicity: { value: null },
      disabilities: { value: null },
      ableToPerformAllFunctions: { value: null },
      howDidYouLearn: { value: null },
      agreePrivacyPolicy: { value: false },
    }
  });

  // Methods
  const handleSubmit = async () => {
    const { valid } = await formDataRef.value.validate();
    if (valid && formData.status) {}
  };

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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>