<template>
  <v-container class="pa-0" fluid>
    <v-row class="pa-4 pt-0 ma-0">
      <v-expand-transition>
        <v-col v-if="(form === 'personal')" class="pa-0" cols="12">
          <ProfilePersonalForm @change="handleChangePassword" />
        </v-col>
      </v-expand-transition>

      <v-expand-transition>
        <v-col v-if="(form === 'password')" class="pa-0" cols="12">
          <ProfilePasswordForm @cancel="handleCancelChangePassword" />
        </v-col>
      </v-expand-transition>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  // Data
  const form = ref<'personal' | 'password'>('personal');

  //Methods
  const handleChangePassword = () => {
    form.value = 'password';
    window.scrollTo(0, 0);
  };

  const handleCancelChangePassword = () => {
    form.value = 'personal';
    window.scrollTo(0, 0);
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>