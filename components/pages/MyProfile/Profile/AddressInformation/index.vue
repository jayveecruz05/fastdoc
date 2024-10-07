<template>
  <v-container class="pa-0" fluid>
    <v-expand-transition>
      <v-container v-if="(!form.show)" class="pa-0" fluid>
        <v-row class="pa-4 pt-0 pb-5 ma-0">
          <v-col v-for="(data) in addressList" :key="`insurance-${data.id}`" cols="12">
            <v-card class="d-flex flex-row align-start text-left" rounded="lg" color="tertiary-background" variant="flat" hover @click="() => { handleSelect(data); }">
              <v-card-text class="d-flex align-center justify-space-between flex-grow-1 px-5">
                <p class="text-body-1 text-primary-text-color font-weight-medium">{{ data.homeAddress }}</p>
                <v-icon v-if="(data.isPrimary)" icon="mdi-star" color="yellow-darken-3" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="d-flex justify-end pa-3" cols="12">
            <v-btn class="flex-grow-1 flex-sm-grow-0" prepend-icon="mdi-plus" size="large" variant="text" color="primary" @click="handleAdd">Add New</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-expand-transition>

    <v-expand-transition>
      <v-container v-if="(form.show)" class="pa-0" fluid>
        <v-row class="pa-4 pt-0 ma-0">
          <v-col class="pa-0" cols="12">
            <ProfileAddressForm :data="form.data" @cancel="handleCancel" />
          </v-col>
        </v-row>
      </v-container>
    </v-expand-transition>
  </v-container>
</template>

<script lang="ts" setup>
  // Static Data
  const addressList = [
    { id: 1, isPrimary: true, homeAddress: 'New York', apartmentSuiteOffice: 'New York', city: 'New York', state: 'New York', zip: 123 },
    { id: 2, isPrimary: false, homeAddress: 'Chicago', apartmentSuiteOffice: 'Chicago', city: 'Chicago', state: 'Chicago', zip: 456 }
  ];

  // Data
  const form = reactive<{ show: boolean, data: { [key: string]: any; } | null }>({ show: false, data: {} });

  //Methods
  const handleAdd = () => {
    form.show = true;
    form.data = null;
    window.scrollTo(0, 0);
  };

  const handleSelect = (data: { [key: string]: any; }) => {
    form.show = true;
    form.data = data;
    window.scrollTo(0, 0);
  };

  const handleCancel = () => {
    form.show = false;
    form.data = {};
    window.scrollTo(0, 0);
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>