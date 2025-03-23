<template>
  <v-text-field
    v-model="modelValue"
    variant="outlined"
    density="compact"
    hide-details
    append-inner-icon="mdi-magnify"
    placeholder="Search"
    @update:modelValue="searchMovie"
    @click:append-inner="searchMovie"
    @keydown.enter="searchMovie"
  />
</template>

<script setup lang="ts">
const modelValue = defineModel<string>()
const movieStore = useMoviesStore()

const searchMovie = () => {
  console.log("searching....", modelValue.value)
  movieStore.movieSearch(modelValue.value)
}
</script>
