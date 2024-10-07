<template>
  <ProfileLayout>
    <v-container id="messages-page" class="pa-0" fluid>
      <v-row class="ma-0">
        <v-expand-transition>
          <v-col v-if="(!route.query?.id)" class="pa-0" cols="12">
            <v-container class="pa-7" fluid>
              <v-row class="ma-0">
                <v-col class="pa-0" cols="12">
                  <v-text-field class="search-box" rounded="lg" variant="solo" bg-color="input-background-color" density="default" placeholder="Search..." hide-details clearable append-inner-icon="mdi-magnify" @click:append-inner="handleSearch" @keyup.enter="handleSearch" />
                </v-col>
                <v-col v-for="(data) in messagesList" :key="`message-${data.id}`" class="pa-0 pt-5" cols="12">
                  <MessageTemplate :data="data" @click="() => { handleNavigation(data.id); }" />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-expand-transition>

        <v-expand-transition>
          <v-col v-if="(!!route.query?.id)" class="pa-0" cols="12">
            <Messenger />
          </v-col>
        </v-expand-transition>

        <v-col class="pa-7 pt-0" cols="12">
          <p class="text-body-1 text-capitalize font-weight-bold text-primary-text-color">Need urgent care?</p>
          <p class="text-body-1 text-capitalize text-primary-text-color">
            <span>If you are experiencing an emergency, please dial&nbsp;</span>
            <NuxtLink class="link-to text-primary" href="tel:911">911</NuxtLink>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </ProfileLayout>
</template>

<script lang="ts" setup>
  import doctorPhoto from '@/public/images/common/doctor-photo.png';

  // Static Data
  const messagesList = [
    { id: 1, image: doctorPhoto, name: 'Dr. Lisa Parker', specialization: 'Geriatrician', lastMessage: 'What\'s your questions?', lastDate: '2024/01/01' },
    { id: 2, image: doctorPhoto, name: 'Dr. Lisa Parker', specialization: 'Geriatrician', lastMessage: 'What\'s your questions?', lastDate: '2024/01/01' },
    { id: 3, image: doctorPhoto, name: 'Dr. Lisa Parker', specialization: 'Geriatrician', lastMessage: 'What\'s your questions?', lastDate: '2024/01/01' },
    { id: 4, image: doctorPhoto, name: 'Dr. Lisa Parker', specialization: 'Geriatrician', lastMessage: 'What\'s your questions?', lastDate: '2024/01/01' },
    { id: 5, image: doctorPhoto, name: 'Dr. Lisa Parker', specialization: 'Geriatrician', lastMessage: 'What\'s your questions?', lastDate: '2024/01/01' },
    { id: 6, image: doctorPhoto, name: 'Dr. Lisa Parker', specialization: 'Geriatrician', lastMessage: 'What\'s your questions?', lastDate: '2024/01/01' }
  ];

  // Special Data
  const route = useRoute();

  // Methods
  const handleSearch = () => {};

  const handleNavigation = (messageID: string | number) => {
    navigateTo({ query: { 'id': messageID } });
    window.scrollTo(0, 0);
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #messages-page {
    .search-box {
      .v-field {
        padding: 0;
      }

      .v-field__append-inner {
        background-color: rgb((var(--v-theme-primary)));
        color: rgb((var(--v-theme-surface)));

        .v-icon {
          padding: 28px 30px;
          opacity: 1;
        }
      }
    }
  }
</style>