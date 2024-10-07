<template>
  <AuthLayout>
    <v-col id="forgot-password-form" class="auth-form d-flex align-center py-10 pa-5 pa-md-10" md="5" lg="4" cols="12">
      <div class="form-wrapper">
        <h1 class="text-h4 font-weight-bold text-primary pb-5">Reset Password</h1>
        <v-form v-model="formData.status" ref="formDataRef" class="pt-5" @submit.prevent>
          <label class="label text-primary-text-color font-weight-bold mb-2">New Password</label>
          <v-text-field
            v-model="formData.data.newPassword.value"
            id="new-password"
            class="mb-2"
            placeholder="New Password"
            autocomplete="new-password"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            :append-inner-icon="((formData.data.newPassword.visible) ? 'mdi-eye' : 'mdi-eye-off')"
            :type="((formData.data.newPassword.visible) ? 'text' : 'password')"
            @click:append-inner="() => { formData.data.newPassword.visible = !formData.data.newPassword.visible; }"
            clearable
            :disabled="(formData.loading)"
            :rules="[rules.required]"
            @keyup.enter="handleReset"
          />

          <label class="label text-primary-text-color font-weight-bold mb-2">Confirm Password</label>
          <v-text-field
            v-model="formData.data.confirmPassword.value"
            id="confirm-password"
            class="mb-2"
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
            :disabled="(formData.loading)"
            :rules="[rules.required]"
            @keyup.enter="handleReset"
          />

          <div class="d-flex flex-column">
            <v-btn class="mt-5 ml-sm-auto" color="primary" size="large" :loading="(formData.loading)" rounded="lg" @click="handleReset">
              <span class="px-2">Save Password</span>
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
  import type { ResetPasswordType } from '@/types/form-data';

  // Special Data
  const { rules } = useValidate();

  // Data
  const formDataRef = ref();
  const formData = reactive<ResetPasswordType>({
    status: false,
    loading: false,
    notification: null,
    data: {
      newPassword: { value: null, visible: false },
      confirmPassword: { value: null, visible: false }
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