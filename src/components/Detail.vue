<template>
    <v-card>
        <v-card-item>
          <v-card-title class="title">タイトル</v-card-title>
          <v-card-subtitle class="date">投稿日：2025/08/16</v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <div class="detail" v-html="marked(text)"></div>
        </v-card-text>
      </v-card>
</template>

<script setup>
import { marked } from 'marked';
import { useRoute } from 'vue-router';

const route = useRoute();
const detailId = route.params.id;

const text = `
# h1
## h2
### h3
#### h4
本文を記載
文章を入力している．
`

</script>

<style scoped>
.title{
    font-size: 2.3em;
    font-weight: bold;
}
.date{
    font-size: 1.0em;
}
.detail{
    font-size: 1.3em;
}
</style>