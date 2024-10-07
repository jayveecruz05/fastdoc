<template>
  <LazyCareerPage />
</template>

<script lang="ts" setup>
  useSeoMeta({ titleTemplate: (titleChunk) => ((titleChunk) ? `${titleChunk} | Careers | ${import.meta.env.VITE_APP_NAME || 'FastDoc'}` : `Careers | ${import.meta.env.VITE_APP_NAME || 'FastDoc'}`) });
  definePageMeta({ title: 'Careers', layout: 'main' });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>