<script setup>
import { debounce } from '@/utils/helper';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const query = ref('');
const store = useStore();
const route = useRoute();
const meals = computed(()=> store.getters['meals/getMeals']);
const isLoading = computed(()=> store.getters['meals/isLoading']);
const error = computed(()=> store.getters['meals/error']); 

const favorites = computed(() => store.getters['favorites/getFavorites']);
const fetchMeal = debounce((q) => {
  store.dispatch('meals/fetchMealByName', q);
}, 500);

const addToFavorites = (meal) => {
  store.commit('favorites/ADD_TO_FAVORITES', meal);
}

watch(query, (q) => {
  fetchMeal(q);
});

onMounted(() => {
  query.value = route.params.query || '';
  if(query.value){
    fetchMeal(query.value);
  } 
})
</script>

<template>
  <main class="p-8">
    <div class="mb-4">
      <input type="text" placeholder="Seach meal by name..."
        class="w-full p-2 border border-orange-600 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
        v-model="query">
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
      <p v-if="isLoading">Fetching Meals...</p>
      <div v-else-if="meals.length" v-for="meal in meals" :key="meal.idMeal" class="border shadow rounded-md">
        <RouterLink :to="{ name: 'mealDetail', params: { id: meal.idMeal } }">
          <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-full h-48 object-cover mb-2">
        </RouterLink>
        <div class="pb-2">
          <h3 class="text-center font-bold mb-3">{{ meal.strMeal }}</h3>
          <div class="flex items-center justify-center gap-2">
            <button class="bg-orange-600 text-white px-2 py-1 rounded-md"
              @click="addToFavorites(meal)">Add to Favorites</button>
            <a :href="meal.strYoutube" target="_blank" class="bg-orange-600 text-white px-2 py-1 rounded-md">Watch
              Video</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
