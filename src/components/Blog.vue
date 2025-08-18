<template>
  <!-- Blog -->
  <v-row v-for="detail in blogs">
    <v-col>
      <!-- 記事 -->
      <v-card link :to="`/detail/${detail.id}`" class="blog">
        <v-card-item>
          <!-- タイトル -->
          <v-card-title>{{ detail.title }}</v-card-title>
          <!-- 登校日 -->
          <v-card-subtitle>投稿日：{{ detail.created_at }}</v-card-subtitle>
        </v-card-item>
        <!-- 本文 -->
        <v-card-text>
          {{ `${marked(detail.text.substring(0, 300))}...` }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
  // インポート
  import { ref, onMounted, render } from 'vue';
  import { supabase } from '../../utils/supabase';
  import { marked } from 'marked';

  // ブログ
  const blogs = ref([]);

  // ブログをデータベースから取得
  async function getBlog() {
    // 日付，id，昇順
    const { data: data, error } = await supabase.from('blog').select().order('created_at', { ascending: false }).order('id', { ascending: false });
    blogs.value = data;
  }

  onMounted(() => {
    getBlog();
  })

  // マークダウン
  const renderer = new marked.Renderer();

  // hタグ
  renderer.heading = function (text) {
    return `${text.text}`;
  }

  // listタグ
  renderer.listitem = function (text) {
    return `${text.text}`;
  }

  // strongタグ
  renderer.strong = function (text) {
    return `${text.text}`;
  }

  // codeタグ
  renderer.code = function (text) {
    return `${text.text}`;
  }

  // paragraphタグ
  renderer.paragraph = function (text) {
    return `${text.text}`;
  }

  // listタグ
  renderer.list = function (text) {
    return "";
  }

  // マークダウンオプション設定
  marked.setOptions({ renderer });
</script>

<style scoped></style>

<style>

  /* ブログ */
  .blog {
    color: #0E2841;
    /* 文字色 */
  }
</style>