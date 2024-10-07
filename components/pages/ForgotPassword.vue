<template>
  <AuthLayout>
    <v-col id="forgot-password-form" class="auth-form d-flex align-center py-10 pa-5 pa-md-10" md="5" lg="4" cols="12">
      <div class="form-wrapper">
        <h1 class="text-h4 font-weight-bold text-primary mb-10">Forgot Password</h1>
        <v-form v-model="formData.status" ref="formDataRef" @submit.prevent>
          <label class="label text-primary-text-color font-weight-bold mb-2">Email</label>
          <v-text-field
            v-model="formData.data.email.value"
            id="email"
            class="mb-2"
            placeholder="Email"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            clearable
            tabindex="1"
            autofocus
            :disabled="(formData.loading)"
            :rules="[rules.required, rules.email]"
            @keyup.enter="handleReset"
          />

          <div class="d-flex flex-column">
            <v-btn class="mt-5 ml-sm-auto" color="primary" size="large" :loading="(formData.loading)" rounded="lg" tabindex="2" @click="handleReset">
              <span class="px-2">Reset Password</span>
            </v-btn>
          </div>
        </v-form>

        <p class="text-body-1 text-center text-primary-text-color mt-10">
          <span>Already have an account? Login </span>
          <NuxtLink class="link-to text-primary" :to="{ path: '/login' }">here</NuxtLink>
          <span>.</span>
        </p>
      </div>
    </v-col>
  </AuthLayout>
</template>

<script lang="ts" setup>
  // Type
  import type { ForgotPasswordType } from '@/types/form-data';

  // Special Data
  const { rules } = useValidate();

  // Data
  const formDataRef = ref();
  const formData = reactive<ForgotPasswordType>({
    status: false,
    loading: false,
    notification: null,
    data: {
      email: { value: null }
    }
  });

  // Methods
  const handleReset = async () => {
    const { valid } = await formDataRef.value.validate();
    if (valid && formData.status) {}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>