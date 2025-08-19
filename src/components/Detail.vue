<template>
  <!-- Detail -->
  <v-card class="card">
    <!-- 記事 -->
    <v-card-item>
      <!-- タイトル -->
      <v-card-title class="title">{{ blog.title }}</v-card-title>
      <!-- 投稿日 -->
      <v-card-subtitle class="date">投稿日：{{ blog.created_at }}</v-card-subtitle>
      <!-- 編集画面 -->
      <div class="d-flex justify-end" v-if="userName">
        <v-btn variant="text" :to="`/editer/${blog.id}`">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn variant="text" @click="del">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-card-item>
    <!-- 本文 -->
    <v-card-text>
      <div class="detail" v-html="blog.text"></div>
    </v-card-text>
  </v-card>

  <!-- 削除確認ダイアログ -->
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card prepend-icon="mdi-check" text="本当に削除しますか？" title="確認">
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false">
          いいえ
        </v-btn>
        <v-btn @click="delDo">
          はい
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
  // インポート
  import { marked } from 'marked';
  import { onMounted } from 'vue';
  import { supabase } from '../../utils/supabase';
  import { ref, render } from 'vue'
  import { useRoute, useRouter } from 'vue-router';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github.css'

  // ルート
  const route = useRoute();
  // ルーター
  const router = useRouter();
  // detaiIDをURLから取得
  const detailId = route.params.id;
  // マークダウン
  const renderer = new marked.Renderer();

  // h1タグ
  renderer.heading = function (text) {
    if (text.depth === 1) {
      return `<h1 style='padding: 5px'><span className='section' style='color:  #8ED973; padding: 10px'>|</span> ${text.text}</h1><hr><br>`
    } else if (text.depth === 2) {
      return `<h2 style='padding: 5px'><span className='section' style='color:  #8ED973;'>|</span> ${text.text}</h2>`
    } else {
      return `<h${text.depth}>${text.text}</h${text.depth}>`;
    }
  }

  // paragraphタグ
  /*

  renderer.paragraph = function (text) {
    console.log(text);
    return `<p style='padding: 5px'>${text.text}</p>`
  }

  */

  // listitemタグ
  renderer.listitem = function (text) {
    return `・${text.text}<br>`;
  }

  // codeタグ
  renderer.code = function (text) {
    // console.log(text);
    const highlightCode = hljs.highlightAuto(text.text);
    // return `<pre><code class='hljs' style='background-color: rgb(182, 224, 159);' > ${highlightCode.value}</code ></pre> `
    return `<pre><code class='hljs' style='background-color: #F2F2F2;' >${highlightCode.value}</code ></pre> `
  }

  // imageタグ
  renderer.image = function (text) {
    // console.log(text);
    return `<div><img src=${text.href} style='width: 80vw;' alt='${text.text ? text.text : "画像"}'></img></div>`;
  }

  // linkタグ
  renderer.link = function (text) {
    return `<a href=${text.href} target='_blank' rel='noreferrer'>${text.text}</a>`;
  }

  // マークダウン設定
  marked.setOptions({ renderer });

  // ダイアログ
  const dialog = ref(false);

  // 削除
  const del = () => {
    dialog.value = true;
  }

  // ブログ
  const blog = ref([]);

  // ブログを取得
  async function getBlog() {
    // idに一致するものを取得
    const { data: data, error } = await supabase.from('blog').select().eq('id', detailId).maybeSingle();
    if (error) {
      router.push('/notfound');
    } else {
      data.text = marked(data.text);
      blog.value = data;
    }
  }

  onMounted(() => {
    getBlog();
    getUser();
  })

  // ユーザー名
  const userName = ref(false);

  // ユーザー名を取得
  async function getUser() {
    // 現在ログインしているユーザーを取得
    const { data: data, error } = await supabase.auth.getUser();
    if (data['user']) {
      userName.value = true;
    } else {
      userName.value = false;
    }
  }

  // 削除処理
  async function delDo() {
    dialog.value = false;
    const { error } = await supabase
      .from('blog')
      .delete()
      .eq('id', detailId);

    window.location.href = '/';
  }

</script>


<style scoped>

  /* タイトル */
  .title {
    font-size: 2.3em;
    font-weight: bold;
  }

  /* 日付 */
  .date {
    font-size: 1.0em;
  }

  /* 記事 */
  .detail {
    font-size: 1.3em;
    padding: 10px;
  }

</style>

<style>

  /* 文字色 */
  .card {
    color: #0E2841;
  }

  /* 文字余白 */
  p {
    padding: 10px;
  }

  /* テーブル */
  table {
    border-collapse: collapse;
  }

  th,
  td {
    border: solid 1.5px;
    border-color: rgb(152, 152, 152);
    padding: 5px;
  }

  th {
    background-color: aliceblue;

  }

</style>