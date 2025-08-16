<template>
    <h1>記事:{{ detailId }}</h1>
    <div v-html="marked(text)"></div>
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
|a|b|
|-|-|
|1|2|
`

</script>

<style scoped>
</style>