<template>
  <v-container id="auth" class="fill-height pa-0" fluid>
    <v-row class="fill-height ma-0">
      <slot></slot>
      <v-col class="content" md="7" lg="8" cols="12"></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #auth {
    .auth-form {
      min-height: 33.75em;
      background-color: rgba(var(--v-theme-tertiary-background));

      .form-wrapper {
        width: 100%;
      }
    }

    .content {
      background-color: rgba(var(--v-theme-primary-background));
      background-image: url('@/public/images/pages/auth/background.webp');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  .mobileOrTabletView {
    #auth {
      .auth-form {
        min-height: auto;
      }
      
      .content {
        height: 25em;
      }
    }
  }

  .tabletBreakpoint {
    #auth {
      .auth-form {
        min-height: auto;
      }
      
      .content {
        height: 40em;
      }
    }
  }
</style>