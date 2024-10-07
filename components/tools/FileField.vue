<template>
  <v-file-input value="" :class="['file-field', { 'image-avatar': imageAvatar }]" :style="[{ '--height': height }]" autocomplete="off" prepend-icon="" type="file" :title="(file?.model?.map((file: File) => (file?.name))?.toLocaleString()?.replace(/,/ig, ', ') || 'No file chosen')" :accept="acceptFileType" :capture="(imageFile || imageAvatar)" flat variant="outlined" :base-color="color" :color="color" :dirty="(!!file?.model && !disabled)" :clearable="(!!file?.model || !!error)" :persistent-clear="(!!file?.model && !disabled)" :clear-icon="clearIcon" :multiple="(multiple && !imageAvatar && !imageFile)" :disabled="disabled" :error-messages="error" :rules="((!!file?.model) ? [] : rules)" @input.native="inputFile" @click:clear="clear">
    <template v-slot:prepend-inner>
      <slot v-if="(!file?.model)" name="file-input">
        <div v-if="(imageAvatar)">
          <v-avatar size="150" color="secondary-background">
            <v-icon icon="mdi-account" color="secondary-text-color" size="120" />
          </v-avatar>
          <v-btn v-if="(!disabled)" class="camera-icon" size="small" icon variant="flat" color="secondary">
            <v-icon size="x-large" icon="mdi-camera" />
          </v-btn>
        </div>

        <div v-else class="custom-ui-wrapper d-flex flex-column flex-sm-row align-center justify-space-between pa-5">
          <div class="d-flex flex-column flex-sm-row align-center">
            <v-icon class="file-icon mr-0 mr-sm-4" size="50" :color="color" :icon="(imageFile) ? ((mobileOrTabletView) ? 'mdi-camera' : 'mdi-image') : 'mdi-file'" />
            <span :class="`text text-body-1 text-center pa-4 text-${color}`">{{ (mobileOrTabletView) ? 'Take a Photo' : 'Drag and Drop' }} or Browse</span>
          </div>
          <v-btn class="ma-2" variant="outlined" :color="color">Upload</v-btn>
        </div>
      </slot>
      <slot v-else name="file-output">
        <template v-if="(imageAvatar)">
          <v-avatar class="image-avatar" size="150">
            <v-img :src="file?.content" :lazy-src="file?.content" :alt="file?.model?.[0]?.name" />
          </v-avatar>
          <v-btn v-if="(!disabled)" class="camera-icon" size="small" icon variant="flat" color="secondary">
            <v-icon size="x-large" icon="mdi-camera" />
          </v-btn>
        </template>

        <div v-else-if="(imageFile)" class="custom-ui-wrapper d-flex align-center">
          <NuxtImg class="image-file" loading="lazy" :src="file?.content" :alt="file?.model?.[0]?.name" />
        </div>

        <div v-else class="custom-ui-wrapper d-flex flex-column flex-sm-row align-center justify-center justify-sm-space-between pa-5">
          <div class="file-holder d-flex flex-column flex-sm-row align-center">
            <v-icon class="file-icon mr-0 mr-sm-4" size="50" :color="color" :icon="((multiple && file?.model?.length > 1) ? 'mdi-file-multiple' : 'mdi-file')" />
            <div :class="`text text-center text-sm-left pa-0 px-2 text-${color}`">
              <p class="ma-0 text-body-1 pt-2 px-2">{{ `Added ${(multiple && file?.model?.length > 1) ? 'Files' : 'File'}` }}</p>
              <!-- <p class="ma-0 text-body-2 py-2">{{ file?.model?.map((file: File) => (file?.name))?.toLocaleString()?.replace(/,/ig, ', ') }}</p> -->
              <p class="files-wrapper ma-0 text-body-2 py-2" @click.stop>
                <v-chip v-for="(fileInfo, index) in file?.model" :key="`file-${index}`" class="rounded-lg ma-1 px-0">
                  <span class="px-4">{{ fileInfo.name }}</span>
                  <v-icon v-if="(multiple)" class="mr-2" icon="mdi-close-circle" @click="() => { handleRemoveFile(fileInfo); }" />
                </v-chip>
              </p>
            </div>
          </div>
          <div v-if="(!multiple)" class="fill-width d-flex flex-column flex-sm-row">
            <v-btn class="ma-2" variant="outlined" :color="color">Replace</v-btn>
          </div>
        </div>
      </slot>
    </template>

    <template v-if="(!!file?.model && (imageFile || imageAvatar))" v-slot:clear="{ props }">
      <v-btn v-bind="props" icon="mdi-delete" size="x-small" variant="flat" color="red-lighten-1" />
    </template>
  </v-file-input>
