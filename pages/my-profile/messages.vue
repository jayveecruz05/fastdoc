<template>
  <LazyMessages />
</template>

<script lang="ts" setup>
  useSeoMeta({ title: 'Messages | My Profile' });
  definePageMeta({ title: 'Messages | My Profile', layout: 'main', requiresAuthentication: true });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>