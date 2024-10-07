<template>
  <v-menu v-model="datePicker.menu" :close-on-content-click="false" transition="scale-transition" min-width="100%" :disabled="(disabled || readonly)">
    <template v-slot:activator="{ props }">
      <v-text-field
        v-bind="props"
        v-model="datePicker.value"
        :id="id"
        :value="datePicker.value?.toLocaleDateString()"
        :class="['date-picker mb-2', { readonly }]"
        :placeholder="placeholder"
        rounded="lg"
        variant="solo"
        bg-color="input-background-color"
        density="default"
        :append-inner-icon="appendInnerIcon"
        :type="type"
        @click:append-inner="() => { $emit('click:append-inner'); }"
        :clearable="clearable"
        :tabindex="tabindex"
        :disabled="(disabled || loading)"
        :rules="rules"
        :error-messages="errorMessages"
        readonly
        @update:modelValue="handleDateSave"
      />
    </template>
    <v-date-picker
      v-model="datePicker.value"
      :min="min"
      :max="max"
      :color="color"
      :view-mode="viewMode"
      @update:modelValue="handleDateSave"
    />
  </v-menu>
</template>

<script lang="ts" setup>
  // Type
  type DatePickerType = {
    value?: Date | null;
    menu?: boolean
  };

  type PropsType = {
    modelValue?: Date | null;
    id?: string;
    loading?: boolean;
    min?: any;
    max?: any;
    viewMode?: 'month' | 'year' | 'months';
    placeholder?: string;
    color?: string;
    appendInnerIcon?: any;
    type?: string;
    clearable?: boolean;
    tabindex?: any;
    disabled?: boolean;
    readonly?: boolean;
    rules?: any[];
    errorMessages?: string | readonly string[] | null | undefined
  };

  // Props
  const props = withDefaults(defineProps<PropsType>(), {
    modelValue: undefined,
    id: undefined,
    loading: false,
    min: '1920/01/01',
    max: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
    viewMode: 'month',
    placeholder: 'Select Date',
    color: 'primary',
    appendInnerIcon: 'mdi-calendar',
    type: 'text',
    clearable: false,
    tabindex: undefined,
    disabled: false,
    readonly: false,
    rules: () => ([]),
    errorMessages: null
  });

  const visible = ref<boolean>(false);

  // Emits
  const emit = defineEmits([ 'update:modelValue', 'click:append-inner' ]);

  // Data
  const datePicker = reactive<DatePickerType>({ value: props.modelValue, menu: false });

  // Watcher
  watch(() => (props.modelValue), (to) => { datePicker.value = to; }, { flush: 'post' });

  // Methods
  const handleDateSave = () => {
    datePicker.menu = false;
    emit('update:modelValue', datePicker.value);
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .date-picker {
    &:not(.readonly) {
      .v-input__control {
        .v-field {
          cursor: pointer !important;

          input {
            cursor: pointer !important;
          }
        }
      }
    }
  }
</style>