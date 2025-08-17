<template>
    <v-card>
        <v-card-item>
            <v-text-field variant="underlined" label="タイトル" v-model="blog.title"></v-text-field>
            <v-card-subtitle class="date">投稿日：{{ blog.created_at }}</v-card-subtitle>
            <v-textarea label="記事" counter variant="underlined" rows="11" v-model="blog.text"></v-textarea>
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


    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();
    const detailId = route.params.id;


    import { ref } from 'vue'

    const dialog = ref(false);

    const save = () => {
        dialog.value = true;
    }

    import { onMounted } from 'vue';
    import { supabase } from '../../utils/supabase';

    const blog = ref([]);

    class Detail {
        constructor(props) {
            this.id = props.id;
            this.created_at = props.created_at;
            this.title = props.title;
            this.text = props.text;
        }
    }

    async function getBlog() {
        const { data: data, error } = await supabase.from('blog').select().eq('id', detailId).maybeSingle();
        if (detailId == 0) {
            const temp = new Detail({ id: 0, created_at: "", title: "", text: "" });
            blog.value = temp;
        } else if (error) {
            router.push('/notfound');
        } else {
            const temp = new Detail({ id: data.id, created_at: data.created_at, title: data.title, text: data.text });
            blog.value = temp;
        }
    }

    onMounted(() => {
        getBlog();
    })

</script>


<style scoped></style>
