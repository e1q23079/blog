<template>

  <v-layout>

    <v-app-bar color="#8ED973" density="compact" elevation="0">

      <template v-slot:prepend>
        <v-app-bar-nav-icon color="#FFFFFF" @click="open = !open"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="title">Q23079's blog</v-app-bar-title>

      <v-btn style="color: white; font-weight: bold;" variant="tonal" v-if="userName != '未ログイン'" @click="make">
        作成
      </v-btn>


      <!--
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg">
        <v-list-item-title style="color: white;font-weight: bold;">Q23079</v-list-item-title>
      </v-list-item>
      -->

      <v-menu>


        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props" color="#FFFFFF"></v-btn>
        </template>

        <v-list>
          <v-list-item to="/login" v-if="userName == '未ログイン'">
            <v-list-item-title>
              <div role="button">ログイン</div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="signOut" v-else>
            <v-list-item-title>
              <div role="button">ログアウト</div>
            </v-list-item-title>
          </v-list-item>
        </v-list>



      </v-menu>

    </v-app-bar>

    <v-navigation-drawer v-model="open" temporary :scrim="false">
      <v-list-item title="Q23079's blog" :subtitle="userName"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="Top" to="/" @click="open = false"></v-list-item>
      <v-list-item link title="Portfolio" href="https://e1q23079.github.io/portfolio"
        @click="open = false"></v-list-item>
      <v-list-item link title="About" to="/about" @click="open = false"></v-list-item>
    </v-navigation-drawer>


  </v-layout>

  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card prepend-icon="mdi-check" text="ログアウトしました．" title="情報">
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn to="/" @click="click">
          閉じる
        </v-btn>
      </template>
    </v-card>
  </v-dialog>

</template>

<script setup>
  import { shallowRef } from 'vue'

  import { ref, onMounted } from 'vue';

  import { supabase } from '../../utils/supabase';

  import { useRouter } from 'vue-router';

  const router = useRouter();

  const dialog = ref(false);

  const userName = ref("未ログイン");

  async function getUser() {
    const { data: data, error } = await supabase.auth.getUser();
    if (data['user']) {
      userName.value = data['user']['email'];
    } else {
      userName.value = "未ログイン";
    }

  }

  onMounted(() => {
    getUser();
  })

  const open = shallowRef(false);


  async function signOut() {
    const { error } = await supabase.auth.signOut();
    dialog.value = true;
  }

  const click = () => {
    dialog.value = false;
    window.location.href = '/';
  }

  const make = () => {
    window.location.href = '/editer/0'
  }



</script>

<style scoped>
  .title {
    color: white;
    font-weight: bold;
  }
</style>