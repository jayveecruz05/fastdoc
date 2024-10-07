<template>
  <v-card class="d-flex flex-column align-start text-left" rounded="lg" color="tertiary-background" variant="flat" hover>
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

        <v-col class="d-flex flex-column flex-md-row justify-space-between flex-grow-1 pa-0 pb-4 pb-sm-6" sm="auto" md="auto" cols="12">
          <v-container class="pa-0" fluid>
            <v-row class="ma-0">
              <v-col class="text-left pa-0 pl-1" md="8" cols="12">
                <p class="pb-1">
                  <span class="text-body-1 text-capitalize font-weight-bold text-primary">{{ data.name }}</span>
                  <span class="text-body-1 text-capitalize font-italic text-primary-text-color pl-2">{{ data.specialization }}</span>
                </p>
                <p class="text-body-1 text-capitalize text-primary-text-color pb-1">{{ data.lastMessage }}</p>
              </v-col>

              <v-col class="text-left text-sm-right pa-0 pl-1" md="4" cols="12">
                <p class="text-body-1 text-capitalize text-primary-text-color pb-1">{{ getTimeline(data.lastDate) }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts" setup>
  // Type
  type PropsType = {
    action?: 'default' | 'view';
    data: {
      id: string | number;
      image?: string;
      name: string;
      specialization: string;
      lastMessage: string;
      lastDate: string;
    };
  };

  // Props
  withDefaults(defineProps<PropsType>(), {
    action: 'default',
    data: () => ({
      id: '',
      image: '',
      name: '',
      specialization: '',
      lastMessage: '',
      lastDate: ''
    })
  });

  // Special Data
  const { getTimeline } = useDate();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>