<template>
  <v-footer class="align-center justify-center copyRight" color="surface-light" app>
    <div className='copyRight'>©{{ yearText }} Q23079 All Rights Reserved.</div>
  </v-footer>
</template>

<script setup>

  const today = new Date();

  const year = today.getFullYear();

  let yearText = year;

  if (year !== 2025) {
    yearText = `2025-${year}`;
  }

</script>

<style scoped>
  .copyRight {
    color: #0E2841;
  }
</style>
