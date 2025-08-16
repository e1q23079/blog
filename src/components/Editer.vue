<template>
    <v-card>
        <v-card-item>
            <v-text-field variant="underlined" label="タイトル"></v-text-field>
            <v-card-subtitle class="date">投稿日：2025/08/16</v-card-subtitle>
            <v-textarea label="記事" counter variant="underlined"></v-textarea>
            <div class="d-flex justify-end">
                <v-btn-group>
                    <v-btn>取り消し</v-btn>
                    <v-btn>保存</v-btn>
                </v-btn-group>
            </div>
        </v-card-item>
    </v-card>
</template>


<script setup>

</script>


<style scoped></style>
