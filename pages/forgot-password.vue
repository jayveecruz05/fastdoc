<template>
  <LazyForgotPassword />
</template>

<script lang="ts" setup>
  useSeoMeta({ title: 'Forgot Password' });
  definePageMeta({ title: 'Forgot Password', layout: 'main', notAuthenticated: true });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>