<template>

  <Navigation></Navigation>

  <v-app style="background-color: rgb(236, 231, 225);">
    <div class="view">
      <v-main>
        <RouterView />
      </v-main>
    </div>

    <Footer></Footer>

  </v-app>
</template>

<script setup lang="ts">
  import router from './router';

</script>

<style scoped>
  .view {
    padding-top: 60px;
    padding-right: 10px;
    padding-left: 10px;
  }
</style>