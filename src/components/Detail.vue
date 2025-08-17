<template>
  <v-card>
    <v-card-item>
      <v-card-title class="title">タイトル</v-card-title>
      <v-card-subtitle class="date">投稿日：2025/08/16</v-card-subtitle>
      <div class="d-flex justify-end">
        <v-btn variant="text">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn variant="text" @click="del">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-card-item>
    <v-card-text>
      <div class="detail" v-html="marked(text)"></div>
    </v-card-text>
  </v-card>

  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card prepend-icon="mdi-check" text="本当に削除しますか？" title="確認">
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="dialog = false">
          いいえ
        </v-btn>

        <v-btn @click="dialog = false">
          はい
        </v-btn>
      </template>
    </v-card>
  </v-dialog>

</template>

<script setup>
  import { marked } from 'marked';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const detailId = route.params.id;


  import { ref } from 'vue'

  const dialog = ref(false);

  const del = () => {
    dialog.value = true;
  }

  const text = `
# h1
## h2
### h3
#### h4
本文を記載
文章を入力している．

文章を入力している．
文章を入力している．

文章を入力している．
文章を入力している．

文章を入力している．
文章を入力している．

文章を入力している．
文章を入力している．

文章を入力している．
文章を入力している．

文章を入力している．
文章を入力している．

文章を入力している．
文章を入力している．

文章を入力している．
文章を入力している．

文章を入力している．


文章を入力している．
章を入力している．

文章を入力している．


文章を入力している．

`

</script>


<style scoped>
  .title {
    font-size: 2.3em;
    font-weight: bold;
  }

  .date {
    font-size: 1.0em;
  }

  .detail {
    font-size: 1.3em;
  }
</style>