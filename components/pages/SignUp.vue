<template>
  <v-form id="sign-up" class="bg-tertiary-background fill-height d-flex align-start" v-model="formData.status" ref="formDataRef" @submit.prevent>
    <v-container class="max-width py-12" fluid>
      <v-row class="ma-0">
        <v-col class="text-center pt-0" cols="12">
          <h1 class="text-h4 font-weight-bold text-primary mb-5">Create an Account</h1>
        </v-col>

        <v-col class="text-left" cols="12">
          <p class="text-primary-text-color">
            <span>&quot;</span>
            <span class="font-weight-bold text-error">&ast;</span>
            <span>&quot;</span>
            <span> Indicates required fields.</span>
          </p>

          <v-scroll-y-transition>
            <v-alert v-if="(formData.notification)" class="mt-4" :type="formData.notification.type" variant="tonal">
              <span>{{ formData.notification.text }}</span>
              <span v-if="(formData.notification.type === 'success')">
                <span class="pr-1">,</span>
                <NuxtLink class="link-to text-primary pr-1" :to="{ path: '/login' }">Click here</NuxtLink>
                <span>to login.</span>
              </span>
            </v-alert>
          </v-scroll-y-transition>
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
            :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
            :rules="[rules.required]"
            :error-messages="formData.data.firstName.error"
            @update:model-value="() => { formData.data.firstName.error = null; }"
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
            :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
            :error-messages="formData.data.middleName.error"
            @update:model-value="() => { formData.data.middleName.error = null; }"
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
            :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
            :rules="[rules.required]"
            :error-messages="formData.data.lastName.error"
            @update:model-value="() => { formData.data.lastName.error = null; }"
          />
        </v-col>

        <v-col class="pb-0" sm="6" md="6" cols="12">
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
            tabindex="4"
            :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
            :rules="[rules.required, rules.email]"
            :error-messages="formData.data.email.error"
            @update:model-value="() => { formData.data.email.error = null; }"
          />
        </v-col>

        <v-col class="pb-0" sm="6" md="6" cols="12">
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
            tabindex="5"
            :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
            :rules="[rules.required, rules.phoneNumber]"
            :error-messages="formData.data.phoneNumber.error"
            @update:model-value="(value) => {
              formData.data.phoneNumber.value = formatPhoneNumber(value);
              formData.data.phoneNumber.error = null;
            }"
            type="tel"
            maxlength="13"
            @keypress="numbersOnly"
          />
        </v-col>

        <v-col class="pb-0" v-bind="((isMinor) ? { sm: 6, md: 6 } : {})" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Birthdate</label>
          <DatePicker
            v-model="formData.data.birthDate.value"
            id="birthdate"
            min="1920/01/01"
            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
            :view-mode="((formData.data.birthDate.value) ? 'month' : 'year')"
            placeholder="Birthdate"
            color="primary"
            clearable
            tabindex="6"
            :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
            :rules="[rules.required]"
            :error-messages="formData.data.birthDate.error"
            @update:model-value="() => { formData.data.birthDate.error = null; }"
          />
        </v-col>

        <v-expand-transition>
          <v-col v-if="(isMinor)" class="pb-0" sm="6" md="6" cols="12">
            <label class="label required text-primary-text-color font-weight-bold mb-2">Parent Email</label>
            <v-text-field
              v-model="formData.data.parent.email.value"
              id="parent-email"
              class="mb-2"
              placeholder="Parent Email"
              rounded="lg"
              variant="solo"
              bg-color="input-background-color"
              density="default"
              clearable
              tabindex="7"
              :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
              :rules="[rules.required, rules.email]"
              :error-messages="formData.data.parent.email.error"
              @update:model-value="() => { formData.data.parent.email.error = null; }"
            />
          </v-col>
        </v-expand-transition>
        
        <v-expand-transition>
          <v-col v-if="(isMinor)" class="pb-0" sm="4" md="4" cols="12">
            <label class="label required text-primary-text-color font-weight-bold mb-2">Parent First Name</label>
            <v-text-field
              v-model="formData.data.parent.firstName.value"
              id="parent-first-name"
              class="mb-2"
              placeholder="Parent First Name"
              rounded="lg"
              variant="solo"
              bg-color="input-background-color"
              density="default"
              clearable
              tabindex="8"
              :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
              :rules="[rules.required]"
              :error-messages="formData.data.parent.firstName.error"
              @update:model-value="() => { formData.data.parent.firstName.error = null; }"
            />
          </v-col>
        </v-expand-transition>
        
        <v-expand-transition>
          <v-col v-if="(isMinor)" class="pb-0" sm="4" md="4" cols="12">
            <label class="label text-primary-text-color font-weight-bold mb-2">Parent Middle Name</label>
            <v-text-field
              v-model="formData.data.parent.middleName.value"
              id="parent-middle-name"
              class="mb-2"
              placeholder="Parent Middle Name"
              rounded="lg"
              variant="solo"
              bg-color="input-background-color"
              density="default"
              clearable
              tabindex="9"
              :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
              :error-messages="formData.data.parent.middleName.error"
              @update:model-value="() => { formData.data.parent.middleName.error = null; }"
            />
          </v-col>
        </v-expand-transition>
        
        <v-expand-transition>
          <v-col v-if="(isMinor)" class="pb-0" sm="4" md="4" cols="12">
            <label class="label required text-primary-text-color font-weight-bold mb-2">Parent Last Name</label>
            <v-text-field
              v-model="formData.data.parent.lastName.value"
              id="parent-last-name"
              class="mb-2"
              placeholder="Parent Last Name"
              rounded="lg"
              variant="solo"
              bg-color="input-background-color"
              density="default"
              clearable
              tabindex="10"
              :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
              :rules="[rules.required]"
              :error-messages="formData.data.parent.lastName.error"
              @update:model-value="() => { formData.data.parent.lastName.error = null; }"
            />
          </v-col>
        </v-expand-transition>

        <v-col class="pb-0" sm="6" md="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Password</label>
          <v-tooltip location="bottom left" max-width="520px">
            <template v-slot:activator="{ props }">
              <v-text-field
                v-bind="props"
                v-model="formData.data.password.value"
                id="password"
                placeholder="Password"
                autocomplete="new-password"
                rounded="lg"
                variant="solo"
                bg-color="input-background-color"
                density="default"
                :append-inner-icon="((formData.data.password.visible) ? 'mdi-eye' : 'mdi-eye-off')"
                :type="((formData.data.password.visible) ? 'text' : 'password')"
                @click:append-inner="() => { formData.data.password.visible = !formData.data.password.visible; }"
                clearable
                tabindex="11"
                :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
                :rules="[rules.required, rules.password]"
                :error-messages="formData.data.password.error"
                @update:model-value="() => { formData.data.password.error = null; }"
              />
            </template>

            <v-container class="pa-0 py-1" fluid>
              <v-row class="ma-0">
                <v-col class="d-flex align-center pa-0" md="6" cols="12">
                  <v-icon v-if="(formData.data.password.value && formData.data.password.value.length >= 8)" icon="mdi-checkbox-marked-circle" color="green-lighten-1" size="16" />
                  <v-icon v-else icon="mdi-checkbox-blank-circle" color="white" size="16" />
                  <span class="px-1">At least 8 characters long</span>
                </v-col>
                <v-col class="d-flex align-center pa-0" md="6" cols="12">
                  <v-icon v-if="(formData.data.password.value && /[a-z]/g.test(formData.data.password.value))" icon="mdi-checkbox-marked-circle" color="green-lighten-1" size="16" />
                  <v-icon v-else icon="mdi-checkbox-blank-circle" color="white" size="16" />
                  <span class="px-1">At least one lowercase letter</span>
                </v-col>
                <v-col class="d-flex align-center pa-0" md="6" cols="12">
                  <v-icon v-if="(formData.data.password.value && /[A-Z]/g.test(formData.data.password.value))" icon="mdi-checkbox-marked-circle" color="green-lighten-1" size="16" />
                  <v-icon v-else icon="mdi-checkbox-blank-circle" color="white" size="16" />
                  <span class="px-1">At least one uppercase letter</span>
                </v-col>
                <v-col class="d-flex align-center pa-0" md="6" cols="12">
                  <v-icon v-if="(formData.data.password.value && /\d/g.test(formData.data.password.value))" icon="mdi-checkbox-marked-circle" color="green-lighten-1" size="16" />
                  <v-icon v-else icon="mdi-checkbox-blank-circle" color="white" size="16" />
                  <span class="px-1">At least one number</span>
                </v-col>
              </v-row>
            </v-container>
          </v-tooltip>
        </v-col>

        <v-col class="pb-0" sm="6" md="6" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Confirm Password</label>
          <v-text-field
            v-model="formData.data.confirmPassword.value"
            id="confirm-password"
            placeholder="Confirm Password"
            autocomplete="new-password"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            :append-inner-icon="((formData.data.confirmPassword.visible) ? 'mdi-eye' : 'mdi-eye-off')"
            :type="((formData.data.confirmPassword.visible) ? 'text' : 'password')"
            @click:append-inner="() => { formData.data.confirmPassword.visible = !formData.data.confirmPassword.visible; }"
            clearable
            tabindex="12"
            :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
            :rules="[rules.required, (value: any) => (!formData.data.password.value || formData.data.password.value === value || 'Password do not match.')]"
            :error-messages="formData.data.confirmPassword.error"
            @update:model-value="() => { formData.data.confirmPassword.error = null; }"
          />
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
            tabindex="13"
            :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
            :rules="[rules.required]"
            :error-messages="formData.data.gender.error"
            @update:model-value="() => { formData.data.gender.error = null; }"
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
            tabindex="14"
            :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
            :rules="[rules.required]"
            :error-messages="formData.data.race.error"
            @update:model-value="() => { formData.data.race.error = null; }"
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
            tabindex="15"
            :disabled="(signUp.isPending.value || signUp.isSuccess.value)"
            :rules="[rules.required]"
            :error-messages="formData.data.ethnicity.error"
            @update:model-value="() => { formData.data.ethnicity.error = null; }"
          />
        </v-col>

        <v-col class="py-0" cols="12">
          <v-checkbox v-model="formData.data.agreePrivacyPolicy.value" class="text-primary-text-color" color="primary" density="default" hide-details tabindex="16" :disabled="(signUp.isPending.value || signUp.isSuccess.value)" :rules="[rules.required]">
            <template v-slot:label>
              <span>I agree to the&nbsp;</span>
              <NuxtLink class="link-to text-primary" :to="{ path: '/privacy-policy' }" target="_blank">privacy policy</NuxtLink>
              <span>.</span>
            </template>
          </v-checkbox>
        </v-col>

        <v-col class="d-flex flex-column" cols="12">
          <v-btn class="mt-5 mx-sm-auto" color="primary" size="large" :disabled="(signUp.isSuccess.value)" :loading="(signUp.isPending.value)" rounded="lg" tabindex="17" @click="handleSubmit">
            <span class="px-5">Submit</span>
          </v-btn>

          <p class="text-body-1 text-center text-primary-text-color mt-10">
            <span>Already have an account? Login </span>
            <NuxtLink class="link-to text-primary" :to="{ path: '/login' }">here</NuxtLink>
            <span>.</span>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
  // Type
  import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
  import type { SignUpType } from '@/types/form-data';
  import type { SignUpdDataType } from '@/types/api';
  
  // Special Data
  const { authentication } = useStore();
  const { rules, numbersOnly, handleErrors, clearErrors } = useValidate();
  const { genderList, raceList, ethnicityList } = useCommonData();
  const { calculateAge } = useDate();
  const { formatPhoneNumber } = useFormat();

  // Data
  const formDataRef = ref();
  const formData = reactive<SignUpType>({
    status: false,
    notification: null,
    hasChanges: false,
    data: {
      firstName: { value: null, error: null, slug: 'first_name' },
      middleName: { value: null, error: null, slug: 'middle_name' },
      lastName: { value: null, error: null, slug: 'last_name' },
      email: { value: null, error: null, slug: 'email' },
      phoneNumber: { value: null, error: null, slug: 'mobile_number' },
      birthDate: { value: null, error: null, slug: 'dob' },
      parent: {
        firstName: { value: null, error: null, slug: 'parent_first_name' },
        middleName: { value: null, error: null, slug: 'parent_middle_name' },
        lastName: { value: null, error: null, slug: 'parent_last_name' },
        email: { value: null, error: null, slug: 'parent_email' },
      },
      password: { value: null, visible: false, error: null, slug: 'password' },
      confirmPassword: { value: null, visible: false, error: null, slug: 'confirm_password' },
      gender: { value: null, error: null, slug: 'gender' },
      race: { value: null, error: null, slug: 'race' },
      ethnicity: { value: null, error: null, slug: 'ethnicity' },
      agreePrivacyPolicy: { value: false, slug: 'agree_privacy_policy' }
    }
  });

  // Computed
  const isMinor = computed(() => {
    const age = calculateAge(formData.data.birthDate.value);
    formData.data.parent.firstName.value = null;
    formData.data.parent.middleName.value = null;
    formData.data.parent.lastName.value = null;
    formData.data.parent.email.value = null;
    return (typeof age === 'number' && age <= 17);
  });

  // API Requestor
  const signUp = authentication.signUp();

  // Methods
  const handleSubmit = async () => {
    formData.notification = null; // Reset Form Notification
    clearErrors(formData.data);
    const { valid } = await formDataRef.value.validate();
    if (valid && formData.status) {
      const { firstName, middleName, lastName, email, phoneNumber, birthDate, parent, password, gender, race, ethnicity } = formData.data;
      const data: SignUpdDataType = {
        first_name: firstName.value || undefined,
        middle_name: middleName.value || undefined,
        last_name: lastName.value || undefined,
        email: email.value || undefined,
        mobile_number: phoneNumber.value || undefined,
        dob: birthDate.value?.toISOString()?.substring(0, 10) || undefined, // yyyy-mm-dd
        parent_first_name: parent.firstName.value || undefined,
        parent_middle_name: parent.middleName.value || undefined,
        parent_last_name: parent.lastName.value || undefined,
        parent_email: parent.email.value || undefined,
        password: password.value || undefined,
        gender: gender.value || undefined,
        race: race.value || undefined,
        ethnicity: ethnicity.value || undefined,
        user_type: 'Patient'
      };
      signUp.mutate(data, {
        onSuccess: (response) => {
          // console.log(response);
          formData.notification = { type: 'success', text: (response.message || 'Sign-Up Success') };
          formData.hasChanges = false;
          window.scrollTo(0, 0);
        },
        onError: (error: any) => {
          // console.log(error);
          formData.notification = { type: 'error', text: 'There was a problem with your submission. Please review the fields below.' };
          handleErrors(formData.data, error.data?.errors);
          window.scrollTo(0, 0);
        }
      });
    }
  };

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