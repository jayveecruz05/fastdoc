<template>
  <LazyMedicalRecords />
</template>

<script lang="ts" setup>
  useSeoMeta({ title: 'Medical Records | My Profile' });
  definePageMeta({ title: 'Medical Records | My Profile', layout: 'main', requiresAuthentication: true });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>