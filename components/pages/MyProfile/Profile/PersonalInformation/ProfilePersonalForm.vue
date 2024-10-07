<template>
  <v-form v-model="formData.status" ref="formDataRef" @submit.prevent>
    <v-container class="pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="pb-10 px-4" cols="12">
          <v-container class="pa-0" fluid>
            <v-row class="justify-center justify-md-space-between ma-0">
              <v-col class="pa-0 pb-10 pb-lg-0" sm="auto" cols="12">
                <v-container class="pa-0" fluid>
                  <v-row class="justify-center justify-md-start ma-0">
                    <v-col class="pa-0" cols="auto">
                      <FileField v-model="formData.data.profileImage.value" image-avatar color="primary" hide-details :disabled="(formData.loading || action.view)" />
                    </v-col>
                    <v-col class="pb-0 pt-4 pt-sm-0 px-7 text-center text-sm-left" cols="auto" align-self="center">
                      <h2 class="text-h5 text-secondary-text-color font-weight-bold text-capitalize">{{ formData.data.firstName.value }} {{ formData.data.lastName.value }}</h2>
                      <p class="text-body-1 text-primary-text-color">{{ emailValue }}</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col v-if="(action.view)" class="d-flex flex-column-reverse flex-lg-row pa-0" align-self="center" md="auto" cols="12">
                <v-btn class="flex-grow-1 flex-md-grow-0 text-primary mb-4 mb-lg-0" prepend-icon="mdi-pencil" size="large" rounded="lg" @click="handleEdit">
                  <span>Edit Profile</span>
                </v-btn>
                
                <v-btn class="flex-grow-1 flex-md-grow-0 text-primary mb-4 mb-lg-0 ml-0 ml-lg-4" size="large" rounded="lg" @click="handleChangePassword">
                  <span class="px-4">Change Password</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col class="pb-0 px-4" md="4" cols="12">
          <label :class="['label text-primary-text-color font-weight-bold mb-2', { required: action.edit }]">First Name</label>
          <v-text-field
            v-model="formData.data.firstName.value"
            id="first-name"
            class="mb-2"
            placeholder="First Name"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            :clearable="(action.edit)"
            tabindex="1"
            :disabled="(formData.loading)"
            :readonly="(action.view)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col class="pb-0 px-4" md="4" cols="12">
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
            :clearable="(action.edit)"
            tabindex="2"
            :disabled="(formData.loading)"
            :readonly="(action.view)"
          />
        </v-col>

        <v-col class="pb-0 px-4" md="4" cols="12">
          <label :class="['label text-primary-text-color font-weight-bold mb-2', { required: action.edit }]">Last Name</label>
          <v-text-field
            v-model="formData.data.lastName.value"
            id="last-name"
            class="mb-2"
            placeholder="Last Name"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            :clearable="(action.edit)"
            tabindex="3"
            :disabled="(formData.loading)"
            :readonly="(action.view)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col class="pb-0 px-4" md="6" cols="12">
          <label :class="['label text-primary-text-color font-weight-bold mb-2', { required: action.edit }]">Email</label>
          <v-text-field
            v-model="formData.data.email.value"
            :value="emailValue"
            id="email"
            class="mb-2"
            placeholder="Email"
            autocomplete="off"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            :append-inner-icon="((action.view) ? ((formData.data.email.visible) ? 'mdi-eye' : 'mdi-eye-off') : undefined)"
            @click:append-inner="() => { formData.data.email.visible = !formData.data.email.visible; }"
            :clearable="(action.edit)"
            tabindex="4"
            :disabled="(formData.loading)"
            :readonly="(action.view)"
            :rules="[rules.required, rules.email]"
          />
        </v-col>

        <v-col class="pb-0 px-4 px-4" md="6" cols="12">
          <label :class="['label text-primary-text-color font-weight-bold mb-2', { required: action.edit }]">Phone Number</label>
          <v-text-field
            v-model="formData.data.phoneNumber.value"
            :value="numberValue"
            id="phone-number"
            class="mb-2"
            placeholder="Ex. +744284879652"
            rounded="lg"
            variant="solo"
            bg-color="input-background-color"
            density="default"
            :append-inner-icon="((action.view) ? ((formData.data.phoneNumber.visible) ? 'mdi-eye' : 'mdi-eye-off') : undefined)"
            @click:append-inner="() => { formData.data.phoneNumber.visible = !formData.data.phoneNumber.visible; }"
            :clearable="(action.edit)"
            tabindex="5"
            :disabled="(formData.loading)"
            :readonly="(action.view)"
            :rules="[rules.required, rules.phoneNumber]"
            @update:model-value="(value) => {
              formData.data.phoneNumber.value = formatPhoneNumber(value);
            }"
            type="tel"
            maxlength="13"
            @keypress="numbersOnly"
          />
        </v-col>

        <v-col class="pb-0 px-4" md="6" cols="12">
          <label :class="['label text-primary-text-color font-weight-bold mb-2', { required: action.edit }]">Birthdate</label>
          <DatePicker
            v-model="formData.data.birthDate.value"
            id="birthdate"
            min="1920/01/01"
            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
            :view-mode="((formData.data.birthDate.value) ? 'month' : 'year')"
            placeholder="Birthdate"
            color="primary"
            :append-inner-icon="((action.view) ? ((formData.data.birthDate.visible) ? 'mdi-eye' : 'mdi-eye-off') : undefined)"
            :type="((action.edit || formData.data.birthDate.visible) ? 'text' : 'password')"
            @click:append-inner="() => { formData.data.birthDate.visible = !formData.data.birthDate.visible; }"
            :clearable="(action.edit)"
            tabindex="6"
            :disabled="(formData.loading)"
            :readonly="(action.view)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col class="pb-0 px-4" md="6" cols="12">
          <label :class="['label text-primary-text-color font-weight-bold mb-2', { required: action.edit }]">Gender</label>
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
            :clearable="(action.edit)"
            tabindex="7"
            :disabled="(formData.loading)"
            :menu-icon="((action.view) ? 'undefined' : '$dropdown')"
            :readonly="(action.view)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col class="pb-0 px-4" md="6" cols="12">
          <label :class="['label text-primary-text-color font-weight-bold mb-2', { required: action.edit }]">Race</label>
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
            :clearable="(action.edit)"
            tabindex="8"
            :disabled="(formData.loading)"
            :menu-icon="((action.view) ? 'undefined' : '$dropdown')"
            :readonly="(action.view)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col class="pb-0 px-4" md="6" cols="12">
          <label :class="['label text-primary-text-color font-weight-bold mb-2', { required: action.edit }]">Ethnicity</label>
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
            :clearable="(action.edit)"
            tabindex="9"
            :disabled="(formData.loading)"
            :menu-icon="((action.view) ? 'undefined' : '$dropdown')"
            :readonly="(action.view)"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col v-if="(action.edit)" class="d-flex flex-column-reverse flex-sm-row justify-end pa-4 pb-5" cols="12">
          <v-btn class="text-primary ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" variant="elevated" tabindex="10" @click="handleCancel">
            <span>Cancel</span>
          </v-btn>

          <v-btn class="ma-0 mb-4 mx-0 mb-sm-0 ml-sm-4" rounded="lg" size="large" color="primary" variant="elevated" tabindex="11" @click="handleSave">
            <span class="px-5">Save</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
  import userPhoto from '@/public/images/common/user-photo.png';

  // Type
  import type { PersonalType } from '@/types/form-data';

  // Emits
  const emit = defineEmits([ 'change' ]);

  // Special Data
  const { rules, numbersOnly } = useValidate();
  const { maskEmail, maskPhoneNumber, formatPhoneNumber } = useFormat();
  const { genderList, raceList, ethnicityList } = useCommonData();

  // Data
  const formDataRef = ref();
  const formData = reactive<PersonalType>({
    status: false,
    loading: false,
    notification: null,
    action: 'view',
    data: {
      profileImage: { value: { model: [ userPhoto ], content: userPhoto } },
      firstName: { value: 'John' },
      middleName: { value: null },
      lastName: { value: 'Doe' },
      email: { value: 'jdoe@gmail.com', visible: false },
      phoneNumber: { value: '+123456789012', visible: false },
      birthDate: { value: new Date('1990/01/01 00:00:00'), visible: false },
      gender: { value: 'male' },
      race: { value: 'white' },
      ethnicity: { value: 'other' }
    }
  });
  const action = computed(() => {
    if (formData.action === 'view') {
      formData.data.email.visible = false;
      formData.data.phoneNumber.visible = false;
      formData.data.birthDate.visible = false;
    }
    return { view: (formData.action === 'view'), edit: (formData.action === 'edit') };
  });
  const emailValue = computed(() => ((action.value.edit || formData.data.email.visible) ? formData.data.email.value : maskEmail(formData.data.email.value as string)));
  const numberValue = computed(() => ((action.value.edit || formData.data.phoneNumber.visible) ? formData.data.phoneNumber.value : maskPhoneNumber(formData.data.phoneNumber.value as string)));

  // Methods
  const handleSave = async () => {
    const { valid } = await formDataRef.value.validate();
    if (valid && formData.status) {}
  };

  const handleCancel = () => {
    formData.action = 'view';
    window.scrollTo(0, 0);
  };

  const handleEdit = () => {
    formData.action = 'edit';
    window.scrollTo(0, 0);
  };

  const handleChangePassword = () => {
    emit('change');
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>