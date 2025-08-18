<template>
  <v-card>
    <v-card-item>
      <v-card-title class="title">{{ blog.title }}</v-card-title>
      <v-card-subtitle class="date">投稿日：{{ blog.created_at }}</v-card-subtitle>
      <div class="d-flex justify-end" v-if="userName">
        <v-btn variant="text" :to="`/editer/${blog.id}`">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn variant="text" @click="del">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-card-item>
    <v-card-text>
      <div class="detail" v-html="blog.text"></div>
    </v-card-text>
  </v-card>

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
  import { marked } from 'marked';
  import { useRoute, useRouter } from 'vue-router';

  import hljs from 'highlight.js';

  import 'highlight.js/styles/github.css'

  const route = useRoute();
  const router = useRouter();
  const detailId = route.params.id;

  const renderer = new marked.Renderer();

  renderer.heading = function (text) {
    if (text.depth == 1) {
      return `<h1 style='padding: 5px'><span className='section' style='color:  #8ED973; padding: 10px'>|</span> ${text.text}</h1><hr><br>`
    } else if (text.depth == 2) {
      return `<h2 style='padding: 5px'><span className='section' style='color:  #8ED973;'>|</span> ${text.text}</h2>`
    } else {
      return `<h${text.depth}>${text.text}</h${text.depth}>`;
    }
  }


  /*

  renderer.paragraph = function (text) {
    console.log(text);
    return `<p style='padding: 5px'>${text.text}</p>`
  }

  */





  renderer.listitem = function (text) {
    return `・${text.text}<br>`;
  }

  renderer.code = function (text) {
    // console.log(text.raw);
    const highlightCode = hljs.highlightAuto(text.text);
    // return `<pre><code class='hljs' style='background-color: rgb(182, 224, 159);' > ${highlightCode.value}</code ></pre> `
    return `<pre><code class='hljs' style='background-color: #E7E6E6;' >${highlightCode.value}</code ></pre> `
  }

  marked.setOptions({ renderer });


  import { ref, render } from 'vue'

  const dialog = ref(false);

  const del = () => {
    dialog.value = true;
  }


  import { onMounted } from 'vue';
  import { supabase } from '../../utils/supabase';

  const blog = ref([]);

  async function getBlog() {
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

  const userName = ref(false);

  async function getUser() {
    const { data: data, error } = await supabase.auth.getUser();
    if (data['user']) {
      userName.value = true;
    } else {
      userName.value = false;
    }
  }

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
  .title {
    font-size: 2.3em;
    font-weight: bold;
  }

  .date {
    font-size: 1.0em;
  }

  .detail {
    font-size: 1.3em;
    padding: 10px;
  }

</style>

<style>
  p {
    padding: 10px;
  }

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