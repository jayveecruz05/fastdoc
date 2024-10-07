<template>
  <v-col id="featured-content-3" class="content pa-0" cols="12">
    <v-container class="max-width pa-0" fluid>
      <v-row class="ma-0 my-10" align="center">
        <v-col class="text-center mt-5" cols="12">
          <h1 class="tagline mb-2">Getting started with FastDoc is easy</h1>
        </v-col>

        <v-col class="text-center" cols="12">
          <v-container class="pa-0" fluid>
            <v-row class="ma-0">
              <v-col v-for="(content, index) in contentList" :key="`content-${index}`" sm="6" lg="3" cols="12">
                <v-card class="content-card fill-height text-center cursor-default pa-5" rounded="lg" variant="flat" hover>
                  <component class="content-icon ma-3 mt-6" :is="content.image" />
                  <v-card-title tag="h2" class="font-weight-bold text-secondary-text-color px-2 pb-5">{{ content.title }}</v-card-title>
                  <v-card-text tag="p" class="text-body-1 text-primary-text-color px-3">{{ content.text }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script lang="ts" setup>
  import ContentIcon1 from '@/public/images/pages/featured/content-3/content-icon-1.svg';
  import ContentIcon2 from '@/public/images/pages/featured/content-3/content-icon-2.svg';
  import ContentIcon3 from '@/public/images/pages/featured/content-3/content-icon-3.svg';
  import ContentIcon4 from '@/public/images/pages/featured/content-3/content-icon-4.svg';

  // Data
  const contentList = [
    { title: 'Tell us about yourself', image: ContentIcon1, text: 'Sign-up is optional. Simply provide your personal information and insurance details, it’s just that easy!' },
    { title: 'Provide your symptoms', image: ContentIcon2, text: 'Enter your symptoms to ensure you\'re connected with the right doctor.' },
    { title: 'Connect with a doctor', image: ContentIcon3, text: 'A licensed physician will be available to see you virtually within minutes.' },
    { title: 'Get Treated', image: ContentIcon4, text: 'Discuss your condition, receive a diagnosis, and get a treatment plan tailored to your needs.' }
  ];
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #featured-content-3 {
    background-color: rgba(var(--v-theme-primary-background));
    
    .tagline {
      font-size: 2rem !important;
      font-weight: 700;
      line-height: normal;
      color: rgb((var(--v-theme-primary)));
    }

    .content-card {
      &:hover {
        box-shadow: 0px 5px 5px -3px rgba(var(--v-theme-primary), 0.2), 0px 8px 10px 1px rgba(var(--v-theme-primary), 0.14), 0px 3px 14px 2px rgba(var(--v-theme-primary), 0.12);
      }

      .content-icon {
        width: 130px;
        height: 130px;
      }
    }
  }
</style>