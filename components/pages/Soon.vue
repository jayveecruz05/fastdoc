<template>
  <v-container class="max-width fill-height py-12" fluid>
      <v-row class="ma-0">
        <v-col class="text-center pt-0" cols="12">
          <h1 class="text-h2 font-weight-bold text-secondary-text-color mb-5">
            <span class="text-primary-light">Fast</span>
            <span class="text-primary">Doc</span>
            <span> - Telehealth Simplified</span>
          </h1>
          <p class="text-body-1 text-primary-text-color mb-7 mx-md-16 px-md-16">We're launching soon! Get ready to experience quick, reliable, and convenient healthcare from the comfort of your home. Stay in the loop for our launch updates by joining our newsletter.</p>
          <h2 class="text-h6 font-weight-bold text-primary">Be the first to know - sign up below!</h2>
        </v-col>

        <v-col cols="12">
          <v-form v-model="formData.status" ref="formDataRef" class="w-md-50 mx-auto" @submit.prevent>
            <v-scroll-y-transition>
              <v-alert v-if="(formData.notification)" class="mb-5" :type="formData.notification.type" :text="formData.notification.text" variant="tonal" />
            </v-scroll-y-transition>

            <label class="label text-primary-text-color font-weight-bold mb-2">Email</label>
            <v-text-field v-model="formData.data.email.value" id="email" class="mb-2" aria-label="email" placeholder="Email" rounded="lg" variant="outlined" color="primary" bg-color="input-background-color" density="comfortable" :rules="[rules.required, rules.email]" @keyup.enter="handleSignUp" />

            <div class="d-flex flex-column">
              <v-btn class="mt-3" color="primary" size="large" rounded="lg" @click="handleSignUp">
                <span class="px-2">I'm In!</span>
              </v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { VContainer, VRow, VCol, VBtn, VForm, VTextField, VAlert, VScrollYTransition } from 'vuetify/components';

  // Type
  import type { SoonSignUpType } from '@/types/form-data';

  // Special Data
  const { rules } = useValidate();

  // Data
  const formDataRef = ref();
  const formData = reactive<SoonSignUpType>({
    status: false,
    notification: null,
    data: {
      email: { value: null }
    }
  });

  // Methods
  const handleSignUp = async () => {
    const { valid } = await formDataRef.value?.validate();
    if (valid && formData.status) {}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>