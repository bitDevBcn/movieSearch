<template>
  <v-app id="inspire">
    <v-app-bar  height="56" color="#111827" class="px-4" flat>
      <v-container class="d-flex align-center">
        <v-icon size="48">mdi-movie-open-play</v-icon>

        <p class="text-h4 ml-4">Movie Search</p>
        <v-spacer></v-spacer>
        
        <v-text-field
          variant="outlined"
          density="compact"
          hide-details
          append-inner-icon="mdi-magnify"
          placeholder="Search"
          ></v-text-field>
      </v-container>
    </v-app-bar>

    <v-main>
      <slot />
      <Message />
    </v-main>
  </v-app>
</template>
<script setup lang="ts"></script>