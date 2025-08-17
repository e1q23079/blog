<template>
  <v-row v-for="detail in blogs">

    <v-col>
      <v-card link :to="`/detail/${detail.id}`">
        <v-card-item>
          <v-card-title>{{ detail.title }}</v-card-title>

          <v-card-subtitle>投稿日：{{ detail.created_at }}</v-card-subtitle>
        </v-card-item>

        <v-card-text>
          {{ `${detail.text.substring(0, 100)}...` }}
        </v-card-text>

      </v-card>

    </v-col>
  </v-row>


</template>

<script setup>

  import { ref, onMounted } from 'vue';
  import { supabase } from '../../utils/supabase';

  const blogs = ref([]);

  async function getBlog() {
    const { data: data, error } = await supabase.from('blog').select().order('id', { ascending: false });
    blogs.value = data;
  }

  onMounted(() => {
    getBlog();
  })
</script>

<style scoped></style>