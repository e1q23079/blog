<template>
  <!-- Footer -->
  <v-footer class="align-center justify-center copyRight" color="surface-light" app>
    <!-- 著作権表示 -->
    <div className='copyRight'>©{{ yearText }} Q23079 All Rights Reserved.</div>
  </v-footer>
</template>

<script setup>
  // 日付を取得
  const today = new Date();
  // 年を取得
  const year = today.getFullYear();
  // 表示形式調整
  let yearText = year;

  if (year !== 2025) {
    yearText = `2025-${year}`;
  }

</script>

<style scoped>

  /* カラー指定 */
  .copyRight {
    color: #0E2841;
  }
</style>
