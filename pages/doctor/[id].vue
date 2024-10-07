<template>
  <LazyDoctor />
</template>

<script lang="ts" setup>
  useSeoMeta({ titleTemplate: (titleChunk) => ((titleChunk) ? `${titleChunk} | Doctor | ${import.meta.env.VITE_APP_NAME || 'FastDoc'}` : `Doctor | ${import.meta.env.VITE_APP_NAME || 'FastDoc'}`) });
  definePageMeta({ title: 'Doctor', layout: 'main' });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>