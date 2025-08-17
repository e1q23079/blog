<template>
    <div class="center">
        <v-card class="mx-auto pa-3 pb-0" elevation="0" max-width="448" rounded="lg">

            <v-form v-model="form" @submit.prevent="onSubmit">

                <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

                <v-text-field v-model="userName" density="compact" placeholder="Enter your e-mail"
                    prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password
                </div>

                <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined"
                    @click:append-inner="visible = !visible"></v-text-field>

                <v-btn class="mb-8" color="green" size="large" variant="tonal" block type="submit">
                    Login
                </v-btn>

            </v-form>
        </v-card>
    </div>


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
    import { ref } from 'vue'

    import { supabase } from '../../utils/supabase';
    import { useRouter } from 'vue-router';



    const form = ref(false)
    const userName = ref(null)
    const password = ref(null)

    const visible = ref(false)

    const dialog = ref(false);

    const router = useRouter();


    async function onSubmit() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: userName.value,
            password: password.value,
        })
        if (!error) {
            window.location.href = '/';
        } else {
            dialog.value = true;
        }
    }


</script>


<style scoped>
    .center {
        padding-top: 15vh;
    }
</style>
