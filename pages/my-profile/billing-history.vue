<template>
  <LazyBillingHistory />
</template>

<script lang="ts" setup>
  useSeoMeta({ title: 'Billing History | My Profile' });
  definePageMeta({ title: 'Billing History | My Profile', layout: 'main', requiresAuthentication: true });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>