<template>
    <!-- Login -->
    <div class="center">
        <v-card class="mx-auto pa-3 pb-0" elevation="0" max-width="448" rounded="lg">
            <!-- ログインフォーム -->
            <v-form v-model="form" @submit.prevent="onSubmit">
                <!-- E-mail-->
                <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>
                <!-- E-mail Input -->
                <v-text-field v-model="userName" density="compact" placeholder="Enter your e-mail"
                    prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

                <!-- Password -->
                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password
                </div>
                <!-- Password Input -->
                <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined"
                    @click:append-inner="visible = !visible"></v-text-field>
                <!-- Login Btn -->
                <v-btn class="mb-8" color="green" size="large" variant="tonal" block type="submit">
                    Login
                </v-btn>
            </v-form>
        </v-card>
    </div>

    <!-- ログイン失敗ダイアログ -->
    <v-dialog v-model="dialog" max-width="400" persistent>
        <v-card prepend-icon="mdi-check" text="ログインに失敗しました．" title="エラー">
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn @click="dialog = false">
                    閉じる
                </v-btn>
            </template>
        </v-card>
    </v-dialog>

</template>


<script setup>
    // インポート
    import { ref } from 'vue'
    import { supabase } from '../../utils/supabase';
    import { useRouter } from 'vue-router';

    // フォーム
    const form = ref(false);

    // ユーザー名
    const userName = ref(null);

    // パスワード
    const password = ref(null);

    // 表示
    const visible = ref(false);

    // ダイアログ
    const dialog = ref(false);

    // ルーター
    const router = useRouter();

    // 送信（ログイン）
    async function onSubmit() {
        // ログイン処理（メールアドレス：パスワード）
        const { data, error } = await supabase.auth.signInWithPassword({
            email: userName.value,
            password: password.value,
        })
        if (!error) {
            // ログイン成功時
            window.location.href = '/';
        } else {
            // ログイン失敗時
            dialog.value = true;    // ダイアログを表示
        }
    }

</script>


<style scoped>
    .center {
        padding-top: 15vh;
    }

    /* カラー */
    .color {
        color: #0E2841;
    }
</style>
