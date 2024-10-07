<template>
  <div class="career-template">
    <h1 class="text-h4 font-weight-bold text-primary">{{ data.title }}</h1>
    <p class="text-body-1 text-primary-text-color mt-1 mb-10">{{ data.location }}</p>

    <h2 class="text-h5 font-weight-bold text-secondary-text-color mt-10 mb-4">Join the team</h2>
    <p v-for="(item, index) in data.joinTheTeam" :key="`join-the-team-${index}`" class="text-body-1 text-primary-text-color my-4">{{ item }}</p>

    <h2 class="text-h5 font-weight-bold text-secondary-text-color mt-10 mb-4">About the Position</h2>
    <p v-for="(item, index) in data.aboutThePosition.text" :key="`about-the-position-${index}`" class="text-body-1 text-primary-text-color my-4">{{ item }}</p>
    
    <p class="text-body-1 text-primary-text-color mt-4">Responsibilities:</p>
    <ul class="text-body-1 text-primary-text-color mt-2 mb-4 ml-10 mr-5">
      <li v-for="(item, index) in data.aboutThePosition.responsibilities" :key="`responsibility-${index}`" class="my-1">{{ item }}</li>
    </ul>

    <h2 class="text-h5 font-weight-bold text-secondary-text-color mt-10 mb-4">Minimum Requirements</h2>
    <ul class="text-body-1 text-primary-text-color mt-2 mb-4 ml-10 mr-5">
      <li v-for="(item, index) in data.minimumRequirements" :key="`minimum-requirement-${index}`" class="my-1">{{ item }}</li>
    </ul>

    <p v-for="(item, index) in data.additionalDetails" :key="`additional-details-${index}`" class="text-body-1 text-primary-text-color my-4">{{ item }}</p>
  </div>
</template>

<script lang="ts" setup>
  // Type
  type PropsType = {
    data: {
      title: string;
      location: string;
      joinTheTeam: string[];
      aboutThePosition: {
        text: string[];
        responsibilities: string[];
      };
      minimumRequirements: string[];
      additionalDetails?: string[];
    };
  };

  // Props
  const props = withDefaults(defineProps<PropsType>(), {
    data: () => ({
      title: '',
      location: '',
      joinTheTeam: [],
      aboutThePosition: { text: [], responsibilities: [] },
      minimumRequirements: [],
      additionalDetails: []
    })
  });

  useSeoMeta({ title: (props.data.title || '') });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>