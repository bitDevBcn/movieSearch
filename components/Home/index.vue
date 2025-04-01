<template>
  <v-row>
    <v-col
      v-for="(movie, index) in movieStore.movies"
      :key="movie.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <v-card class="position-relative">
        <v-img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          rounded
        />
        <!--Cargamos compoentes ScoreCircle-->
        <ScoreCircle :popularity="movie.vote_average" />
        <v-card-title class="text-subtitle-1 mt-1">
          {{ movie.title?.length > 10 ? movie.title.slice(0, 25) + '...' : movie.title }}
        </v-card-title>
        <v-card-subtitle>
          {{ movie.release_date }}
        </v-card-subtitle>
        <v-card-text class="text-truncate">
          {{ movie.overview }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
  //recuperamos datos del store 
  const movieStore = useMoviesStore();
</script>
