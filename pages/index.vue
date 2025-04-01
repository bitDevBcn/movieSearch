<template>
  <v-container>
    <p class="text-h4 mt-12 mb-6">Feature Today</p>
    <Home />  
      <v-pagination
                v-model="movieStore.page"
                :length="movieStore.totalPages"
                class="my-4"
              >
      </v-pagination> 
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

// 👇 Reaccionar cuando cambia la página y recargar películas
watch(() => movieStore.page, () => {
  movieStore.movieFeatures() // o movieSearch(query) si estás buscando
})
</script>

<style scoped></style>