</template>

<script lang="ts" setup>
  // Type
  import type { FileType } from '@/types/form-data';

  type PropsType = {
    modelValue?: FileType | null;
    imageFile?: boolean;
    imageAvatar?: boolean;
    accept?: string;
    maxDimensions?: string; // 300x250
    maxFileSize?: number; // Bytes (in binary) https://www.gbmb.org/mb-to-bytes
    maxFileCount?: number;
    rules?: any[];
    height?: string | number;
    color?: string;
    clearIcon?: string;
    disabled?: boolean;
    multiple?: boolean;
  };

  // Props
  const props = withDefaults(defineProps<PropsType>(), {
    modelValue: undefined,
    imageFile: undefined,
    imageAvatar: undefined,
    accept: undefined,
    maxDimensions: undefined,
    maxFileSize: undefined,
    maxFileCount: undefined,
    rules: () => ([]),
    height: undefined,
    color: 'primary',
    clearIcon: '$clear',
    disabled: false,
    multiple: false
  });

  // Emits
  const emit = defineEmits([ 'update:modelValue' ]);

  // Special Data
  const { mobileOrTabletView } = useViewPort();

  // Data
  const file = reactive<FileType>({ model: undefined, content: undefined, ...props.modelValue });
  const acceptFileType = computed(() => ((props.imageFile || props.imageAvatar) ? 'image/png, image/jpeg' : props.accept));
  const error = ref<string>();

  // Watcher
  watch(() => (props.modelValue), (to) => {
    const { model, content } = to || {};
    file.model = model;
    file.content = content;
  }, { flush: 'post' });

  // Methods
  const inputFile = (eventFile: any) => {
    // console.log({ eventFile, file, maxDimensions: props.maxDimensions, maxFileSize: props.maxFileSize, maxFileCount: props.maxFileCount });
    const currentFileList = (eventFile?.target?.files.length > 0) ? [ ...((props.multiple && Array.isArray(file?.model)) ? file.model.filter((currentFile: File) => (![ ...eventFile?.target?.files ].some((inputFile: File) => (inputFile.name === currentFile.name)))) : []), ...eventFile?.target?.files ] : ((Array.isArray(eventFile)) ? eventFile : null);
    if (currentFileList) { // Input File Check
      const validFileTypes = acceptFileType.value?.replace(/\s/ig, '').split(',') || [];
      const validFileTypesRegex = new RegExp(`${validFileTypes.join('|').replace(/\/\*/ig, '').replace(/\./ig, '').replace(/\//ig, '\\/')}`);
      const isValidFileType = currentFileList.every((file: File) => (validFileTypesRegex.test(file.type)));
      error.value = undefined;
      file.model = currentFileList;
      if (isValidFileType) { // File Type Check
        if (!props.maxFileSize || (props.maxFileSize && currentFileList.every((file: File) => (file.size <= Number(props.maxFileSize))))) { // File Size Check
          if (!props.maxFileCount || (typeof props.maxFileCount === 'number' && Array.isArray(currentFileList) && currentFileList.length > 0 && currentFileList.length <= props.maxFileCount)) { // File Count Check
            const fileReader = new FileReader();
            fileReader.onload = (frEvent: any) => {
              file.content = frEvent.target.result;
              if (/image/ig.test(currentFileList?.[0]?.type)) {
                const image = new Image();
                image.onload = () => {
                  if (props.maxDimensions) {
                    const [ dWidth, dHeight ] = props.maxDimensions.split('x');
                    const { width, height } = image;
                    // console.log(parseInt(dWidth), parseInt(dHeight));
                    // console.log(width, height);
                    if (width != parseInt(dWidth) || height != parseInt(dHeight)) {
                      error.value = 'Invalid image dimensions.';
                    }
                  }
                };
                image.src = frEvent.target.result;
              }
              emit('update:modelValue', file);
            }
            if (!props.multiple && /image/ig.test(currentFileList?.[0]?.type)) {
              fileReader.readAsDataURL(currentFileList?.[0]); // convert to base64 string
            } else if (!props.multiple && /text/ig.test(currentFileList?.[0]?.type)) {
              fileReader.readAsText(currentFileList?.[0]); // read as text
            } else {
              file.content = (props.multiple) ? currentFileList?.map((file: File) => (file?.name))?.toLocaleString()?.replace(/,/ig, ', ') : currentFileList?.[0]?.name;
              emit('update:modelValue', file);
            }
          } else {
            error.value = 'Max file count.';
            emit('update:modelValue', file);
          }
        } else {
          if (!props.multiple) {
            file.model = undefined;
            file.content = undefined;
          }
          error.value = 'Invalid file size.';
          emit('update:modelValue', file);
        }
      } else {
        if (!props.multiple) {
          file.model = undefined;
          file.content = undefined;
        }
        error.value = 'Invalid file type.';
        emit('update:modelValue', file);
      }
    }
  };

  const handleRemoveFile = (fileInfo: File) => {
    if (Array.isArray(file.model) && file.model.length > 0) {
      const newFileList = file.model.filter((currentFile: File) => (currentFile.name !== fileInfo.name));
      if (newFileList.length > 0) {
        inputFile(newFileList);
      } else {
        clear();
      }
    }
  };

  const clear = () => {
    error.value = undefined;
    file.model = undefined;
    file.content = undefined;
    emit('update:modelValue', file);
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .file-field {
    &.image-avatar {
      width: fit-content;

      .v-field__outline {
        display: none;
      }

      .camera-icon {
        position: absolute;
        z-index: 1;
        bottom: 0;
        right: 0;
      }

      .v-field {
        opacity: 1;
      }

      .v-field__clearable {
        margin: 5px !important;
      }
    }
    
    .v-input__control {
      .v-field {
        position: relative;
        display: flex;
        padding: 0;

        &.v-field--error {
          .file-icon {
            color: rgb(var(--v-theme-error)) !important;
          }

          .v-btn {
            color: rgb(var(--v-theme-error)) !important;
          }

          .text {
            color: rgb(var(--v-theme-error)) !important;
          }
        }

        &.v-field--disabled {
          .file-icon {
            color: #000 !important;
            opacity: var(--v-disabled-opacity) !important;
          }

          .v-btn {
            color: #000 !important;
            opacity: var(--v-disabled-opacity) !important;
          }

          .text {
            color: #000 !important;
            opacity: var(--v-disabled-opacity) !important;
          }
        }

        &:not(.v-field--disabled) {
          .v-field__clearable {
            display: flex !important;
          }
        }

        .v-field__prepend-inner {
          width: 100%;
          
          .custom-ui-wrapper {
            width: 100%;
            min-height: var(--height, 125px);

            .image-file {
              display: block;
              width: 100%;
            }

            .file-holder {
              .files-wrapper {
                .v-chip {
                  position: relative;
                  height: auto;
                  padding: 5px 15px;
                  word-break: break-all;
                  white-space: initial;
                  z-index: 3;
                }
              }
            }
          }
        }

        .v-field__field {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: block;
          width: 100%;
          z-index: 2;
          opacity: 0;
          cursor: pointer;

          input {
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }

        .v-field__clearable {
          position: absolute;
          top: 0;
          right: 0;
          align-items: start;
          margin: 10px 13px;
          z-index: 3;
          transition: none !important;
        }
        
        .v-field__outline {
          .v-field__outline__start {
            border-style: dashed;
            border-width: 2px 0 2px 2px;
          }

          .v-field__outline__end {
            border-style: dashed;
            border-width: 2px 2px 2px 0;
          }
        }
      }
    }
  }
</style>