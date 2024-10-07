<template>
  <LazyProfile />
</template>

<script lang="ts" setup>
  useSeoMeta({ title: 'My Profile' });
  definePageMeta({ title: 'My Profile', layout: 'main', requiresAuthentication: true });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>