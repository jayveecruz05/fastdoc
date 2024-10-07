<template>
  <v-app-bar id="app-header" :height="((mobileOrTabletView) ? 140 : 136.5)">
    <v-container class="pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="pa-0" cols="12">
          <v-container id="top-wrapper" class="d-flex align-center bg-primary py-2" fluid>
            <v-row class="ma-0 max-width" justify="space-between">
              <v-col class="d-flex align-center pa-0" md="auto"> <!-- v-if="(tabletOrDesktopView)" -->
                <Clock class="icon clock" />
                <span class="text-body-2 px-3">Mon &#8722; Sat 7:00 AM &#8722; 12:00 AM EST</span>
              </v-col>
              <!-- <v-col v-if="(isFullyLoggedIn)" class="d-flex align-center justify-end flex-sm-grow-0 pa-0">
                <v-menu offset="10" open-on-click open-on-hover>
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="text" rounded="lg" size="large" color="white">
                      <template v-slot:prepend>
                        <v-avatar v-if="(userDetails?.avatar)" size="36">
                          <v-img loading="lazy" :src="userDetails?.avatar" :lazy-src="userDetails?.avatar" alt="user-photo" />
                        </v-avatar>
                        <v-avatar v-else size="36" color="secondary-background">
                          <v-icon icon="mdi-account" color="secondary-text-color" size="25" />
                        </v-avatar>
                      </template>
                      <span class="text-capitalize">{{ userDetails?.first_name || '' }} {{ userDetails?.last_name || '' }}</span>
                      <template v-slot:append>
                        <v-icon icon="mdi-chevron-down"/>
                      </template>
                    </v-btn>
                  </template>

                  <v-list slim color="primary">
                    <v-list-item v-for="(item, index) in menuList" :key="`menu-item-${index}`" :active="false" :to="{ path: item.path }">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item :active="false" @click="handleLogout">
                      <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
              <v-col v-else class="d-flex align-center flex-grow-0 pa-0 py-1 mx-auto mx-md-0" md="auto">
                <v-btn class="mx-2" variant="text" rounded="lg" color="white" @click="() => { navigateTo({ path: '/login' }); }">Login</v-btn>
                <v-btn class="mx-2 text-tertiary" variant="flat" rounded="lg" @click="() => { navigateTo({ path: '/sign-up' }); }">Sign-Up</v-btn>
              </v-col> -->
            </v-row>
          </v-container>
        </v-col>

        <v-col class="pa-0" cols="12">
          <v-container fluid>
            <v-row class="ma-0 max-width">
              <v-col class="pa-0" md="auto">
                <NuxtLink :to="{ path: '/' }" aria-label="logo">
                  <Logo id="logo" class="icon"/>
                </NuxtLink>
              </v-col>
              <v-spacer />
              <v-col class="d-md-none pa-0 flex-grow-0" md="auto">
                <v-app-bar-nav-icon variant="text" color="primary" @click.stop="eventBus.emit('navigation-drawer')" aria-label="navigation" />
              </v-col>
              <v-col class="navigation d-none d-md-flex align-center pa-0" md="auto" cols="12" aria-label="navigation" role="menu">
                <template v-for="(item) in navigationList" :key="`nav-${item.value}`">
                  <v-menu v-if="(item?.children && item.children.length > 0)" open-on-hover color="red">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" class="v-btn-no-overlay" color="tertiary" append-icon="mdi-chevron-down" :to="{ path: `/${(item.value !== 'index' && item.value) ? item.value : ''}` }" :aria-label="item.title" role="menuitem">{{ item.title }}</v-btn>
                    </template>
                    <v-list id="header-navigation" color="primary">
                      <v-list-item v-for="(cItem, cIndex) in item.children" :key="cIndex" :title="cItem.title" :to="{ path: `${(item.value !== 'index' && item.value) ? `/${item.value}` : ''}/${cItem.value}` }" :aria-label="cItem.title" role="menuitem" />
                    </v-list>
                  </v-menu>
                  <v-btn v-else class="v-btn-no-overlay" variant="text" color="tertiary" :to="{ path: `/${(item.value !== 'index' && item.value) ? item.value : ''}` }" :aria-label="item.title" role="menuitem">{{ item.title }}</v-btn>
                </template>
                <!-- <v-btn icon="mdi-magnify" color="tertiary" /> -->
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import Clock from '@/public/images/header/clock.svg';
  import Logo from '@/public/images/logo/logo.svg';
  // import userPhoto from '@/public/images/common/user-photo.png';

  // import { navigateTo } from '#app';
  import { eventBus } from '#imports';

  import { VAppBar, VAppBarNavIcon, VMenu, VList, VListItem, VContainer, VRow, VCol, VBtn, VSpacer } from 'vuetify/components';

  // Type Check
  type Props = { navigationList?: any[] };

  // Props
  withDefaults(defineProps<Props>(), { navigationList: () => ([]) });

  // Special Data
  // const { isFullyLoggedIn } = useCookies();
  // const { authentication } = useStore();
  const { tabletOrDesktopView, mobileOrTabletView } = useViewPort();

  // Static Data
  // const menuList = [
  //   { title: 'My Profile', path: '/my-profile' },
  //   { title: 'Past Appointments', path: '/my-profile/past-appointments' },
  //   { title: 'Medical Records', path: '/my-profile/medical-records' },
  //   // { title: 'Billing History', path: '/my-profile/billing-history' },
  //   { title: 'Messages', path: '/my-profile/messages' }
  // ];

  // API Requestor
  // const userDetails = { first_name: 'John', last_name: 'Doe', avatar: userPhoto };
  // const { data: userDetails } = authentication.fetchUserDetails();
  // const logout = authentication.logout();

  // Methods
  // const handleLogout = () => {
  //   logout.mutateAsync().then(() => {
  //     eventBus.emit('logout');
  //   }).catch(() => {
  //     eventBus.emit('logout');
  //   });
  // };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #app-header {
    #top-wrapper {
      min-height: 60px;
    }
    
    #logo {
      min-width: 10rem;
      width: 10rem;
    }

    .clock {
      min-width: 1.4rem;
      width: 1.4rem;
    }

    .v-btn {
      &.v-btn-no-overlay {
        .v-btn__overlay {
          display: none;
        }
      }
    }
  }

  .v-overlay-container {
    #header-navigation {
      .v-list-item {
        color: rgb(var(--v-theme-tertiary)) !important;

        &.v-list-item--active {
          .v-list-item-title {
            color: rgb(var(--v-theme-tertiary)) !important;
          }
        }

        &:hover {
          .v-list-item__overlay {
            background-color: currentColor;
            opacity: 0.1;
          }
        }
        
        .v-list-item__overlay {
          background-color: transparent;
          opacity: 0;
        }
      }
    }
  }
</style>