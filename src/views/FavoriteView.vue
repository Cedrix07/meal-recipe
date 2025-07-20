<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

const query = ref('');
const store = useStore();
const favorites = computed(() => store.getters['favorites/getFavorites']); 

const removeToFavorites = (meal) => {
    const confirmation = confirm('Are you sure you want to remove this favorite?');
    if(!confirmation){
        return;
    }else{
        store.commit('favorites/REMOVE_FROM_FAVORITES', meal.idMeal);
    }
}

watch(query, (q) => {
    store.commit('favorites/SEARCH_FAVORITES', q.trim()); 
});

</script>
<template>
   <main class="p-8">
    <div class="mb-4">
      <input type="text" placeholder="Search your favorite meal..."
        class="w-full p-2 border border-orange-600 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
        v-model="query">
    </div>
    <h4 class="font-bold mb-4">Your Favorites</h4>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div v-if="favorites.length" v-for="favorite in favorites" :key="favorites.idMeal" class="border shadow rounded-md">
            <RouterLink :to="{ name: 'mealDetail', params: { id: favorite.idMeal } }">
            <img :src="favorite.strMealThumb" :alt="favorite.strMeal" class="w-full h-48 object-cover mb-2">
            </RouterLink>
            <div class="pb-2">
            <h3 class="text-center font-bold mb-3">{{ favorite.strMeal }}</h3>

            <div class="flex items-center justify-center gap-2">
                <button class="bg-orange-600 text-white px-2 py-1 rounded-md" @click="removeToFavorites(favorite)">Remove</button>
                <a :href="favorite.strYoutube" target="_blank" class="bg-orange-600 text-white px-2 py-1 rounded-md">Watch
                Video</a>
            </div>
            </div>
        </div>
        <div v-else>
            <h5>You don't have any favorite yet</h5>
        </div>
    </div>
  </main>
</template>