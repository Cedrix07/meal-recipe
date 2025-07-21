<script setup>
import { computed, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const query = ref('');
const store = useStore();
const favorites = computed(() => store.getters['favorites/getFavorites']); 
console.log(favorites.value);
const toast = useToast();

const removeToFavorites = (meal) => {
    const confirmation = confirm('Are you sure you want to remove this to your favorites?');
    if(!confirmation){
        return;
    }else{
        store.commit('favorites/REMOVE_FROM_FAVORITES', meal.idMeal);
        toast.error(`${meal.strMeal} removed from favorites`, { timeout: 2000 });
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
        <div v-if="favorites.length" v-for="favorite in favorites" :key="favorites.idMeal" class="shadow rounded-md ">
            <RouterLink :to="{ name: 'mealDetail', params: { id: favorite.idMeal } }">
            <img :src="favorite.strMealThumb" :alt="favorite.strMeal" class="w-full h-48 object-cover rounded-t-md">
            </RouterLink>
            <div class="p-3 flex-1">
                <div class="flex items-start justify-between ">
                    <h3 class="text-sm md:text-lg mx-auto font-bold">{{ favorite.strMeal }}</h3>
                    <button class="bg-red-700 text-white px-2 py-1 rounded-md" @click="removeToFavorites(favorite)">
                        <i class="pi pi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <h5>You don't have any favorite yet</h5>
        </div>
    </div>
  </main>
</template>