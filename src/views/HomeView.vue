<script setup>
import { debounce } from '@/utils/helper';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const query = ref('');
const store = useStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const meals = computed(()=> store.getters['meals/getMeals']);
const isLoading = computed(()=> store.getters['meals/isLoading']);
const error = computed(()=> store.getters['meals/error']); 
const searchQuery = computed(() => store.getters['meals/getSearchQuery']);


const fetchMeal = debounce((q) => {
  store.dispatch('meals/fetchMealByName', q);
}, 500);

const toggleFavorite = (meal) => {
  if (store.getters['favorites/isFavorite'](meal.idMeal)) {
    store.commit('favorites/REMOVE_FROM_FAVORITES', meal.idMeal);
    toast.error(`${meal.strMeal} removed from favorites`, { timeout: 2000 });
  }else{
    store.commit('favorites/ADD_TO_FAVORITES', meal);
    toast.success(`${meal.strMeal} added to favorites`, { timeout: 2000 });
  }
}

watch(query, (q) => {
  if (q.trim() === searchQuery.value) {
    return; // Skip if query hasn't changed
  }
  if (!q.trim()) {
    store.dispatch('meals/fetchRandomMeals');
    // Clear URL query
    router.push({ name: 'home', params: { query: '' } }); 
  } else {
    fetchMeal(q);
    // Update URL with query
    router.push({ name: 'home', params: { query: q } });
  }
});

onMounted(() => {
  query.value = route.params.query || searchQuery.value || '';
  if (query.value && (query.value !== searchQuery.value || !meals.value.length)) {
    fetchMeal(query.value);
  } else if (!query.value && !meals.value.length) {
    store.dispatch('meals/fetchRandomMeals');
  }
});
</script>

<template>
  <main class="p-8">
    <div class="mb-4 border p-3">
      <input type="text" placeholder="Seach meal by name..."
        class="w-full p-2 border border-orange-600 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
        v-model="query">
    </div>
    <div v-if="isLoading" class="flex items-center justify-center w-full">
      <i class="pi pi-spin pi-spinner text-orange-600" style="font-size: 2rem"></i>
    </div>
    <div v-else-if="meals.length" class="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div v-for="meal in meals" :key="meal.idMeal" class="border shadow rounded-md">
        <RouterLink :to="{ name: 'mealDetail', params: { id: meal.idMeal } }">
          <img :src="meal.strMealThumb" loading="lazy" :alt="meal.strMeal" class="w-full h-48 object-cover mb-2 rounded-t-md">
        </RouterLink>
        <div class="my-3 flex items-center justify-between">
          <h3 class="text-center font-bold mx-auto text-sm md:text-md">{{ meal.strMeal }}</h3>
          <button class="px-2 py-1 rounded-md "
            @click="toggleFavorite(meal)">
            <i 
              :class="['pi', store.getters['favorites/isFavorite'](meal.idMeal) ? 'pi-heart-fill' : 'pi-heart', 'text-orange-600']"
              ></i>
          </button>
        </div>
      </div>
    </div>
    <div v-else>
        <p>No meals found</p>
      </div>
  </main>
</template>
