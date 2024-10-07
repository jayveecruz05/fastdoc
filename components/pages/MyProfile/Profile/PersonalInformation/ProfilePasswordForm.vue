<template>
  <v-form v-model="formData.status" ref="formDataRef" @submit.prevent>
    <v-container class="pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="pb-0 px-4" cols="12">
          <label class="label required text-primary-text-color font-weight-bold mb-2">Current Password</label>
          <v-text-field
            v-model="formData.data.currentPassword.value"
            id="current-password"
            placeholder="Current Password"
            autocomplete="new-password"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            :append-inner-icon="((formData.data.currentPassword.visible) ? 'mdi-eye' : 'mdi-eye-off')"
            :type="((formData.data.currentPassword.visible) ? 'text' : 'password')"
            @click:append-inner="() => { formData.data.currentPassword.visible = !formData.data.currentPassword.visible; }"
            clearable
            tabindex="1"
            :disabled="(formData.loading)"
            :rules="[rules.required]"
          />
        </v-col>
        
        <v-col class="pb-0 px-4" md="6" cols="12">
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
                tabindex="2"
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
        
        <v-col class="pb-0 px-4" md="6" cols="12">
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
            tabindex="3"
            :disabled="(formData.loading)"
            :rules="[rules.required, (value: any) => (!formData.data.password.value || formData.data.password.value === value || 'Password do not match.')]"
          />
        </v-col>

        <v-col class="d-flex flex-column-reverse flex-sm-row justify-end pa-4 pb-5" cols="12">
          <v-btn class="text-primary ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" variant="elevated" tabindex="4" @click="handleCancel">
            <span>Cancel</span>
          </v-btn>

          <v-btn class="ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" color="primary" variant="elevated" tabindex="5" @click="handleSave">
            <span class="px-5">Save</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
  // Type
  import type { PasswordCreationType } from '@/types/form-data';

  // Emits
  const emit = defineEmits([ 'cancel' ]);
  
  // Special Data
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
  const handleSave = async () => {
    const { valid } = await formDataRef.value.validate();
    if (valid && formData.status) {}
  };

  const handleCancel = () => {
    emit('cancel');
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>