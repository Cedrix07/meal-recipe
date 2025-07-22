<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <header class="w-full flex justify-between items-center h-16 shadow px-8 bg-orange-400 text-white">
    <RouterLink class="font-bold" to="/">Meal Recipes</RouterLink>
    <nav class="flex gap-2">
      <RouterLink class="font-semibold" :to="{name: 'home'}">Home</RouterLink>
      <RouterLink class="font-semibold" :to="{ name: 'favorite' }">
        Favorites
      </RouterLink>
    </nav>
  </header>
</template>