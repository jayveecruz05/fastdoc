<template>
  <v-container id="my-profile" class="bg-tertiary-background fill-height align-start py-12" fluid>
    <v-row class="max-width ma-0">
      <v-col class="text-left pt-0" cols="12">
        <h1 class="text-h4 font-weight-bold text-primary mb-5">{{ pathTitle }}</h1>
      </v-col>

      <v-col class="text-left pt-0" cols="12">
        <v-container class="pa-0" fluid>
          <v-row class="ma-0">
            <v-col class="d-none d-md-block pa-0 pb-6 pb-md-0 pr-md-6" md="3" cols="12">
              <v-card class="menu-wrapper" rounded="lg" color="primary-background">
                <v-card-text class="px-0">
                  <v-list class="text-primary-text-color pa-0" slim color="primary">
                    <v-list-item v-for="(item, index) in menuList" :key="`menu-item-${index}`" class="pr-10" :to="{ path: item.path }">
                      <template v-slot:prepend>
                        <v-icon size="25" :icon="item.icon" />
                      </template>
                      <v-list-item-title class="font-weight-medium">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col class="pa-0" md="9" cols="12">
              <v-card rounded="lg" color="primary-background">
                <v-card-text class="pa-0">
                  <slot></slot>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  // Special Data
  const route = useRoute();

  // Static Data
  const menuList = [
    { title: 'My Profile', icon: 'mdi-account-outline', path: '/my-profile' },
    { title: 'Past Appointments', icon: 'mdi-notebook-outline', path: '/my-profile/past-appointments' },
    { title: 'Medical Records', icon: 'mdi-folder-open-outline', path: '/my-profile/medical-records' },
    // { title: 'Billing History', icon: 'mdi-wallet-bifold-outline', path: '/my-profile/billing-history' },
    { title: 'Messages', icon: 'mdi-forum-outline', path: '/my-profile/messages' }
  ];

  // Data
  const pathTitle = computed(() => (menuList.find((item) => (item.path === route.path))?.title || 'My Profile'));
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #my-profile {
    .menu-wrapper {
      position: sticky;
      top: 170px;
      left: 0;

      .v-list {
        .v-list-item {
          /* border-right: 3px solid transparent; */
          box-sizing: border-box;

          &.v-list-item--active {
            border-right: 3px solid;
          }
        }
      }
    }
  }
</style>