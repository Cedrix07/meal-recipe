<script setup>
import apiClient from '@/api/axios';
import ToggleFavorite from '@/components/ToggleFavorite.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const meal = ref({});

const ingredients = ref([]);
let isLoading = ref(true);

const fetchMealById = async () => {
    try {
        const { data } = await apiClient.get(`lookup.php?i=${route.params.id}`);
        meal.value = data.meals[0] || {};
        ingredients.value = Object.keys(meal.value).filter(key => key.startsWith('strIngredient') && meal.value[key]);
        const FormattedInstructions = meal.value.strInstructions.split('.');
        if (FormattedInstructions[FormattedInstructions.length - 1] === '') FormattedInstructions.pop();
        meal.value = { ...meal.value, FormattedInstructions };
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    fetchMealById();
});
</script>
<template>
    <main class="p-8">
        <div v-if="isLoading" class="flex items-center justify-center w-full">
            <i class="pi pi-spin pi-spinner text-orange-600" style="font-size: 2rem"></i>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3 shadow-lg card">
            <div class="rounded-md">
                <img class="w-full h-full object-cover rounded-s-md" loading="lazy" :src="meal.strMealThumb"
                    :alt="meal.strMeal">
            </div>
            <div class="p-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <h3 class="text-xl font-bold">{{ meal.strMeal }}</h3>
                        <a :href="meal.strYoutube" target="_blank" class="mt-1 text-xl" title="Watch video" data-tooltip><i class="pi pi-youtube text-red-600"></i></a>
                    </div>
                    <ToggleFavorite :meal="meal"/>
                </div>
                <div class="my-3">
                    <p class="font-semibold">Ingredients: </p>
                    <ul class="list-disc pl-5">
                        <li v-for="ingredient in ingredients" :key="ingredient">
                            {{ meal[ingredient] }}
                        </li>
                    </ul>
                </div>
                <div class="mb-3">
                    <p class="font-semibold">Instructions: </p>
                    <ol class="list-decimal pl-5">
                        <li v-for="instruction in meal.FormattedInstructions" :key="instruction">
                            {{ instruction.trim() }}
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </main>
</template>