<template>
  <div :class="['doctor-template pa-3', { recommended }]">
    <v-card class="d-flex flex-column align-start text-left" rounded="lg" color="primary-background" hover>
      <div v-if="(recommended)" class="ribbon ribbon-top-right">
        <span>Recommended</span>
      </div>
      <v-container class="main-container rounded-lg pa-0" fluid>
        <v-row class="ma-0">
          <v-col class="pa-0" cols="12">
            <v-container class="pa-5 pb-0" fluid>
              <v-row class="ma-0" align="start">
                <v-col class="pa-0 pb-3 pr-3" sm="auto" md="auto" cols="12">
                  <v-avatar v-if="(data?.image)" size="80">
                    <v-img loading="lazy" :src="data.image" :lazy-src="data.image" :alt="data.name" />
                  </v-avatar>
                  <v-avatar v-else size="80" color="secondary-background">
                    <v-icon icon="mdi-doctor" color="secondary-text-color" size="60" />
                  </v-avatar>
                </v-col>

                <v-col class="pa-0 pb-4 pb-sm-6" sm="auto" md="auto" cols="12">
                  <v-card-title tag="h2" class="text-body-1 font-weight-bold text-primary pa-0 pl-1">{{ data.name }}</v-card-title>
                  <v-card-text tag="p" class="text-primary-text-color pa-0 pl-1">{{ data.specialization }}</v-card-text>
                  <v-card-text class="d-flex align-center flex-wrap text-primary-text-color pa-0">
                    <v-rating :model-value="data.rating" color="yellow-darken-3" density="compact" half-increments readonly />
                    <span class="pt-1 px-1">{{ `${data.rating} ${(data.rating <= 1) ? 'star' : 'stars'}` }} &lpar;{{ `${data.reviews}&nbsp;${(data.reviews <= 1) ? 'review' : 'reviews'}` }}&rpar;</span>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-container>
          </v-col>

          <v-col class="pa-0" cols="12">
            <v-card-text class="text-body-2 text-primary-text-color pa-5 pt-0">{{ data.bio }}</v-card-text>
          </v-col>

          <v-expand-transition>
            <v-col v-if="(showActions)" class="d-flex flex-column d-sm-block pa-0" cols="12">
              <v-btn class="ma-4 mr-sm-0 mt-0" append-icon="mdi-book" size="default" rounded="lg" color="primary" @click="handleBookNow">Book Now</v-btn>
              <v-btn class="text-primary ma-4 mt-0" append-icon="mdi-book-clock" size="default" rounded="lg">Schedule Appointment</v-btn>
            </v-col>
          </v-expand-transition>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
  // Type
  type PropsType = {
    data: {
      id: string | number;
      image?: string;
      name: string;
      specialization: string;
      rating: number;
      reviews: number;
      bio: string;
    };
    recommended?: boolean,
    showActions?: boolean
  };

  // Props
  withDefaults(defineProps<PropsType>(), {
    data: () => ({
      id: '',
      image: '',
      name: '',
      specialization: '',
      rating: 0,
      reviews: 0,
      bio: ''
    }),
    recommended: false,
    showActions: true
  });

  // Methods
  const handleBookNow = () => {
    eventBus.emit('handle-form-navigation', 'next');
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .doctor-template {
    .v-card {
      position: relative;
      overflow: visible;

      .ribbon {
        width: 150px;
        height: 150px;
        overflow: hidden;
        position: absolute;

        &::before, &::after {
          position: absolute;
          z-index: -1;
          content: '';
          display: block;
          border: 5px solid rgb(var(--v-theme-tertiary));
        }

        /* top right */
        &.ribbon-top-right {
          top: -10px;
          right: -10px;

          &::before, &::after {
            border-top-color: transparent;
            border-right-color: transparent;
          }

          &::before {
            top: 0;
            left: 0;
          }

          &::after {
            bottom: 0;
            right: 0;
          }

          span {
            left: -25px;
            top: 45px;
            transform: rotate(45deg);
          }
        }
        /* top right */

        span {
          position: absolute;
          display: block;
          width: 225px;
          padding: 10px 0;
          background-color: rgb(var(--v-theme-primary-light));
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
          color: rgb(var(--v-theme-white-text-color));
          font: 700 1rem/1 'Poppins', sans-serif;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
          text-transform: uppercase;
          text-align: center;
        }
      }
      
      .main-container {
        border: 2px solid transparent;
        box-sizing: border-box;
      }
    }

    &.active {
      .v-card {
        .main-container {
          border: 2px solid rgb(var(--v-theme-primary));
        }
      }
    }
  }
</style>