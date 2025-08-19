<template>
  <!-- Navigation -->
  <v-layout>
    <!-- ナビゲーションバー -->
    <v-app-bar color="#8ED973" density="compact" elevation="0">
      <!-- ハンバーガーメニュー -->
      <template v-slot:prepend>
        <v-app-bar-nav-icon color="#FFFFFF" @click="open = !open"></v-app-bar-nav-icon>
      </template>
      <!-- タイトル -->
      <v-app-bar-title class="title">Q23079's blog</v-app-bar-title>
      <!-- ブログ記事作成ボタン：ログイン時のみ表示 -->
      <v-btn style="color: white; font-weight: bold;" variant="tonal" v-if="userName != 'ゲストユーザ'" @click="make">
        作成
      </v-btn>

      <!--
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg">
        <v-list-item-title style="color: white;font-weight: bold;">Q23079</v-list-item-title>
      </v-list-item>
      -->
      <!-- メニューバー -->
      <v-menu>
        <!-- ログイン・ログアウト -->
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props" color="#FFFFFF"></v-btn>
        </template>
        <!-- ボタン -->
        <v-list class="color">
          <!-- 認証前：ログインボタンを表示 -->
          <v-list-item to="/login" v-if="userName === 'ゲストユーザ'">
            <v-list-item-title>
              <div role="button">ログイン</div>
            </v-list-item-title>
          </v-list-item>
          <!-- 認証後： -->
          <v-list-item @click="signOut" v-else>
            <v-list-item-title>
              <div role="button">ログアウト</div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- ナビゲーション：ドロワー -->
    <v-navigation-drawer class="color" v-model="open" temporary :scrim="false">
      <!-- タイトル -->
      <v-list-item title="Q23079's blog" :subtitle="userName"></v-list-item>
      <v-divider></v-divider>
      <!-- メニュー -->
      <v-list-item link title="Top" to="/" @click="open = false"></v-list-item>
      <v-list-item link title="Portfolio" href="https://e1q23079.github.io/portfolio"
        @click="open = false"></v-list-item>
      <v-list-item link title="About" to="/about" @click="open = false"></v-list-item>
    </v-navigation-drawer>
  </v-layout>

  <!-- ログアウトダイアログ -->
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card prepend-icon="mdi-check" text="ログアウトしました．" title="情報">
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn @click="click">
          閉じる
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
  // インポート
  import { shallowRef } from 'vue'
  import { ref, onMounted } from 'vue';
  import { supabase } from '../../utils/supabase';
  import { useRouter } from 'vue-router';

  // ルーター
  const router = useRouter();
  // ダイアログ
  const dialog = ref(false);
  // ユーザー名
  const userName = ref("ゲストユーザ");

  // ユーザー名を取得
  async function getUser() {
    const { data: data, error } = await supabase.auth.getUser();
    if (data['user']) {
      userName.value = data['user']['email'];
    } else {
      userName.value = "ゲストユーザ";
    }

  }

  onMounted(() => {
    getUser();
  })

  // ナビゲーション：open
  const open = shallowRef(false);

  // ログアウト
  async function signOut() {
    // ログアウト処理
    const { error } = await supabase.auth.signOut();
    dialog.value = true;
  }

  // 閉じるボタン押下
  const click = () => {
    dialog.value = false;
    window.location.href = '/'; // トップページに戻る
  }

  // 記事作成
  const make = () => {
    window.location.href = '/editer/0'  // 記事作成ページに移動
  }

</script>

<style scoped>
  .title {
    color: white;
    font-weight: bold;
  }

  /* 文字色 */
  .color {
    color: #0E2841;
  }
</style>