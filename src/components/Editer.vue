<template>
    <!-- Editer -->
    <v-card>
        <!-- 記事 -->
        <v-card-item>
            <!--　タイトル -->
            <v-text-field variant="underlined" label="タイトル" v-model="blog.title"></v-text-field>
            <!-- 投稿日 -->
            <v-card-subtitle class="date">投稿日：{{ blog.created_at }}</v-card-subtitle>
            <!-- 記事 -->
            <v-textarea label="記事" counter variant="underlined" rows="11" v-model="blog.text"></v-textarea>
            <!-- 操作ボタン -->
            <div class="d-flex justify-end">
                <v-btn-group>
                    <v-btn @click="reset">取り消し</v-btn>
                    <v-btn @click="save">公開</v-btn>
                </v-btn-group>
            </div>
        </v-card-item>
    </v-card>

    <!-- 公開確認ダイアログ -->
    <v-dialog v-model="dialog" max-width="400" persistent>
        <v-card prepend-icon="mdi-check" text="本当に公開しますか？" title="確認">
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn @click="dialog = false">
                    いいえ
                </v-btn>
                <v-btn @click="publish">
                    はい
                </v-btn>
            </template>
        </v-card>
    </v-dialog>

    <!-- 取り消し確認ダイアログ -->
    <v-dialog v-model="dialog2" max-width="400" persistent>
        <v-card prepend-icon="mdi-check" text="本当に取り消しますか？" title="確認">
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn @click="dialog2 = false">
                    いいえ
                </v-btn>
                <v-btn @click="cancel">
                    はい
                </v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup>
    // インポート
    import { useRoute, useRouter } from 'vue-router';
    import { ref } from 'vue'
    import { onMounted } from 'vue';
    import { supabase } from '../../utils/supabase';

    // ルート
    const route = useRoute();
    // ルーター
    const router = useRouter();
    // 記事idをURLから取得
    const detailId = route.params.id;

    // 公開確認ダイアログ
    const dialog = ref(false);

    // 取り消し確認ダイアログ
    const dialog2 = ref(false);

    // 保存ボタン押下
    const save = () => {
        dialog.value = true;    // ダイアログを開く
    }

    // リセットボタン押下
    const reset = () => {
        dialog2.value = true;   // ダイアログを開く
    }

    // ブログ
    const blog = ref([]);

    // 記事データ
    class Detail {
        constructor(props) {
            this.id = props.id;
            this.created_at = props.created_at;
            this.title = props.title;
            this.text = props.text;
        }
    }

    // ブログ記事を取得
    async function getBlog() {
        // idに一致する記事を取得
        const { data: data, error } = await supabase.from('blog').select().eq('id', detailId).maybeSingle();
        if (detailId == 0) {
            // 新規作成時
            const today = new Date();   // 現在の日付を取得
            const todayText = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;  // 日付体裁調整
            const temp = new Detail({ id: 0, created_at: todayText, title: "", text: "" }); // データ作成
            blog.value = temp;
        } else if (error) {
            // 記事取得エラー
            router.push('/notfound');
        } else {
            // 記事取得成功
            const temp = new Detail({ id: data.id, created_at: data.created_at, title: data.title, text: data.text });
            blog.value = temp;
        }
    }

    // 公開
    async function publish() {
        const today = new Date();   // 日付取得
        const todayText = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;  // 体裁調整
        dialog.value = false;   // ダイアログを閉じる

        if (detailId == 0) {
            // 新規作成
            /* 記事をデータベースに追加 */
            const { data, error } = await supabase
                .from('blog')
                .insert([
                    { created_at: todayText, title: blog.value.title, text: blog.value.text },
                ])
                .select()
        } else {
            // 記事編集
            /* 記事をデータベースに更新 */
            const { data, error } = await supabase
                .from('blog')
                .update({ title: blog.value.title, text: blog.value.text })
                .eq('id', detailId)
                .select()
            // console.log(error);
        }

        // 画面遷移
        if (detailId == 0) {
            // 新規作成時：トップに戻る
            window.location.href = '/';
        } else {
            // 記事作成 or 更新時：作成中の記事に戻る
            window.location.href = `/detail/${detailId}`;
        }

    }

    // キャンセルボタンを押下時
    const cancel = () => {
        dialog.value = false;   // ダイアログを閉じる

        if (detailId == 0) {
            // 新規作成時：トップに戻る
            window.location.href = '/';
        } else {
            // 記事作成 or 更新時：作成中の記事に戻る
            window.location.href = `/detail/${detailId}`;

        }
    }

    onMounted(() => {
        getBlog();
    })

</script>

<style scoped></style>
