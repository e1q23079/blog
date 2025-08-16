<template>
    <div class="center">
        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">

            <v-form v-model="form" @submit.prevent="onSubmit">

                <div class="text-subtitle-1 text-medium-emphasis">UserName</div>

                <v-text-field v-model="userName" density="compact" placeholder="Enter your UserName"
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
</template>


<script setup>
    import { ref } from 'vue'

    const form = ref(false)
    const userName = ref(null)
    const password = ref(null)

    const visible = ref(false)

    function onSubmit() {
        console.log(userName.value, password.value)
    }

</script>


<style scoped>
    .center {
        padding: 10vh;
    }
</style>
