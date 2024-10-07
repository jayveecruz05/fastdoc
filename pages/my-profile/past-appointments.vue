<template>
  <LazyPastAppointments />
</template>

<script lang="ts" setup>
  useSeoMeta({ title: 'Past Appointments | My Profile' });
  definePageMeta({ title: 'Past Appointments | My Profile', layout: 'main', requiresAuthentication: true });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>