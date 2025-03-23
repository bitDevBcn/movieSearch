<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ popularity: number }>()

// Convertimos de 0–10 a 0–100
const popularityValue = Math.min((props.popularity / 10) * 100, 100)

// Color del círculo (barra de progreso)
const colorCircle = computed(() => {
  if (popularityValue >= 85) return 'green-darken-4'
  if (popularityValue >= 70) return 'teal-darken-3'
  if (popularityValue >= 50) return 'orange-darken-4'
  return 'red'
})

// Color de fondo (track del círculo)
const backgroundColor = computed(() => {
  if (popularityValue >= 85) return 'grey-lighten-4'
  if (popularityValue >= 70) return 'grey-lighten-4'
  if (popularityValue >= 50) return 'grey-lighten-3'
  return 'grey-lighten-2'
})
</script>

<template>
  <v-progress-circular
    :model-value="popularityValue"
    :rotate="360"
    :size="48"
    :width="4"
    :bg-color="backgroundColor"
    :color="colorCircle"
    class="circle"
  >
    <span class="text-black font-weight-bold text-caption">
      {{ popularityValue.toFixed(1) }}
    </span>
  </v-progress-circular>
</template>

<style scoped>
.circle {
  width: 48px;
  height: 48px;
  background-color: #ffffff;
  opacity: 0.95;
  position: absolute;
  border-radius: 50%;
  bottom: 125px;
  left: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
