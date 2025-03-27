import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import { useMessageStore } from "@/stores/message";
import { useDateFormat } from "@vueuse/core";

// Interfaces
interface Results {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}

interface Movies {
  total_pages: number;
  total_results: number;
  results: Results[];
}

export const useMoviesStore = defineStore("movies", () => {
  const runtimeConfig = useRuntimeConfig();
  const movies = ref<Results[]>([]);
  const messageStore = useMessageStore();

  // 🔍 Películas destacadas
  const movieFeatures = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/discover/movie?page=1", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${runtimeConfig.public.tmdbApiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: Movies = await response.json();
      
      movies.value = data.results
        .slice(0, 12)
        .map((movie: Results) => ({
          ...movie,
          release_date: useDateFormat(
            new Date(movie.release_date),
            "MMMM YYYY",
            { locales: "en-US" }
          ).value,
        }));

    } catch (error: unknown) {
      messageStore.showMsg = true;
      messageStore.message =
        error instanceof Error ? error.message : "Unexpected error while fetching featured movies.";
      console.error("Movie fetch error:", error);
    }
  };

  // 🔍 Búsqueda de películas
  const movieSearch = async (query: string) => {
    if (!query || query.trim() === "") {
      movieFeatures(); // Si no hay término, mostramos películas destacadas
      return;
    }

    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=1`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${runtimeConfig.public.tmdbApiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: Movies = await response.json();
      movies.value = data.results
        .map((movie: Results) => ({
          ...movie,
          release_date: useDateFormat(
            new Date(movie.release_date),
            "MMMM YYYY",
            { locales: "en-US" }
          ).value,
        }));

    } catch (error: unknown) {
      messageStore.showMsg = true;
      messageStore.message =
        error instanceof Error ? error.message : "Unexpected error while searching for movies.";
    }
  };

  onMounted(() => {
    movieFeatures();
  });

  return {
    movies,
    movieFeatures,
    movieSearch,
  };
});
