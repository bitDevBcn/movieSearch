<template>
  <v-container>
    <p class="text-h4 mt-12 mb-6">Feature Today</p>

    <v-row>
      <v-col
        v-for="(movie, index) in movies"
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
            {{ movie.title }}
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
  </v-container>
</template>

<script setup lang="ts">
//definimos interface
interface Results {
  id: number;
  title: string;
  vote_average: string;
  poster_path: string;
  release_date: string;
}

interface Movies {
  total_page: number;
  total_result: number;
  results: Results[];
}

import { onMounted, ref } from "vue";
import { useDateFormat } from "@vueuse/core";
import { useMessageStore } from "@/stores/message";

const runtimeConfig = useRuntimeConfig();
const movies = ref<Results[]>([]);
const messageStore = useMessageStore();

const movieSearch = async () => {
  try {
    const response: Movies = await fetch(
      "https://api.themoviedb.org/3/discover/movie?&page=1",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${runtimeConfig.public.tmdbApiKey}`,
        },
      }
    );

    //Obtenemos json y lo guardo en variable
    //const data = await response.json()
    //movies.value = data.results
    //mapeamos los resultados
    const data = await response.json();
    movies.value = data.results
      .filter((_, index) => index < 12)
      .map((movie: any) => ({
        ...movie,
        release_date: useDateFormat(new Date(movie.release_date), "MMMM YYYY", {
          locales: "en-US",
        }).value,
      }));

    console.log(movies.value);
  } catch (error) {
    messageStore.showMsg = true;
    messageStore.message =
      error instanceof Error ? error.message : "Error al buscar películas";
  }
};
// Llamar al cargar el componente
onMounted(() => {
  movieSearch();
});
</script>

<style scoped></style>
