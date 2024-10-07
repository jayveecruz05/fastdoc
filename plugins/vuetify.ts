import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import 'vuetify/styles';
// import { VApp, VAppBar, VAppBarNavIcon, VMain, VFooter, VNavigationDrawer, VMenu, VList, VListGroup, VListItem, VListItemTitle, VContainer, VRow, VCol, VAvatar, VImg, VIcon, VCard, VCardTitle, VCardText, VCardActions, VBtn, VForm, VAutocomplete, VTextField, VTextarea, VSelect, VRadio, VChip, VCheckbox, VTooltip, VPagination, VRating, VDialog, VAlert, VProgressLinear, VExpansionPanels, VExpansionPanel, VExpansionPanelTitle, VExpansionPanelText, VExpandTransition, VFadeTransition, VScrollYTransition, VDivider, VSpacer } from 'vuetify/components';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    // components: { VApp, VAppBar, VAppBarNavIcon, VMain, VFooter, VNavigationDrawer, VMenu, VList, VListGroup, VListItem, VListItemTitle, VContainer, VRow, VCol, VAvatar, VImg, VIcon, VCard, VCardTitle, VCardText, VCardActions, VBtn, VForm, VAutocomplete, VTextField, VTextarea, VSelect, VRadio, VChip, VCheckbox, VTooltip, VPagination, VRating, VDialog, VAlert, VProgressLinear, VExpansionPanels, VExpansionPanel, VExpansionPanelTitle, VExpansionPanelText, VExpandTransition, VFadeTransition, VScrollYTransition, VDivider, VSpacer },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi }
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            'primary-background': '#FFFFFF',
            'secondary-background': '#EDEDED',
            'tertiary-background': '#F3F3F3',
            'surface': '#FFFFFF',
            'primary': '#0090BA',
            'primary-light': '#0DC8FF',
            'secondary': '#253B42',
            'tertiary': '#3C5D67',
            'white-text-color': '#FFFFFF',
            'primary-text-color': '#6B6B6B',
            'secondary-text-color': '#3C5D67',
            'tertiary-text-color': '#ABA8A8',
            'specialization-color': '#D5E3E7',
            'input-background-color': '#FFFFFF',
            'chip-color': '#5C7B84'
          }
        }
      }
    }
  })
  app.vueApp.use(vuetify);
});