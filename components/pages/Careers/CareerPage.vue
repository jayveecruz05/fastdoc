<template>
  <v-container class="career bg-tertiary-background fill-height align-start py-12" fluid>
    <v-row class="max-width ma-0">
      <v-col class="pt-0" cols="12">
        <CareerTemplate :data="currentData" />
      </v-col>
      <v-col class="pa-0" cols="12">
        <CareerForm :form-type="currentData.formType" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  // Special Data
  const route = useRoute();
  const careers: any = useCareers();
  
  // Data
  const currentData = computed(() => {
    const { params }: any = route;
    if (!careers?.[params?.page]) { // Check if the page is valid, if not return to main page
      navigateTo({ path: '/careers' });
    }
    return careers[params.page];
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>