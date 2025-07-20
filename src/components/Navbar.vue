<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const count = computed(()=> store.getters['favorites/totalFavorites']);
</script>
<template>
    <header class="w-full flex justify-between items-center h-16 shadow px-8 bg-orange-400 text-white">
    <RouterLink class="font-bold" to="/">Meal Recipes</RouterLink>
    <nav class="flex gap-2">
      <RouterLink class="font-semibold" :to="{name: 'home'}">Home</RouterLink>
      <RouterLink class="font-semibold relative" :to="{ name: 'favorite' }">
        <span v-if="count" class="absolute -top-2 -right-5 bg-white text-orange-400 text-xs px-2 py-1 rounded-full">
            {{ count }}
        </span>
        Favorites
      </RouterLink>
    </nav>
  </header>
</template>