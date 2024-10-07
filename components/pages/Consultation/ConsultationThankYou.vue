<template>
  <v-container id="consultation-thank-you" class="bg-tertiary-background fill-height align-start py-12" fluid>
    <v-row class="max-width ma-0">
      <v-col id="thank-you" class="d-flex flex-column align-center pa-0 px-4" cols="12">
        <h1 class="text-h4 font-weight-bold text-primary mb-8">Call Ended</h1>
      </v-col>

      <v-col class="d-flex flex-column align-center pa-3 px-4" cols="12">
        <v-card class="pa-5" rounded="lg" color="primary-background" max-width="740px" width="100%">
          <v-card-text class="text-center">
            <p class="text-body-1 text-secondary-text-color">How  was the quality of your call</p>
            <v-rating :model-value="0" class="text-tertiary-text-color" :item-labels="['Very Bad', '', '', '', 'Excellent']" item-label-position="bottom" color="yellow-darken-3" hover />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="d-flex flex-column align-center pa-3 px-4" cols="12">
        <v-card class="pa-5" rounded="lg" color="primary-background" max-width="740px" width="100%">
          <v-card-text class="text-center">
            <v-avatar v-if="(doctorPhoto)" size="150">
              <v-img loading="lazy" :src="doctorPhoto" :lazy-src="doctorPhoto" alt="doctor-name" />
            </v-avatar>
            <v-avatar v-else size="150" color="secondary-background">
              <v-icon icon="mdi-doctor" color="secondary-text-color" size="120" />
            </v-avatar>
            <p class="text-body-1 text-secondary-text-color mt-5">How was your experience with Dr. Lisa Parker? Please leave a rating.</p>
            <v-rating :model-value="0" class="text-tertiary-text-color mb-5" :item-labels="['Very Bad', '', '', '', 'Excellent']" item-label-position="bottom" color="yellow-darken-3" hover />
            <v-textarea class="mb-2" placeholder="Describe your experience" rounded="lg" variant="solo" bg-color="input-background-color" density="default" rows="10" hide-details />
            <v-btn class="mt-5" size="large" rounded="lg" color="primary" @click="handleSubmit">
              <span class="px-4">Submit</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col v-if="(!isFullyLoggedIn)" class="d-flex flex-column align-center pa-3 px-4" cols="12">
        <v-card class="pa-5 px-sm-2" rounded="lg" color="primary-background" max-width="740px" width="100%">
          <v-card-text>
            <h2 class="text-h6 font-weight-bold text-primary text-center mb-4">Finish your Account Setup</h2>
            <p class="text-body-1 text-secondary-text-color text-center mb-4">Create a password so you can log in and access your consultation history.</p>
            <v-form v-model="formData.status" ref="formDataRef" @submit.prevent>
              <v-container class="pa-0" fluid>
                <v-row class="ma-0">
                  <v-col class="pa-0 pb-sm-0 pa-sm-3" sm="6" md="6" cols="12">
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
                          tabindex="1"
                          :disabled="(formData.loading)"
                          :rules="[rules.required, rules.password]"
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

                  <v-col class="pa-0 pb-sm-0 pa-sm-3" sm="6" md="6" cols="12">
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
                      tabindex="2"
                      :disabled="(formData.loading)"
                      :rules="[rules.required, (value: any) => (!formData.data.password.value || formData.data.password.value === value || 'Password do not match.')]"
                    />
                  </v-col>

                  <v-col class="text-center pt-6 pb-0" cols="12">
                    <v-btn size="large" rounded="lg" color="primary" @click="handleSignUp">
                      <span class="px-4">Sign-Up</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import doctorPhoto from '@/public/images/common/doctor-photo.png';

  // Type
  import type { PasswordCreationType } from '@/types/form-data';

  // Special Data
  const { isFullyLoggedIn } = useCookies();
  const { rules } = useValidate();

  // Data
  const formDataRef = ref();
  const formData = reactive<PasswordCreationType>({
    status: false,
    loading: false,
    notification: null,
    data: {
      currentPassword: { value: null, visible: false },
      password: { value: null, visible: false },
      confirmPassword: { value: null, visible: false }
    }
  });

  // Methods
  const handleSubmit = () => {};

  const handleSignUp = async () => {
    const { valid } = await formDataRef.value.validate();
    if (valid && formData.status) {}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>