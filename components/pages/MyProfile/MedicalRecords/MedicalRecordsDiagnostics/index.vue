<template>
  <v-container class="pa-0" fluid>
    <v-expand-transition>
      <v-container v-if="(!form.show)" class="pa-0" fluid>
        <v-row class="pb-4 ma-0">
          <v-col v-for="(data) in diagnosticsList" :key="`diagnostics-${data.id}`" class="px-7" cols="12">
            <DiagnosticTemplate :data="data" @click="() => { handleSelect(data); }" />
          </v-col>
          <v-col class="d-flex justify-end pb-5 px-7" cols="12">
            <v-btn class="flex-grow-1 flex-sm-grow-0" prepend-icon="mdi-plus" size="large" variant="text" color="primary" @click="handleAdd">Add New</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-expand-transition>

    <v-expand-transition>
      <v-row v-if="(form.show)" class="ma-0">
        <v-col class="pt-0 pb-4 px-4" cols="12">
          <MedicalDiagnosticsForm :data="form.data" @cancel="handleCancel" />
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-container>
</template>

<script lang="ts" setup>
  // Static Data
  const diagnosticsList = [
    { id: 1, laboratory: 'NY General Hospital', requestFor: 'CBC', requestBy: 'Dr. Lisa Parker', date: '2024/01/01', findings: 'RBC - 5.01 (45 - 6.3), HB - 16.4 (14 - 18), WBC - 6.5 (4.0 - 10), HCT - 45.2 (39 - 52), PLT - 209 (140 - 440)', files: ['Lab-Report.pdf', 'Paul-Sam-Request-3-12-23.pdf'] },
    { id: 2, laboratory: 'NY General Hospital', requestFor: 'CBC', requestBy: 'Dr. Lisa Parker', date: '2024/01/01', findings: 'RBC - 5.01 (45 - 6.3), HB - 16.4 (14 - 18), WBC - 6.5 (4.0 - 10), HCT - 45.2 (39 - 52), PLT - 209 (140 - 440)', files: ['Lab-Report.pdf', 'Paul-Sam-Request-3-12-23.pdf'] },
    { id: 3, laboratory: 'NY General Hospital', requestFor: 'CBC', requestBy: 'Dr. Lisa Parker', date: '2024/01/01', findings: 'RBC - 5.01 (45 - 6.3), HB - 16.4 (14 - 18), WBC - 6.5 (4.0 - 10), HCT - 45.2 (39 - 52), PLT - 209 (140 - 440)', files: ['Lab-Report.pdf', 'Paul-Sam-Request-3-12-23.pdf'] },
    { id: 4, laboratory: 'NY General Hospital', requestFor: 'CBC', requestBy: 'Dr. Lisa Parker', date: '2024/01/01', findings: 'RBC - 5.01 (45 - 6.3), HB - 16.4 (14 - 18), WBC - 6.5 (4.0 - 10), HCT - 45.2 (39 - 52), PLT - 209 (140 - 440)', files: ['Lab-Report.pdf', 'Paul-Sam-Request-3-12-23.pdf'] },
    { id: 5, laboratory: 'NY General Hospital', requestFor: 'CBC', requestBy: 'Dr. Lisa Parker', date: '2024/01/01', findings: 'RBC - 5.01 (45 - 6.3), HB - 16.4 (14 - 18), WBC - 6.5 (4.0 - 10), HCT - 45.2 (39 - 52), PLT - 209 (140 - 440)', files: ['Lab-Report.pdf', 'Paul-Sam-Request-3-12-23.pdf'] },
    { id: 6, laboratory: 'NY General Hospital', requestFor: 'CBC', requestBy: 'Dr. Lisa Parker', date: '2024/01/01', findings: 'RBC - 5.01 (45 - 6.3), HB - 16.4 (14 - 18), WBC - 6.5 (4.0 - 10), HCT - 45.2 (39 - 52), PLT - 209 (140 - 440)', files: ['Lab-Report.pdf', 'Paul-Sam-Request-3-12-23.pdf'] }
  ];

  // Data
  const form = reactive<{ show: boolean, data: { [key: string]: any; } | null }>({ show: false, data: {} });

  // Methods
  const handleAdd = () => {
    form.show = true;
    form.data = null;
    window.scrollTo(0, 0);
  };
  
  const handleSelect = (data: { [key: string]: any; }) => {
    form.show = true;
    form.data = data;
    window.scrollTo(0, 0);
  };

  const handleCancel = () => {
    form.show = false;
    form.data = {};
    window.scrollTo(0, 0);
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>