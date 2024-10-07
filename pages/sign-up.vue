<template>
  <LazySignUp />
</template>

<script lang="ts" setup>
  useSeoMeta({ title: 'Sign-Up' });
  definePageMeta({ title: 'Sign-Up', layout: 'main', notAuthenticated: true });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>