<template>
  <component :is="currentComponent" />
</template>

<script lang="ts" setup>
  const Blog1 = defineAsyncComponent(() => (import('./Blog1.vue')));
  const Blog2 = defineAsyncComponent(() => (import('./Blog2.vue')));

  // Special Data
  const route = useRoute();

  // Static Data
  const componentList: any = {
    'telehealth-vs-in-person-consultations': Blog1,
    'telehealth-in-the-present': Blog2
  };
  
  // Data
  const currentComponent = computed(() => {
    const { params }: any = route;
    if (!componentList?.[params?.page]) { // Check if the page is valid, if not return to main page
      navigateTo({ path: '/blog' });
    }
    return componentList[params.page];
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>