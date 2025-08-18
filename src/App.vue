<template>

  <!-- ナビゲーションバー -->
  <Navigation></Navigation>

  <!-- コンテンツ -->
  <v-app class="contents">
    <div class="view">
      <v-main>
        <RouterView />
      </v-main>
    </div>

    <!-- フッター -->
    <Footer></Footer>

  </v-app>
</template>

<script setup lang="ts">
  import router from './router';
</script>

<style scoped>

  /* コンテンツ */
  .contents {
    background-color: rgb(236, 231, 225);
  }

  /* ビュー */
  .view {
    padding-top: 60px;
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
  }
</style>