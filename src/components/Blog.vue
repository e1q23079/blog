<template>
  <v-row v-for="detail in blogs">

    <v-col>
      <v-card link :to="`/detail/${detail.id}`" class="blog">
        <v-card-item>
          <v-card-title>{{ detail.title }}</v-card-title>

          <v-card-subtitle>投稿日：{{ detail.created_at }}</v-card-subtitle>
        </v-card-item>

        <v-card-text>
          {{ `${marked(detail.text.substring(0, 300))}...` }}
        </v-card-text>

      </v-card>

    </v-col>
  </v-row>


</template>

<script setup>

  import { ref, onMounted, render } from 'vue';
  import { supabase } from '../../utils/supabase';

  const blogs = ref([]);

  async function getBlog() {
    const { data: data, error } = await supabase.from('blog').select().order('created_at', { ascending: false }).order('id', { ascending: false });
    blogs.value = data;
  }

  onMounted(() => {
    getBlog();
  })


  import { marked } from 'marked';

  const renderer = new marked.Renderer();

  renderer.heading = function (text) {
    return `${text.text}`;
  }

  renderer.listitem = function (text) {
    return `${text.text}`;
  }

  renderer.strong = function (text) {
    return `${text.text}`;
  }

  renderer.code = function (text) {
    return `${text.text}`;
  }

  renderer.paragraph = function (text) {
    return `${text.text}`;
  }

  renderer.list = function (text) {
    return "";
  }



  marked.setOptions({ renderer });
</script>

<style scoped></style>

<style>
  .blog {
    color: #0E2841;
  }
</style>