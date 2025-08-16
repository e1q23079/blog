<template>
    <v-card>
        <v-card-item>
            <v-text-field variant="underlined" label="タイトル"></v-text-field>
            <v-card-subtitle class="date">投稿日：2025/08/16</v-card-subtitle>
            <v-textarea label="記事" counter variant="underlined"></v-textarea>
            <div class="d-flex justify-end">
                <v-btn-group>
                    <v-btn>取り消し</v-btn>
                    <v-btn @click="save">公開</v-btn>
                </v-btn-group>
            </div>
        </v-card-item>
    </v-card>

    <v-dialog v-model="dialog" max-width="400" persistent>
        <v-card prepend-icon="mdi-check" text="本当に公開しますか？" title="確認">
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
    import { ref } from 'vue'

    const dialog = ref(false);

    const save = () => {
        dialog.value = true;
    }

</script>


<style scoped></style>
