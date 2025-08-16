<template>

    <v-layout>
        
        <v-app-bar color="#8ED973" density="compact" elevation="0">

        <template v-slot:prepend>
          <v-app-bar-nav-icon color="#FFFFFF"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title class="title">Q23079's blog</v-app-bar-title>




        <v-menu>

         <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props" color="#FFFFFF"></v-btn>
          </template>

          

          <v-list>
            <v-list-item>
              <v-list-item-title>
                <div role="button">ログイン</div>
              </v-list-item-title>
            </v-list-item>
          </v-list>

    
        </v-menu>

      </v-app-bar>

    </v-layout>

</template>

<script>
</script>

<style scoped>
.title{
    color: white;
    font-weight: bold;
}
</style>