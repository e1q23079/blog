<template>

  <v-layout>

    <v-app-bar color="#8ED973" density="compact" elevation="0">

      <template v-slot:prepend>
        <v-app-bar-nav-icon color="#FFFFFF" @click="open = !open"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="title">Q23079's blog</v-app-bar-title>


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
          <v-list-item to="/login">
            <v-list-item-title>
              <div role="button">ログイン</div>
            </v-list-item-title>
          </v-list-item>
        </v-list>


      </v-menu>

    </v-app-bar>

    <v-navigation-drawer v-model="open" temporary>
      <v-list-item title="Q23079's blog" subtitle="未ログイン"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="Top" to="/" @click="open = false"></v-list-item>
      <v-list-item link title="Portfolio" href="https://e1q23079.github.io/portfolio"
        @click="open = false"></v-list-item>
      <v-list-item link title="About" to="/about" @click="open = false"></v-list-item>
    </v-navigation-drawer>


  </v-layout>

</template>

<script setup>
  import { shallowRef } from 'vue'
  import { fa } from 'vuetify/locale';

  const open = shallowRef(false)
</script>

<style scoped>
  .title {
    color: white;
    font-weight: bold;
  }
</style>