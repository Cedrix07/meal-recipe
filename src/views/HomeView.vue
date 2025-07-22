<script setup>
import ToggleFavorite from '@/components/ToggleFavorite.vue';
import { debounce } from '@/utils/helper';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const query = ref('');
const store = useStore();
const route = useRoute();
const router = useRouter();

const meals = computed(()=> store.getters['meals/getMeals']);
const isLoading = computed(()=> store.getters['meals/isLoading']);
const error = computed(()=> store.getters['meals/error']); 
const searchQuery = computed(() => store.getters['meals/getSearchQuery']);

const fetchMeal = debounce((q) => {
  store.dispatch('meals/fetchMealByName', q);
}, 500);


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
     <div class="w-full mb-4 mx-auto bg-gray-50 shadow rounded-lg px-3 py-5 flex gap-2">
        <div class="flex-1">
            <input type="text" placeholder="Search a meal..."
                class="w-full p-2 search-bar"
                v-model="query">
        </div>
      </div>
    <div v-if="isLoading" class="flex items-center justify-center w-full">
      <i class="pi pi-spin pi-spinner text-orange-600" style="font-size: 2rem"></i>
    </div>
    <div v-else-if="meals.length" class="grid grid-cols-1 md:grid-cols-3 gap-2 bg-white px-3 py-5 rounded-lg">
      <div v-for="meal in meals" :key="meal.idMeal" class="card">
        <RouterLink :to="{ name: 'mealDetail', params: { id: meal.idMeal } }">
          <img :src="meal.strMealThumb" loading="lazy" :alt="meal.strMeal" class="w-full h-48 object-cover mb-2 rounded-t-md">
        </RouterLink>
        <div class="my-3 flex items-center justify-between">
          <h3 class="text-center font-bold mx-auto text-sm md:text-md">{{ meal.strMeal }}</h3>
          <ToggleFavorite :meal="meal" />
        </div>
      </div>
    </div>
    <div v-else>
        <p>No meals found</p>
      </div>
  </main>
</template>
