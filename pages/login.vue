<template>
  <LazyLogin />
</template>

<script lang="ts" setup>
  useSeoMeta({ title: 'Login' });
  definePageMeta({ title: 'Login', layout: 'main', notAuthenticated: true });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>