<template>
  <v-col id="featured-content-6" class="content pa-0" cols="12">
    <v-container class="max-width pa-0" fluid>
      <v-row class="ma-0 my-10 pa-3" align="center">
        <v-col class="text-center mt-5" cols="12">
          <h2 class="text-body-1 text-primary-text-color font-weight-bold text-uppercase">We are here for you</h2>
          <h1 class="tagline text-primary mb-2">Frequently Asked Questions</h1>
        </v-col>

        <v-col class="mb-10" cols="12">
          <v-expansion-panels class="custom-expansions" bg-color="transparent" flat rounded="0" variant="accordion">
            <v-expansion-panel v-for="(item) in questionsList" :key="`question-${item.id}`">
              <v-expansion-panel-title class="text-body-1 font-weight-bold text-secondary-text-color pa-6">{{ item.title }}</v-expansion-panel-title>
              <v-expansion-panel-text class="text-body-1 text-primary-text-color">{{ item.text }}</v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script lang="ts" setup>
  // Data
  const questionsList = [
    { id: 1, title: 'How much does it cost to book a consultation?', text: 'As long as you meet the requirements set by your insurance company, you can expect a $0 out of pocket cost for your consultation.' },
    { id: 2, title: 'Can I schedule an appointment?', text: 'As long as you meet the requirements set by your insurance company, you can expect a $0 out of pocket cost for your consultation.' },
    { id: 3, title: 'Why did my insurance send me a bill?', text: 'As long as you meet the requirements set by your insurance company, you can expect a $0 out of pocket cost for your consultation.' },
    { id: 4, title: 'Can I book a consultation anytime?', text: 'As long as you meet the requirements set by your insurance company, you can expect a $0 out of pocket cost for your consultation.' },
  ];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #featured-content-6 {
    background-color: rgba(var(--v-theme-secondary-background));
    
    .tagline {
      font-size: 2rem !important;
      font-weight: 700;
      line-height: normal;
      color: rgb((var(--v-theme-primary)));
    }

    .custom-expansions {
      max-width: 1024px;
      margin: 0 auto;

      .v-expansion-panel {
        border-top: 2px solid rgba(var(--v-theme-secondary-text-color), 0.5);

        &:last-child {
          border-bottom: 2px solid rgba(var(--v-theme-secondary-text-color), 0.5);
        }

        .v-expansion-panel-title {
          flex-direction: row-reverse;
          justify-content: start;

          .v-expansion-panel-title__icon {
            margin-left: 0;
            padding-right: 10px;
          }
        }
      }
    }
  }
</style>