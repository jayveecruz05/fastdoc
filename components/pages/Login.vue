<template>
  <AuthLayout>
    <v-col id="login-form" class="auth-form d-flex align-center py-10 pa-5 pa-md-10" md="5" lg="4" cols="12">
      <div class="form-wrapper">
        <h1 class="text-h4 font-weight-bold text-primary pb-5">Login</h1>
        <v-scroll-y-transition>
          <v-alert v-if="(formData.notification)" :type="formData.notification.type" :text="formData.notification.text" variant="tonal" />
        </v-scroll-y-transition>
        <v-form v-model="formData.status" ref="formDataRef" class="pt-5" @submit.prevent>
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
            :disabled="(login.isPending.value || login.isSuccess.value)"
            :rules="[rules.required, rules.email]"
            @keyup.enter="handleLogin"
          />

          <label class="label text-primary-text-color font-weight-bold mb-2">Password</label>
          <v-text-field
            v-model="formData.data.password.value"
            id="password"
            placeholder="Password"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            :append-inner-icon="((formData.data.password.visible) ? 'mdi-eye' : 'mdi-eye-off')"
            :type="((formData.data.password.visible) ? 'text' : 'password')"
            @click:append-inner="() => { formData.data.password.visible = !formData.data.password.visible; }"
            clearable
            tabindex="2"
            :disabled="(login.isPending.value || login.isSuccess.value)"
            :rules="[rules.required]"
            @keyup.enter="handleLogin"
          />
          
          <div class="d-flex align-center justify-space-between">
            <v-checkbox v-model="formData.data.rememberMe.value" class="text-primary-text-color" label="Remember Me" color="primary" density="default" hide-details tabindex="3" :disabled="(login.isPending.value || login.isSuccess.value)" />
            <NuxtLink class="link-to text-primary" :to="{ path: '/forgot-password' }">Forgot Password?</NuxtLink>
          </div>

          <div class="d-flex flex-column">
            <v-btn class="mt-5 ml-sm-auto" color="primary" size="large" :disabled="(login.isSuccess.value)" :loading="(login.isPending.value)" rounded="lg" tabindex="4" @click="handleLogin">
              <span class="px-2">Login</span>
            </v-btn>
          </div>
        </v-form>

        <p class="text-body-1 text-center text-primary-text-color mt-10">
          <span>Don’t have an account? Sign-up </span>
          <NuxtLink class="link-to text-primary" :to="{ path: '/sign-up' }">here</NuxtLink>
          <span>.</span>
        </p>
      </div>
    </v-col>
  </AuthLayout>
</template>

<script lang="ts" setup>
  // Type
  import type { LoginType } from '@/types/form-data';
  import type { LoginDataType } from '@/types/api';

  // Special Data
  const { isLoggedIn, accessToken } = useCookies();
  const { authentication } = useStore();
  const { rules } = useValidate();

  // Data
  const formDataRef = ref();
  const formData = reactive<LoginType>({
    status: false,
    notification: null,
    data: {
      email: { value: null },
      password: { value: null, visible: false },
      rememberMe: { value: false }
    }
  });

  // API Requestor
  const login = authentication.login();
  const authenticationData = authentication.fetchUserDetails();

  // Methods
  const handleLogin = async () => {
    const { valid } = await formDataRef.value?.validate();
    if (valid && formData.status) {
      formData.notification = null; // Reset Form Notification
      const { email, password } = formData.data;
      const data: LoginDataType = { email: email.value, password: password.value };
      login.mutate(data, {
        onSuccess: async (response) => {
          formData.notification = { type: 'success', text: (response.message || 'Login Success') };
          accessToken.value = response.access_token;
          mainAPI.api.setAuthorization(accessToken.value);
          await authenticationData.refetch();
          isLoggedIn.value = true;
          navigateTo({ path: '/my-profile' });
        },
        onError: (error: any) => {
          formData.notification = { type: 'error', text: (error.data?.error || 'Login Error') };
        }
      });
    }
  };

  // Watch
  watch(formData.data, () => {
    formData.notification = null; // Reset Form Notification
  }, { flush: 'post' });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>