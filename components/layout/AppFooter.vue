<template>
  <v-footer id="app-footer" class="flex-grow-0 bg-secondary pa-0">
    <v-container class="py-5 px-0" fluid>
      <v-row class="ma-0">
        <v-col class="d-flex flex-column flex-lg-row justify-space-between pa-0 max-width" cols="12">
          <div v-if="(teleMedicine.length > 0)" class="w-75 pa-4 pb-10 pb-md-10">
            <h2 class="text-h5 pa-1 pb-3">Telemedicine</h2>
            <v-container class="pa-0" fluid>
              <v-row class="ma-0" justify="start" align="center">
                <v-col v-for="(item) in teleMedicine" :key="`telemedicine-${item.slug}`" class="pa-1 pr-6" sm="6" md="4" cols="12">
                  <NuxtLink class="link-to text-body-1 text-white" :to="{ path: '/find-a-doctor', query: { specialization: item.slug } }">{{ item.name }}</NuxtLink>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <!-- <div class="links-wrapper pa-4 pb-10">
            <h2 class="text-h5 pa-1 pb-3">Download the App</h2>
            <v-container class="pa-0" fluid>
              <v-row class="ma-0">
                <v-col class="app-buttons-wrapper d-flex flex-wrap flex-md-nowrap pa-1" cols="12">
                  <NuxtLink class="d-inline-block mb-2 mr-4" href="https://www.apple.com/app-store" target="_blank">
                    <IosButton class="icon" />
                  </NuxtLink>
                  <NuxtLink class="d-inline-block mb-2 mr-4" href="https://play.google.com" target="_blank">
                    <AndroidButton class="icon" />
                  </NuxtLink>
                </v-col>
                <v-col class="social-buttons-wrapper d-flex flex-wrap flex-md-nowrap pa-1" cols="12">
                  <NuxtLink class="d-inline-block mb-2 mr-4" href="https://www.facebook.com" target="_blank">
                    <Facebook class="icon" />
                  </NuxtLink>
                  <NuxtLink class="d-inline-block mb-2 mr-4" href="https://twitter.com" target="_blank">
                    <Twitter class="icon" />
                  </NuxtLink>
                  <NuxtLink class="d-inline-block mb-2 mr-4" href="https://www.instagram.com" target="_blank">
                    <Instagram class="icon" />
                  </NuxtLink>
                  <NuxtLink class="d-inline-block mb-2 mr-4" href="https://www.linkedin.com" target="_blank">
                    <Linkedin class="icon" />
                  </NuxtLink>
                </v-col>
              </v-row>
            </v-container>
          </div> -->
        </v-col>
        <v-divider v-if="(teleMedicine.length > 0)" class="mx-4 mb-6" />
        <v-col class="d-flex flex-column flex-md-row justify-space-between align-center text-center py-0 px-4 max-width" cols="12">
          <Logo id="logo" class="icon mb-4 ma-md-0" />
          <p class="text-caption text-uppercase ma-0">
            <NuxtLink class="link-to text-white" :to="{ path: '/privacy-policy' }">Privacy Policy</NuxtLink>
            <span> &vert; </span>
            <NuxtLink class="link-to text-white" :to="{ path: '/term-of-use' }">Term Of Use</NuxtLink>
            <span> &vert; </span>
            <NuxtLink class="link-to text-white" :to="{ path: '/miscellaneous' }">Miscellaneous</NuxtLink>
            <!-- <span> &vert; </span>
            <NuxtLink class="link-to text-white">SiteMap</NuxtLink>
            <span> &vert; </span>
            <NuxtLink class="link-to text-white" :to="{ path: '/find-a-doctor' }">Find A Doctor</NuxtLink> -->
            <span> &vert; </span>
            <NuxtLink class="link-to text-white" :to="{ path: '/blog' }">Blog</NuxtLink>
            <!-- <span> &vert; </span>
            <NuxtLink class="link-to text-white" :to="{ path: '/careers' }">Careers</NuxtLink> -->
            <span> &vert; </span>
            <NuxtLink class="link-to text-white" :to="{ path: '/medical-providers' }">Medical Providers</NuxtLink>
            <!-- <span> &vert; </span>
            <NuxtLink class="link-to text-white">Contact Us</NuxtLink> -->
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts" setup>
  import Logo from '@/public/images/logo/logo.svg';
  // import IosButton from '@/public/images/common/ios-button.svg';
  // import AndroidButton from '@/public/images/common/android-button.svg';
  // import Facebook from '@/public/images/footer/facebook.svg';
  // import Twitter from '@/public/images/footer/twitter.svg';
  // import Instagram from '@/public/images/footer/instagram.svg';
  // import Linkedin from '@/public/images/footer/linkedin.svg';

  import { VFooter, VContainer, VRow, VCol, VDivider } from 'vuetify/components';

  // Type
  import type { SpecializationType } from '@/types/api';

  // Special Data
  // const { specialization } = useStore();

  // Data
  const teleMedicine = ref<SpecializationType[]>([
    // { name: 'Cardiology' },
    // { name: 'Dermatology' },
    // { name: 'Endocrinology' },
    // { name: 'Gastroenterology' },
    // { name: 'Gynecology' },
    // { name: 'Neurology' },
    // { name: 'Oncology' },
    // { name: 'Pathology' },
    // { name: 'Pediatrics' },
    // { name: 'Primary Care' },
    // { name: 'Psychiatry' }
  ]);

  // API Requestor
  // const specializationData = specialization.fetchList();
  // await specializationData.suspense();
  // if (specializationData.isSuccess.value) {
  //   teleMedicine.value = [ ...specializationData.data.value.data ];
  // }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #app-footer {
    .v-container {
      align-items: center;
      justify-content: center;

      .v-row {
        justify-content: center;

        #logo {
          width: 9rem;
          z-index: 1;

          /* polygon {
            fill: rgb(var(--v-theme-on-primary)) !important;
          }

          path {
            fill: rgb(var(--v-theme-on-primary)) !important;
          } */
        }

        .links-wrapper {
          /* width: 120rem; */

          .social-buttons-wrapper {
            .icon {
              width: 30px;

              &:hover {
                rect {
                  fill: rgb(var(--v-theme-primary-light))
                }
              }
            }
          }
        }
      }
    }

    .app-buttons-wrapper {
      .icon {
        width: 190px;
      }
    }
  }

  .mobileOrTabletView {
    #app-footer {
      .app-buttons-wrapper {
        .icon {
          width: 150px;
        }
      }
    }
  }
</style>