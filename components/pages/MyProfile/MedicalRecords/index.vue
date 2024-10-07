<template>
  <ProfileLayout>
    <v-list class="d-none d-sm-flex text-primary-text-color pa-7" slim color="primary">
      <v-list-item v-for="(item, index) in menuList" :key="`menu-item-${index}`" rounded="lg" class="mr-5" :active="(menuSelected === item.value)" @click="() => { menuSelected = item.value; }">
        <template v-slot:prepend>
          <v-icon size="25" :icon="item.icon" />
        </template>
        <v-list-item-title class="font-weight-medium">{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-select v-model="menuSelected" :items="menuList" class="d-block d-sm-none pt-3 pb-6 px-7" placeholder="Gender" variant="underlined" bg-color="input-background-color" color="primary" density="default" :menu-props="{ offset: 10 }" hide-details>
      <template v-slot:selection="{ item }">
        <p class="d-flex align-center text-primary font-weight-medium pb-2">
          <v-icon :icon="item.raw.icon" />
          <span class="pl-3">{{ item.title }}</span>
        </p>
      </template>
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" slim>
          <template v-slot:prepend>
            <v-icon :icon="item.raw.icon" />
          </template>
          <template v-slot:title>
            <span>{{ item.title }}</span>
          </template>
        </v-list-item>
      </template>
    </v-select>

    <v-expand-transition>
      <MedicalRecordsAllergies v-if="(menuSelected === 'allergies')" />
      <MedicalRecordsConditions v-if="(menuSelected === 'conditions')" />
      <MedicalRecordsDiagnostics v-if="(menuSelected === 'diagnostics')" />
      <MedicalRecordsMedications v-if="(menuSelected === 'medications')" />
    </v-expand-transition>
  </ProfileLayout>
</template>

<script lang="ts" setup>
  import type { LocationQueryValue } from 'vue-router';

  // Special Data
  const route = useRoute();

  // Static Data
  const menuList = [
    { title: 'Allergies', icon: 'mdi-allergy', value: 'allergies' },
    { title: 'Conditions', icon: 'mdi-medical-bag', value: 'conditions' },
    { title: 'Diagnostics', icon: 'mdi-flask', value: 'diagnostics' },
    { title: 'Medications', icon: 'mdi-pill-multiple', value: 'medications' }
  ];

  // Data
  const menuSelected = ref<string | LocationQueryValue | LocationQueryValue[]>((new RegExp(`^(${menuList.map((nav) => (nav.value)).join('|')})$`, 'ig').test(route.query?.view as string)) ? route.query.view : 'allergies');

  // Watch
  watch(menuSelected, (to) => { handleNavigation(to); }, { flush: 'post' });

  // Methods
  const handleNavigation = (view: string | LocationQueryValue | LocationQueryValue[]) => {
    navigateTo({ query: { view } });
  };

  onBeforeMount(() => { handleNavigation(menuSelected.value); });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>