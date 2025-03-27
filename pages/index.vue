<template>
  <v-container>
    <p class="text-h4 mt-12 mb-6">Feature Today</p>
    <div>
    {{ trt }}
    </div>

    <Home />  
    <v-pagination
              v-model="page"
              :length="movieStore.movies?.total_pages"
              class="my-4"
            ></v-pagination> 
  </v-container>
</template>

<script setup lang="ts">

//recuperamos datos del store 
const movieStore = useMoviesStore();

//Paginacion v-pagination
const page: Ref<number> = ref(1)

// Llamar al cargar el componente
onBeforeMount(() => {
  movieStore.movieFeatures();
});


</script>

<style scoped></style>
