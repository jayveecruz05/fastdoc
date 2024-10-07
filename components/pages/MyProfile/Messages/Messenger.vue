<template>
  <v-container id="messenger-page" class="pa-0" fluid>
    <v-row class="pa-7 ma-0">
      <v-col class="pa-0" cols="12">
        <v-container class="pa-0" fluid>
          <v-row class="ma-0" align="start">
            <v-col class="d-flex justify-end flex-grow-1 pa-0 pb-3" cols="12">
              <v-btn size="default" rounded="lg" color="primary" @click="handleBack">Back</v-btn>
            </v-col>

            <v-col class="pa-0 pb-3 pr-3" sm="auto" md="auto" cols="12">
              <v-avatar v-if="(messageData?.image)" size="80">
                <v-img loading="lazy" :src="messageData.image" :lazy-src="messageData.image" :alt="messageData.name" />
              </v-avatar>
              <v-avatar v-else size="80" color="secondary-background">
                <v-icon icon="mdi-doctor" color="secondary-text-color" size="60" />
              </v-avatar>
            </v-col>

            <v-col class="flex-grow-1 text-left pa-0 pl-1" sm="auto" md="auto" cols="12">
              <p class="text-body-1 text-capitalize font-weight-bold text-primary pb-1">{{ messageData.name }}</p>
              <p class="text-body-1 text-capitalize font-italic text-primary-text-color pb-1">{{ messageData.specialization }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-divider class="my-4" />

      <v-col class="messages-wrapper pa-0" cols="12">
        <v-container class="pa-0" fluid>
          <v-row class="flex-column ma-0">
            <v-col v-for="(message) in messageData.messages" :key="`message-${message.id}`" class="d-flex pa-0 py-4" cols="12">
              <div v-if="(message.messageFrom === 'other')" class="pr-3">
                <v-avatar v-if="(doctorPhoto)" size="55">
                  <v-img loading="lazy" :src="doctorPhoto" :lazy-src="doctorPhoto" alt="doctor-image" />
                </v-avatar>
                <v-avatar v-else size="55" color="secondary-background">
                  <v-icon icon="mdi-doctor" color="secondary-text-color" size="35" />
                </v-avatar>
              </div>

              <div :class="`message message-from-${message.messageFrom}`">
                <p :class="`${(message.messageFrom === 'self') ? 'bg-secondary-background text-primary-text-color' : 'bg-primary text-white'} message-wrapper text-body-1 text-left rounded-lg pa-3`">{{ message.message }}</p>
                <p :class="`${(message.messageFrom === 'self') ? 'text-right' : 'text-left'} text-primary-text-color pa-3`">{{ getFullDateAndTime(message.date) }}</p>
              </div>
              
              <div v-if="(message.messageFrom === 'self')" class="pl-3">
                <v-avatar v-if="(userPhoto)" size="55">
                  <v-img loading="lazy" :src="userPhoto" :lazy-src="userPhoto" alt="user-image" />
                </v-avatar>
                <v-avatar v-else size="55" color="secondary-background">
                  <v-icon icon="mdi-account" color="secondary-text-color" size="35" />
                </v-avatar>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col class="d-flex align-center pa-0 pt-4" cols="12">
        <v-text-field rounded="lg" variant="solo" bg-color="input-background-color" density="default" placeholder="Write your message" hide-details append-inner-icon="mdi-paperclip" @click:append-inner="handleInsertFile" @keyup.enter="handleSendMessage" />
        <v-tooltip text="Send" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="ml-3" size="large" rounded="lg" color="primary" icon="mdi-send" @click="handleSendMessage" />
          </template>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import doctorPhoto from '@/public/images/common/doctor-photo.png';
  import userPhoto from '@/public/images/common/user-photo.png';

  // Static Data
  const messageData = {
    image: doctorPhoto,
    name: 'Dr. Lisa Parker',
    specialization: 'Geriatrician',
    messages: [
      { id: 1, messageFrom: 'self', message: 'Nullam placerat viverra varius. Nulla nec ligula aliquet, tempor lacus non, elementum tortor.', date: '2023/12/01' },
      { id: 2, messageFrom: 'other', message: 'Suspendisse varius risus at risus porta faucibus. Quisque tortor nisi, mollis eget massa vitae, tristique luctus ligula. Nulla nec semper nisi.', date: '2023/12/15' },
      { id: 3, messageFrom: 'self', message: 'Hey Dr. Lisa, can I ask you something?', date: '2023/12/25' },
      { id: 4, messageFrom: 'other', message: 'What\'s your questions?', date: '2024/01/01' }
    ]
  };

  // Special Data
  const { getFullDateAndTime } = useDate();
  
  // Methods
  const handleBack = () => {
    navigateTo({ path: '/my-profile/messages' });
    window.scrollTo(0, 0);
  };

  const handleInsertFile = () => {};

  const handleSendMessage = () => {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #messenger-page {
    .message {
      max-width: 80%;

      &.message-from-self {
        margin-left: auto;
      }

      .message-wrapper {
        width: fit-content;
      }
    }
  }
</style>