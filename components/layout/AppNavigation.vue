<template>
  <ClientOnly>
    <v-navigation-drawer id="app-navigation" class="d-md-none" v-model="navigationDrawer" location="left" temporary>
      <v-list aria-label="navigation" role="menu">
        <template v-for="(item, index) in navigationList" :key="index">
          <v-list-group v-if="(item?.children && item.children.length > 0)">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :title="item.title" :active="(route.name === item.value)" :aria-label="item.title" role="menuitem" />
            </template>
            <v-list-item v-for="(cItem, cIndex) in item.children" :key="cIndex" :title="cItem.title" :to="{ path: `${(item?.value !== 'index') ? `/${item.value}` : ''}/${cItem.value}` }" :aria-label="cItem.title" role="menuitem" />
          </v-list-group>
          <v-list-item v-else :title="item.title" :active="(route.name === item.value)" :to="{ path: `/${(item?.value !== 'index') ? item.value : ''}` }" :aria-label="item.title" role="menuitem" />
        </template>
      </v-list>
    </v-navigation-drawer>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { VNavigationDrawer, VList, VListGroup, VListItem } from 'vuetify/components';

  // Type Check
  type Props = { navigationList?: any[] };

  // Props
  withDefaults(defineProps<Props>(), { navigationList: () => ([]) });

  // Special Data
  const route = useRoute();
  const { mobileOrTabletView } = useViewPort();

  // Data
  const navigationDrawer = ref<boolean>(false);

  // Watch
  watch(mobileOrTabletView, () => { navigationDrawer.value = false; }, { flush: 'post' });

  // Event Bus
  eventBus.on('navigation-drawer', (data: any) => { navigationDrawer.value = data ?? !navigationDrawer.value; });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #app-navigation {
    .v-list-item {
      color: rgb(var(--v-theme-tertiary));

      &.v-list-item--active {
        .v-list-item-title {
          color: rgb(var(--v-theme-tertiary));
        }

        .v-list-item__append {
          color: rgb(var(--v-theme-tertiary));
        }

        .v-list-item__overlay {
          display: none;
        }
      }
    }

    .v-list-group {
      .v-list-group__items {
        .v-list-item--active {
          .v-list-item-title {
            color: rgb(var(--v-theme-tertiary));
            font-weight: normal;
          }
        }
      }
    }
  }

  /* .v-navigation-drawer__scrim {
    position: fixed !important;
  } */
</style>