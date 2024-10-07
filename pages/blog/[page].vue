<template>
  <LazyBlogPage />
</template>

<script lang="ts" setup>
  useSeoMeta({ titleTemplate: (titleChunk) => ((titleChunk) ? `${titleChunk} | Blog | ${import.meta.env.VITE_APP_NAME || 'FastDoc'}` : `Blog | ${import.meta.env.VITE_APP_NAME || 'FastDoc'}`) });
  definePageMeta({ title: 'Blog', layout: 'main' });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>