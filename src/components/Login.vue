<template>
    <div class="center">
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field v-model="UserName" :readonly="loading" :rules="[required]" class="mb-2" label="UserName"
                    clearable></v-text-field>

                <v-text-field v-model="password" :readonly="loading" :rules="[required]" label="Password"
                    placeholder="Enter your password" clearable type="password"></v-text-field>

                <br>

                <v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit"
                    variant="elevated" block>
                    Login
                </v-btn>
            </v-form>
        </v-card>
    </div>
</template>


<script setup>
    import { ref } from 'vue'

    const form = ref(false)
    const UserName = ref(null)
    const password = ref(null)
    const loading = ref(false)

    function onSubmit() {
        if (!form.value) return
        loading.value = true
        // setTimeout(() => (loading.value = false), 2000);
        console.log(UserName.value, password.value)
    }
    /*
    function required(v) {
        return !!v || '必須の項目です．'
    }
    */
</script>


<style scoped>
    .center {
        padding: 10vh;
    }
</style>
