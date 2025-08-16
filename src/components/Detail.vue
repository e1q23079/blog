<template>
    <h1>記事:{{ detailId }}</h1>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const detailId = route.params.id;
</script>

<style scoped>
</style>