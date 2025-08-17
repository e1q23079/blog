<template>
  <v-row>

    <v-col>
      <v-card link>
        <v-card-item>
          <v-card-title>タイトル</v-card-title>

          <v-card-subtitle>投稿日：2025/08/16</v-card-subtitle>
        </v-card-item>

        <v-card-text>
          本文の内容が記述される．
        </v-card-text>

        <h1>テスト{{ blogs }}</h1>

        <br></br>

        <h3 v-for="dt in blogs" :key="dt.id">{{ dt.title }}</h3>


      </v-card>

    </v-col>
  </v-row>


</template>

<script setup>

  import { ref, onMounted } from 'vue';
  import { supabase } from '../../utils/supabase';

  const blogs = ref([]);

  async function getBlog() {
    const { data: data, error } = await supabase.from('blog').select();
    console.log(data, error);
    blogs.value = data;
  }

  onMounted(() => {
    getBlog();
  })
</script>

<style scoped></style>