<template>
  <v-container id="consultation-step-1" class="pa-0" fluid>
    <v-row class="ma-0">
      <v-col class="py-5 px-4" cols="12">
        <p class="text-body-2 font-weight-bold text-uppercase text-secondary-text-color">Step 1</p>
        <h2 class="text-h6 font-weight-bold text-primary pb-4">Basic Information</h2>
        <v-divider class="border-opacity-100" thickness="4" color="tertiary"/>
      </v-col>
      
      <v-col v-if="(isFullyLoggedIn)" class="pb-0 px-4" cols="12">
        <v-container class="pa-0" fluid>
          <v-row class="ma-0">
            <v-col class="pa-0 mb-5" cols="12" @click="() => { formData.data.selectedProfile = 'myself'; }">
              <v-card :class="['user-consult-wrapper', { active: (formData.data.selectedProfile === 'myself') }]" rounded="lg" color="primary-background" hover>
                <div class="content-wrapper rounded-lg">
                  <v-card-text class="d-flex align-center">
                    <v-avatar v-if="(userPhoto)" size="80">
                      <v-img loading="lazy" :src="userPhoto" :lazy-src="userPhoto" alt="user-photo" />
                    </v-avatar>
                    <v-avatar v-else size="80" color="secondary-background">
                      <v-icon icon="mdi-account" color="secondary-text-color" size="50" />
                    </v-avatar>
                    <v-card-text class="pa-5">
                      <p class="text-body-1 font-weight-bold text-primary pb-1">Myself</p>
                      <p class="text-body-2 text-capitalize text-primary-text-color">John Doe</p>
                    </v-card-text>
                  </v-card-text>
                </div>
              </v-card>
            </v-col>

            <v-col class="pa-0 mb-5" cols="12" @click="() => { formData.data.selectedProfile = 'family'; }">
              <v-card :class="['user-consult-wrapper', { active: (formData.data.selectedProfile === 'family') }]" rounded="lg" color="primary-background" hover>
                <div class="content-wrapper rounded-lg">
                  <v-card-text class="d-flex align-center">
                    <v-avatar size="80" color="secondary-background">
                      <v-icon icon="mdi-account-multiple" color="secondary-text-color" size="50" />
                    </v-avatar>
                    <v-card-text class="pa-5">
                      <p class="text-body-1 font-weight-bold text-primary pb-1">A Family Member</p>
                      <p class="text-body-2 text-capitalize text-primary-text-color">{{ fullName || 'Enter their full name' }}</p>
                    </v-card-text>
                  </v-card-text>

                  <v-expand-transition>
                    <v-card-text v-if="(formData.data.selectedProfile === 'family')" class="pt-0 px-2">
                      <v-container class="pa-0" fluid>
                        <v-row class="ma-0">
                          <v-col class="pb-0 px-4" sm="4" md="4" cols="12">
                            <label class="label required text-primary-text-color font-weight-bold mb-2">First Name</label>
                            <v-text-field
                              v-model="formData.data.family.firstName.value"
                              id="user-first-name"
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

                          <v-col class="pb-0 px-4" sm="4" md="4" cols="12">
                            <label class="label text-primary-text-color font-weight-bold mb-2">Middle Name</label>
                            <v-text-field
                              v-model="formData.data.family.middleName.value"
                              id="user-middle-name"
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

                          <v-col class="pb-0 px-4" sm="4" md="4" cols="12">
                            <label class="label required text-primary-text-color font-weight-bold mb-2">Last Name</label>
                            <v-text-field
                              v-model="formData.data.family.lastName.value"
                              id="user-last-name"
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
                          <v-col class="pb-0 px-4" sm="4" md="4" cols="12">
                            <label class="label required text-primary-text-color font-weight-bold mb-2">Relationship</label>
                            <v-select
                              v-model="formData.data.family.relationship.value"
                              :items="relationshipList"
                              id="user-relationship"
                              class="mb-2"
                              placeholder="Gender"
                              rounded="lg"
                              variant="solo"
                              bg-color="input-background-color"
                              color="primary"
                              density="default"
                              :menu-props="{ offset: 10 }"
                              clearable
                              tabindex="4"
                              :disabled="(formData.loading)"
                              :rules="[rules.required]"
                            />
                          </v-col>

                          <v-col class="pb-0 px-4" sm="4" md="4" cols="12">
                            <label class="label required text-primary-text-color font-weight-bold mb-2">Date Of Birth</label>
                            <DatePicker
                              v-model="formData.data.family.birthDate.value"
                              id="user-date-of-birth"
                              min="1920/01/01"
                              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                              :view-mode="((formData.data.family.birthDate.value) ? 'month' : 'year')"
                              placeholder="Date Of Birth"
                              color="primary"
                              clearable
                              tabindex="5"
                              :rules="[rules.required]"
                            />
                          </v-col>

                          <v-col class="pb-0 px-4" sm="4" md="4" cols="12">
                            <label class="label required text-primary-text-color font-weight-bold mb-2">Gender</label>
                            <v-select
                              v-model="formData.data.family.gender.value"
                              :items="genderList"
                              id="user-gender"
                              class="mb-2"
                              placeholder="Gender"
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
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-expand-transition>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col v-else class="pa-0" cols="12">
        <v-container class="pa-0" fluid>
          <v-row class="ma-0">
            <v-col class="pb-0 px-4" sm="4" md="4" cols="12">
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

            <v-col class="pb-0 px-4" sm="4" md="4" cols="12">
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

            <v-col class="pb-0 px-4" sm="4" md="4" cols="12">
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

            <v-col class="pb-0 px-4" md="6" cols="12">
              <label class="label required text-primary-text-color font-weight-bold mb-2">Email</label>
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
                tabindex="4"
                :disabled="(formData.loading)"
                :rules="[rules.required, rules.email]"
              />
            </v-col>

            <v-col class="pb-0 px-4" md="6" cols="12">
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
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import userPhoto from '@/public/images/common/user-photo.png';

  // Type
  import type { ConsultationType } from '@/types/form-data';

  // Model
  const formData = defineModel<ConsultationType>('formData', { required: true });

  // Special Data
  const { rules, numbersOnly } = useValidate();
  const { formatPhoneNumber } = useFormat();
  const { genderList, relationshipList } = useCommonData();

  // Special Data
  const { isFullyLoggedIn } = useCookies();

  // Data
  const fullName = computed(() => ([formData.value.data.family.firstName.value, formData.value.data.family.middleName.value, formData.value.data.family.lastName.value].filter((text) => (!!text)).toLocaleString().replace(/,/g, ' ')));
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>