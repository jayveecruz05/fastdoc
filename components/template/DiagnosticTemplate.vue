<template>
  <v-card class="d-flex flex-column align-start text-left" rounded="lg" color="tertiary-background" variant="flat" hover>
    <v-container class="main-container rounded-lg pa-0" fluid>
      <v-row class="ma-0">
        <v-col class="pa-5" cols="12">
          <v-container class="pa-0" fluid>
            <v-row class="ma-0">
              <v-col class="text-left pa-0" md="8" cols="12">
                <p class="pb-1">
                  <span class="text-body-1 text-capitalize font-weight-bold text-primary">Laboratory:</span>
                  <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.laboratory }}</span>
                </p>
                <p class="pb-1">
                  <span class="text-body-1 text-capitalize font-weight-bold text-primary">Request For:</span>
                  <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.requestFor }}</span>
                </p>
              </v-col>

              <v-col class="text-left text-sm-right pa-0" md="4" cols="12">
                <p class="pb-1">
                  <span class="text-body-1 text-capitalize font-weight-bold text-primary">Date:</span>
                  <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ getFullDate(data.date) }}</span>
                </p>
                <p class="pb-1">
                  <span class="text-body-1 font-weight-bold text-primary">Requested By:</span>
                  <span class="text-body-1 text-capitalize text-primary-text-color pl-2">{{ data.requestBy }}</span>
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col class="pa-5 pt-0" cols="12">
          <p class="text-body-1 text-capitalize font-weight-bold text-secondary-text-color pb-1">Findings:</p>
          <p class="text-body-1 text-capitalize text-primary-text-color">{{ data.findings }}</p>
          <!-- <v-container class="pa-0" fluid>
            <v-row class="ma-0">
              <v-col v-for="(findings, index) in data.findings" :key="`findings-${index}`" class="pt-0 pb-1 pl-0" sm="6" md="4" lg="3" cols="12">
                <p class="text-body-1 text-capitalize text-primary-text-color">{{ findings }}</p>
              </v-col>
            </v-row>
          </v-container> -->
        </v-col>

        <v-col class="pa-5 pb-4 pt-0" cols="12">
          <v-container class="pa-0" fluid>
            <v-row class="ma-0">
              <v-col v-for="(file, index) in data.files" :key="`file-${index}`" class="pt-0 pb-2 pl-0" cols="auto">
                <p class="d-flex align-center text-body-2 bg-tertiary text-white pa-2 rounded-lg">
                  <v-icon icon="mdi-paperclip" />
                  <span class="px-1">{{ file }}</span>
                </p>
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
    data: {
      id: string | number;
      laboratory: string;
      requestFor: string;
      requestBy: string;
      date: string;
      findings: string;
      files: string[] | null;
      npi?: string;
    };
  };

  // Props
  withDefaults(defineProps<PropsType>(), {
    data: () => ({
      id: '',
      laboratory: '',
      requestFor: '',
      requestBy: '',
      date: '',
      findings: '',
      files: []
    })
  });

  // Special Data
  const { getFullDate } = useDate();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>