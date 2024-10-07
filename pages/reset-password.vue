<template>
  <LazyResetPassword />
</template>

<script lang="ts" setup>
  useSeoMeta({ title: 'Reset Password' });
  definePageMeta({ title: 'Reset Password', layout: 'main', notAuthenticated: true });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>